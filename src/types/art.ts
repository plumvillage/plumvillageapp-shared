import { ART_PULL_ZONE } from '../config/bunny.js';

// Types, constants, and path builders for the artwork system.
// Firestore collections (both admin-only):
//   ART_SOURCES ('art-sources') — base illustrations; raw images live in Storage
//   ART_BUNDLES ('art-bundles') — single-type crop recipes derived from a source
// The app never reads these directly; documents/categories reference a bundle by
// slug (see MetadataType.artBundleSlug) and construct CDN URLs by convention.

// ─────────────────────────────────────────────────────────────
// Generic timestamp placeholder. Concrete type is resolved by the
// consumer (Firestore Timestamp, epoch number, etc.). Do not couple
// the shared lib to a specific timestamp implementation.
// ─────────────────────────────────────────────────────────────
export type TimestampLike = unknown;

// ─────────────────────────────────────────────────────────────
// A single crop recipe for one aspect ratio. Center-based; cx, cy,
// width, height are all normalized 0.0–1.0 relative to the source
// image's dimensions. rotation is degrees clockwise with the pivot
// at the box center (0 = upright). Coordinates are MODE-AGNOSTIC —
// the same recipe is applied to both the light and dark source
// images at generation time.
// ─────────────────────────────────────────────────────────────
export type ArtRegion = {
  cx: number;
  cy: number;
  width: number;
  height: number;
  rotation: number;
};

// ─────────────────────────────────────────────────────────────
// Supported aspect ratios. Used as keys in a bundle's `regions`
// map and as a segment in generated CDN paths.
// ─────────────────────────────────────────────────────────────
export type RatioKey = "1x1" | "9x16" | "21x9";

// ─────────────────────────────────────────────────────────────
// The type of a bundle — what app surface its crops serve. A bundle
// is single-type: it carries only the ratios required by its type.
// "folderThumb" is anticipated as a future addition.
// ─────────────────────────────────────────────────────────────
export type BundleType = "document" | "category";

// ─────────────────────────────────────────────────────────────
// Required ratios per bundle type. Drives the crop editor (which
// slots to show), the generation-completeness gate, and the Cloud
// Function (what to generate). Adding a future type (e.g.
// "folderThumb") is a one-line change here.
// ─────────────────────────────────────────────────────────────
export const BUNDLE_TYPE_REGIONS: Record<BundleType, RatioKey[]> = {
  document: ["1x1", "9x16"],
  category: ["21x9"],
};

// ─────────────────────────────────────────────────────────────
// Human-readable labels for ratio keys, shown in the crop editor.
// Presentational only — not stored in Firestore.
// ─────────────────────────────────────────────────────────────
export const REGION_LABELS: Record<RatioKey, string> = {
  "1x1":  "Card thumbnail",
  "9x16": "Full image",
  "21x9": "Category banner",
};

// ─────────────────────────────────────────────────────────────
// art-sources/{slug} — admin-only Firestore collection. Describes a
// base illustration whose raw image(s) live in Firebase Storage.
// Storage paths are authored by convention from slug:
//   art-sources/{slug}/light.png            (always)
//   art-sources/{slug}/dark.png             (only if hasDarkVariant)
// When hasDarkVariant is false, the single light image is used for
// both modes. The app never reads this collection.
// ─────────────────────────────────────────────────────────────
export type ArtSource = {
  slug: string;            // = Firestore document ID
  displayName: string;
  hasDarkVariant: boolean;
  createdAt: TimestampLike;
  createdBy: string;       // admin uid
  updatedAt: TimestampLike;
  updatedBy: string;       // admin uid
};

