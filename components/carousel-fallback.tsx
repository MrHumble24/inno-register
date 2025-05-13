interface CarouselFallbackProps {
  aspectRatio?: string;
}

export function CarouselFallback({
  aspectRatio = "16/9",
}: CarouselFallbackProps) {
  return (
    <div
      className="w-full bg-gray-200 animate-pulse rounded-2xl flex items-center justify-center"
      style={{ aspectRatio }}
    >
      <div className="text-gray-400 text-sm">Loading images...</div>
    </div>
  );
}
