import { Package } from 'lucide-react';

/**
 * Clean product placeholder used until real DigitalOcean Spaces images exist.
 * `alt` describes the product for assistive tech.
 */
export function ProductThumbnail({ alt, size = 26 }: { alt: string; size?: number }) {
  return (
    <span className="pf-product-thumb" role="img" aria-label={alt}>
      <Package size={size} strokeWidth={1.75} />
    </span>
  );
}