// ─────────────────────────────────────────────────────────────
// art-bundles/{slug} — admin-only Firestore collection. A single-type
// crop recipe derived from one source. The slug encodes the type and
// is unique, e.g. "tree-document-1", "tree-category-1". `type` is also
// stored explicitly (do not parse it from the slug).
//
// `regions` is keyed by RatioKey and is a flat map. The valid ratios
// for a bundle are those listed in BUNDLE_TYPE_REGIONS[type]. The map
// may be partial in storage (supports work-in-progress saves);
// completeness is enforced at the generation gate at RUNTIME, not by
// this type.
//
// Generated derivative images live on the CDN by convention:
//   art-bundles/{slug}/{mode}/{ratio}@{density}.png
//   art-bundles/{slug}/{mode}/{ratio}-full.png
// where {mode} ∈ light|dark. (No type segment — the slug implies it.)
// ─────────────────────────────────────────────────────────────
export type ArtBundle = {
  slug: string;            // = Firestore document ID; encodes type
  displayName: string;
  description?: string;    // optional admin notes
  sourceSlug: string;      // → ArtSource.slug
  type: BundleType;
  imageStatus: "not_generated" | "generated" | "stale";
  regions: Partial<Record<RatioKey, ArtRegion>>;
  createdAt: TimestampLike;
  createdBy: string;
  updatedAt: TimestampLike;
  updatedBy: string;
};

// ─────────────────────────────────────────────────────────────
// Path builders — convention-based, pure string construction. No
// I/O, no Storage/CDN SDK calls. These centralize the path
// conventions so admin UI, Cloud Functions, and app build identical
// paths from one source of truth. All return host-agnostic RELATIVE
// paths; each consumer prefixes its own base URL (BunnyCDN host for
// the app, Storage bucket for admin/functions).
// ─────────────────────────────────────────────────────────────

// Firebase Storage paths for raw source images.
//   art-sources/{slug}/light.png   (always)
//   art-sources/{slug}/dark.png    (only meaningful if hasDarkVariant)
export type SourceMode = "light" | "dark";

export function sourceImagePath(slug: string, mode: SourceMode): string {
  return `art-sources/${slug}/${mode}.png`;
}

// Resolves the correct source image given dark-variant availability:
// returns the dark path only when the source actually has a dark
// variant; otherwise falls back to light. Use this anywhere the
// "dark, or light if no dark" rule applies (e.g. editor preview,
// generation input selection).
export function resolveSourceImagePath(
  slug: string,
  hasDarkVariant: boolean,
  mode: SourceMode
): string {
  const effectiveMode: SourceMode =
    mode === "dark" && hasDarkVariant ? "dark" : "light";
  return sourceImagePath(slug, effectiveMode);
}

// CDN paths for generated bundle derivatives.
//   art-bundles/{slug}/{mode}/{ratio}-full.png
//   art-bundles/{slug}/{mode}/{ratio}@{density}.png
// {mode} ∈ light|dark. No type segment — the slug encodes the type.
// When a source has no dark variant, the generator still writes both
// light/ and dark/ outputs (identical), so the app can always request
// {mode} by convention without checking existence.
export type Density = "1x" | "1.5x" | "2x" | "2.5x" | "3x" | "3.5x";

export const DENSITIES: Density[] = ["1x", "1.5x", "2x", "2.5x", "3x", "3.5x"];

export function bundleAssetPath(
  slug: string,
  mode: SourceMode,
  ratio: RatioKey,
  density: Density
): string {
  return `art-bundles/${slug}/${mode}/${ratio}@${density}.png`;
}

export function bundleAssetFullPath(
  slug: string,
  mode: SourceMode,
  ratio: RatioKey
): string {
  return `art-bundles/${slug}/${mode}/${ratio}-full.png`;
}

// Absolute CDN URL builders — ART_PULL_ZONE (ends in '/') prefixed onto the
// relative path builders above (no leading slash), so they join without double
// slashes. One source of truth for the path shape, one for the host. Use these
// for pull-zone reads / links / cache-purge targets; the relative ...Path
// builders remain for Storage writes.

// Absolute CDN URL for a density-specific bundle asset.
export function bundleAssetUrl(
  slug: string,
  mode: SourceMode,
  ratio: RatioKey,
  density: Density
): string {
  return ART_PULL_ZONE + bundleAssetPath(slug, mode, ratio, density);
}

// Absolute CDN URL for the full-resolution bundle asset.
export function bundleAssetFullUrl(
  slug: string,
  mode: SourceMode,
  ratio: RatioKey
): string {
  return ART_PULL_ZONE + bundleAssetFullPath(slug, mode, ratio);
}

