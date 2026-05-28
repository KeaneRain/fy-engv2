export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin)
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export function getBuildingProgress(scrollProgress: number, drawRange: [number, number]): number {
  const [start, end] = drawRange
  if (start >= end) return scrollProgress >= end ? 1 : 0
  return clamp(mapRange(scrollProgress, start, end, 0, 1), 0, 1)
}
