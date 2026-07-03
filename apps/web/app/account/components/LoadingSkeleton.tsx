/** Shimmer placeholder block. Compose several to build loading states. */
export function LoadingSkeleton({
  width = '100%',
  height = 16,
  radius = 8,
  className,
}: {
  width?: number | string;
  height?: number | string;
  radius?: number;
  className?: string;
}) {
  return (
    <span
      className={`pf-skeleton${className ? ` ${className}` : ''}`}
      style={{ display: 'block', width, height, borderRadius: radius }}
      aria-hidden="true"
    />
  );
}