// ─────────────────────────────────────────────────────────────
// Pure geometry helpers — shared crop math so the admin UI (Canvas)
// and the generation Cloud Function (Sharp) compute identical crop
// geometry pixel-for-pixel. ZERO dependencies: plain arithmetic/trig
// over numbers. No I/O, no image decoding, no DOM/Canvas/Sharp — any
// function needing pixel data belongs consumer-side, not here.
//
// Conventions (must match across all consumers):
//   - Region coords are center-based, normalized 0–1 relative to the
//     source intrinsic dimensions: { cx, cy, width, height }.
//   - rotation is degrees clockwise, pivot = box center.
//   - Pixel space: origin top-left, +x right, +y down.
// ─────────────────────────────────────────────────────────────

export type Point = { x: number; y: number };
export type PixelRect = { x: number; y: number; w: number; h: number }; // axis-aligned, px

// Region in source-pixel space.
export type PixelRegion = {
  centerPx: Point;     // crop center in px
  sizePx: { w: number; h: number };
  rotationDeg: number; // CW, pivot = center
};

// Normalized region → pixel-space region, given source intrinsic size.
export function regionToPixels(
  region: ArtRegion,
  sourceW: number,
  sourceH: number
): PixelRegion {
  return {
    centerPx: { x: region.cx * sourceW, y: region.cy * sourceH },
    sizePx: { w: region.width * sourceW, h: region.height * sourceH },
    rotationDeg: region.rotation,
  };
}

// Four corners of the rotated crop box, in px (order: TL, TR, BR, BL of the
// box's own frame, post-rotation). Pure trig about centerPx.
export function rotatedCorners(r: PixelRegion): [Point, Point, Point, Point] {
  const { centerPx, sizePx, rotationDeg } = r;
  const rad = (rotationDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const hw = sizePx.w / 2;
  const hh = sizePx.h / 2;
  // Corners relative to center, before rotation: TL, TR, BR, BL.
  const local: [number, number][] = [
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
  return rotated as [Point, Point, Point, Point];
}

// Axis-aligned bounding box (px) enclosing the rotated crop. This is the area
// a consumer must have available (and pad with transparency where it exceeds
// the source) before extracting + un-rotating.
export function axisAlignedBounds(r: PixelRegion): PixelRect {
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
export function overshoot(
  r: PixelRegion,
  sourceW: number,
  sourceH: number
): {
    perEdgePx: { top: number; right: number; bottom: number; left: number };
    areaFraction: number;
  } {
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
function clipPolygonToRect(poly: Point[], w: number, h: number): Point[] {
  const interpX = (a: Point, b: Point, X: number): Point => {
    const t = (X - a.x) / (b.x - a.x);
    return { x: X, y: a.y + t * (b.y - a.y) };
  };
  const interpY = (a: Point, b: Point, Y: number): Point => {
    const t = (Y - a.y) / (b.y - a.y);
    return { x: a.x + t * (b.x - a.x), y: Y };
  };
  const clipEdge = (
    pts: Point[],
    isInside: (p: Point) => boolean,
    intersect: (a: Point, b: Point) => Point
  ): Point[] => {
    if (pts.length === 0) return pts;
    const out: Point[] = [];
    for (let i = 0; i < pts.length; i++) {
      const cur = pts[i];
      const prev = pts[(i + pts.length - 1) % pts.length];
      const curIn = isInside(cur);
      const prevIn = isInside(prev);
      if (curIn) {
        if (!prevIn) out.push(intersect(prev, cur));
        out.push(cur);
      } else if (prevIn) {
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
function polygonArea(poly: Point[]): number {
  if (poly.length < 3) return 0;
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
export const BASE_SIZES: Record<RatioKey, { w: number; h: number }> = {
  "1x1": { w: 150, h: 150 },
  "9x16": { w: 360, h: 640 },
  "21x9": { w: 420, h: 180 },
};

// Numeric multiplier for a density string ("2.5x" → 2.5).
export function densityScale(density: Density): number {
  return parseFloat(density);
}

// Target output px for a ratio at a density (BASE_SIZES[ratio] × multiplier).
export function targetSize(
  ratio: RatioKey,
  density: Density
): { w: number; h: number } {
  const base = BASE_SIZES[ratio];
  const scale = densityScale(density);
  return { w: Math.round(base.w * scale), h: Math.round(base.h * scale) };
}
