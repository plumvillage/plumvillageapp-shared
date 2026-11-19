import { ART_PULL_ZONE } from '../config/bunny.js';
// ─────────────────────────────────────────────────────────────
// Required ratios per bundle type. Drives the crop editor (which
// slots to show), the generation-completeness gate, and the Cloud
// Function (what to generate). Adding a future type (e.g.
// "folderThumb") is a one-line change here.
// ─────────────────────────────────────────────────────────────
export const BUNDLE_TYPE_REGIONS = {
    document: ["1x1", "9x16"],
    category: ["21x9"],
};
// ─────────────────────────────────────────────────────────────
// Human-readable labels for ratio keys, shown in the crop editor.
// Presentational only — not stored in Firestore.
// ─────────────────────────────────────────────────────────────
export const REGION_LABELS = {
    "1x1": "Card thumbnail",
    "9x16": "Full image",
    "21x9": "Category banner",
};
export function sourceImagePath(slug, mode) {
    return `art-sources/${slug}/${mode}.png`;
}
// Resolves the correct source image given dark-variant availability:
// returns the dark path only when the source actually has a dark
// variant; otherwise falls back to light. Use this anywhere the
// "dark, or light if no dark" rule applies (e.g. editor preview,
// generation input selection).
export function resolveSourceImagePath(slug, hasDarkVariant, mode) {
    const effectiveMode = mode === "dark" && hasDarkVariant ? "dark" : "light";
    return sourceImagePath(slug, effectiveMode);
}
export const DENSITIES = ["1x", "1.5x", "2x", "2.5x", "3x", "3.5x"];
export function bundleAssetPath(slug, mode, ratio, density) {
    return `art-bundles/${slug}/${mode}/${ratio}@${density}.png`;
}
export function bundleAssetFullPath(slug, mode, ratio) {
    return `art-bundles/${slug}/${mode}/${ratio}-full.png`;
}
// Absolute CDN URL builders — ART_PULL_ZONE (ends in '/') prefixed onto the
// relative path builders above (no leading slash), so they join without double
// slashes. One source of truth for the path shape, one for the host. Use these
// for pull-zone reads / links / cache-purge targets; the relative ...Path
// builders remain for Storage writes.
// Absolute CDN URL for a density-specific bundle asset.
export function bundleAssetUrl(slug, mode, ratio, density) {
    return ART_PULL_ZONE + bundleAssetPath(slug, mode, ratio, density);
}
// Absolute CDN URL for the full-resolution bundle asset.
export function bundleAssetFullUrl(slug, mode, ratio) {
    return ART_PULL_ZONE + bundleAssetFullPath(slug, mode, ratio);
}
// Normalized region → pixel-space region, given source intrinsic size.
export function regionToPixels(region, sourceW, sourceH) {
    return {
        centerPx: { x: region.cx * sourceW, y: region.cy * sourceH },
        sizePx: { w: region.width * sourceW, h: region.height * sourceH },
        rotationDeg: region.rotation,
    };
}
// Four corners of the rotated crop box, in px (order: TL, TR, BR, BL of the
// box's own frame, post-rotation). Pure trig about centerPx.
export function rotatedCorners(r) {
    const { centerPx, sizePx, rotationDeg } = r;
    const rad = (rotationDeg * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    const hw = sizePx.w / 2;
    const hh = sizePx.h / 2;
    // Corners relative to center, before rotation: TL, TR, BR, BL.
    const local = [
        [-hw, -hh],
        [hw, -hh],
        [hw, hh],
        [-hw, hh],
    ];
    // Clockwise rotation in a y-down coordinate system.
    const rotated = local.map(([dx, dy]) => ({
        x: centerPx.x + dx * cos - dy * sin,
        y: centerPx.y + dx * sin + dy * cos,
    }));
    return rotated;
}
// Axis-aligned bounding box (px) enclosing the rotated crop. This is the area
// a consumer must have available (and pad with transparency where it exceeds
// the source) before extracting + un-rotating.
export function axisAlignedBounds(r) {
    const corners = rotatedCorners(r);
    const xs = corners.map((p) => p.x);
    const ys = corners.map((p) => p.y);
    const minX = Math.min(...xs);
    const minY = Math.min(...ys);
    const maxX = Math.max(...xs);
    const maxY = Math.max(...ys);
    return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}
// Overshoot of the rotated box past the source bounds.
//  - perEdgePx: how far the AABB exceeds each source edge (0 if inside)
//  - areaFraction: fraction of the box area lying outside the source [0..1]
// Used by admin UI's ~35% reject rule AND by the function to size transparent padding.
export function overshoot(r, sourceW, sourceH) {
    const aabb = axisAlignedBounds(r);
    const perEdgePx = {
        top: Math.max(0, -aabb.y),
        left: Math.max(0, -aabb.x),
        right: Math.max(0, aabb.x + aabb.w - sourceW),
        bottom: Math.max(0, aabb.y + aabb.h - sourceH),
    };
    const boxArea = r.sizePx.w * r.sizePx.h;
    if (boxArea <= 0) {
        return { perEdgePx, areaFraction: 0 };
    }
    // Clip the rotated quad against the source rectangle and compare areas.
    const inside = clipPolygonToRect(rotatedCorners(r), sourceW, sourceH);
    const insideArea = polygonArea(inside);
    const areaFraction = Math.min(1, Math.max(0, 1 - insideArea / boxArea));
    return { perEdgePx, areaFraction };
}
// Sutherland–Hodgman clip of a convex polygon against the axis-aligned source
// rectangle [0,w] × [0,h]. Returns the clipped polygon (possibly empty).
function clipPolygonToRect(poly, w, h) {
    const interpX = (a, b, X) => {
        const t = (X - a.x) / (b.x - a.x);
        return { x: X, y: a.y + t * (b.y - a.y) };
    };
    const interpY = (a, b, Y) => {
        const t = (Y - a.y) / (b.y - a.y);
        return { x: a.x + t * (b.x - a.x), y: Y };
    };
    const clipEdge = (pts, isInside, intersect) => {
        if (pts.length === 0)
            return pts;
        const out = [];
        for (let i = 0; i < pts.length; i++) {
            const cur = pts[i];
            const prev = pts[(i + pts.length - 1) % pts.length];
            const curIn = isInside(cur);
            const prevIn = isInside(prev);
            if (curIn) {
                if (!prevIn)
                    out.push(intersect(prev, cur));
                out.push(cur);
            }
            else if (prevIn) {
                out.push(intersect(prev, cur));
            }
        }
        return out;
    };
    let p = poly;
    p = clipEdge(p, (pt) => pt.x >= 0, (a, b) => interpX(a, b, 0));
    p = clipEdge(p, (pt) => pt.x <= w, (a, b) => interpX(a, b, w));
    p = clipEdge(p, (pt) => pt.y >= 0, (a, b) => interpY(a, b, 0));
    p = clipEdge(p, (pt) => pt.y <= h, (a, b) => interpY(a, b, h));
    return p;
}
// Shoelace area of a simple polygon (px²).
function polygonArea(poly) {
    if (poly.length < 3)
        return 0;
    let area = 0;
    for (let i = 0; i < poly.length; i++) {
        const a = poly[i];
        const b = poly[(i + 1) % poly.length];
        area += a.x * b.y - b.x * a.y;
    }
    return Math.abs(area) / 2;
}
// ─────────────────────────────────────────────────────────────
// Sizing — central place to tune output resolution. Density/DENSITIES
// are declared once above (with the CDN path builders); reuse those.
// ─────────────────────────────────────────────────────────────
// Base (1x) output dimensions per ratio. Proposals — confirm against
// real app render sizes when known.
export const BASE_SIZES = {
    "1x1": { w: 150, h: 150 },
    "9x16": { w: 360, h: 640 },
    "21x9": { w: 420, h: 180 },
};
// Numeric multiplier for a density string ("2.5x" → 2.5).
export function densityScale(density) {
    return parseFloat(density);
}
// Target output px for a ratio at a density (BASE_SIZES[ratio] × multiplier).
export function targetSize(ratio, density) {
    const base = BASE_SIZES[ratio];
    const scale = densityScale(density);
    return { w: Math.round(base.w * scale), h: Math.round(base.h * scale) };
}
