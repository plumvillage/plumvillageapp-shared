export type TimestampLike = unknown;
export type ArtRegion = {
    cx: number;
    cy: number;
    width: number;
    height: number;
    rotation: number;
};
export type RatioKey = "1x1" | "9x16" | "21x9";
export type BundleType = "document" | "category";
export declare const BUNDLE_TYPE_REGIONS: Record<BundleType, RatioKey[]>;
export declare const REGION_LABELS: Record<RatioKey, string>;
export type ArtSource = {
    slug: string;
    displayName: string;
    hasDarkVariant: boolean;
    createdAt: TimestampLike;
    createdBy: string;
    updatedAt: TimestampLike;
    updatedBy: string;
};
export type ArtBundle = {
    slug: string;
    displayName: string;
    description?: string;
    sourceSlug: string;
    type: BundleType;
    imageStatus: "not_generated" | "generated" | "stale";
    regions: Partial<Record<RatioKey, ArtRegion>>;
    createdAt: TimestampLike;
    createdBy: string;
    updatedAt: TimestampLike;
    updatedBy: string;
};
export type SourceMode = "light" | "dark";
export declare function sourceImagePath(slug: string, mode: SourceMode): string;
export declare function resolveSourceImagePath(slug: string, hasDarkVariant: boolean, mode: SourceMode): string;
export type Density = "1x" | "1.5x" | "2x" | "2.5x" | "3x" | "3.5x";
export declare const DENSITIES: Density[];
export declare function bundleAssetPath(slug: string, mode: SourceMode, ratio: RatioKey, density: Density): string;
export declare function bundleAssetFullPath(slug: string, mode: SourceMode, ratio: RatioKey): string;
export declare function bundleAssetUrl(slug: string, mode: SourceMode, ratio: RatioKey, density: Density): string;
export declare function bundleAssetFullUrl(slug: string, mode: SourceMode, ratio: RatioKey): string;
export type Point = {
    x: number;
    y: number;
};
export type PixelRect = {
    x: number;
    y: number;
    w: number;
    h: number;
};
export type PixelRegion = {
    centerPx: Point;
    sizePx: {
        w: number;
        h: number;
    };
    rotationDeg: number;
};
export declare function regionToPixels(region: ArtRegion, sourceW: number, sourceH: number): PixelRegion;
export declare function rotatedCorners(r: PixelRegion): [Point, Point, Point, Point];
export declare function axisAlignedBounds(r: PixelRegion): PixelRect;
export declare function overshoot(r: PixelRegion, sourceW: number, sourceH: number): {
    perEdgePx: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    areaFraction: number;
};
export declare const BASE_SIZES: Record<RatioKey, {
    w: number;
    h: number;
}>;
export declare function densityScale(density: Density): number;
export declare function targetSize(ratio: RatioKey, density: Density): {
    w: number;
    h: number;
};
//# sourceMappingURL=art.d.ts.map