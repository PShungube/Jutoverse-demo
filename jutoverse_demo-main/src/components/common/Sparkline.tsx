type SparklineProps = {
  points: number[];
};

function toPath(points: number[]) {
  const width = 100;
  const height = 36;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const spread = max - min || 1;

  return points
    .map((point, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * width;
      const y = height - ((point - min) / spread) * height;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

export function Sparkline({ points }: SparklineProps) {
  const path = toPath(points);

  return (
    <svg className="sparkline" viewBox="0 0 100 36" preserveAspectRatio="none" aria-hidden="true">
      <path className="sparkline__path" d={path} />
    </svg>
  );
}
