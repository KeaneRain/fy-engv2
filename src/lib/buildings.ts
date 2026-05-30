export interface BuildingConfig {
  x: number
  width: number
  groundY: number
  height: number
  floors: number
  windowCols: number
  variant: 'simple' | 'parapet' | 'tapered'
}

export function generateBuildingPath(config: BuildingConfig): string {
  const { x, width, groundY, height, floors, windowCols, variant } = config
  const topY = groundY - height
  const parts: string[] = []

  // Main rectangular outline
  parts.push(`M ${x},${groundY} L ${x},${topY} L ${x + width},${topY} L ${x + width},${groundY}`)

  // Roof variant detail
  if (variant === 'parapet') {
    const pw = 8
    parts.push(
      `M ${x},${topY} L ${x},${topY - 10} L ${x + pw},${topY - 10} L ${x + pw},${topY}`,
      `M ${x + width - pw},${topY} L ${x + width - pw},${topY - 10} L ${x + width},${topY - 10} L ${x + width},${topY}`,
    )
  }
  if (variant === 'tapered') {
    const mx = x + width / 2
    parts.push(`M ${x + 8},${topY} L ${mx},${topY - 28} L ${x + width - 8},${topY}`)
  }

  // Horizontal floor dividers (every 3 floors)
  const floorH = Math.max(12, Math.floor((height - 20) / floors))
  for (let i = 1; i < floors; i += 3) {
    const lineY = groundY - i * floorH
    if (lineY > topY + 8) {
      parts.push(`M ${x + 2},${lineY} L ${x + width - 2},${lineY}`)
    }
  }

  // Windows
  const winW = Math.max(7, Math.floor((width - (windowCols + 1) * 5) / windowCols))
  const winH = Math.max(7, Math.floor(floorH * 0.55))
  const xPad = Math.max(3, Math.floor((width - windowCols * winW - (windowCols - 1) * 5) / 2))

  for (let row = 0; row < floors; row++) {
    const floorCenterY = groundY - (row + 0.5) * floorH
    const winTopY = Math.round(floorCenterY - winH / 2)
    const winBotY = Math.round(floorCenterY + winH / 2)
    if (winTopY < topY + 4) continue

    for (let col = 0; col < windowCols; col++) {
      const wx = x + xPad + col * (winW + 5)
      parts.push(`M ${wx},${winBotY} L ${wx},${winTopY} L ${wx + winW},${winTopY} L ${wx + winW},${winBotY} Z`)
    }
  }

  return parts.join(' ')
}

export interface BuildingData {
  id: string
  path: string
  drawRange: [number, number]
  strokeColor: string
  strokeWidth: number
  drawDirection: 'forward' | 'reverse'
}

export interface AnnotationData {
  id: string
  path: string
  label: string
  labelX: number
  labelY: number
  drawRange: [number, number]
}

// All buildings share viewBox "0 0 800 600", groundY = 580
// Left cluster (l1–l5): x=12–386, grows taller toward center
// Right cluster (r5–r1): x=414–788, mirror positions, slightly different heights/variants
// Each pair (l1&r1, l2&r2 ...) shares the same drawRange so both sides draw simultaneously
export const BUILDINGS: BuildingData[] = [
  {
    id: 'ground',
    path: 'M 0,580 L 800,580',
    drawRange: [0, 0.07],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
    drawDirection: 'forward',
  },

  // — Left cluster —
  {
    id: 'l1',
    path: generateBuildingPath({ x: 12, width: 52, groundY: 580, height: 82, floors: 3, windowCols: 2, variant: 'simple' }),
    drawRange: [0.07, 0.22],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
    drawDirection: 'forward',
  },
  {
    id: 'l2',
    path: generateBuildingPath({ x: 78, width: 58, groundY: 580, height: 118, floors: 4, windowCols: 2, variant: 'parapet' }),
    drawRange: [0.18, 0.34],
    strokeColor: '#93c5fd',
    strokeWidth: 1.5,
    drawDirection: 'reverse',
  },
  {
    id: 'l3',
    path: generateBuildingPath({ x: 150, width: 68, groundY: 580, height: 168, floors: 6, windowCols: 3, variant: 'simple' }),
    drawRange: [0.30, 0.46],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
    drawDirection: 'forward',
  },
  {
    id: 'l4',
    path: generateBuildingPath({ x: 232, width: 62, groundY: 580, height: 212, floors: 7, windowCols: 2, variant: 'parapet' }),
    drawRange: [0.42, 0.58],
    strokeColor: '#93c5fd',
    strokeWidth: 1.5,
    drawDirection: 'reverse',
  },
  {
    id: 'l5',
    path: generateBuildingPath({ x: 308, width: 78, groundY: 580, height: 278, floors: 10, windowCols: 3, variant: 'tapered' }),
    drawRange: [0.54, 0.73],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
    drawDirection: 'forward',
  },

  // — Right cluster (mirrored positions, different heights/variants) —
  {
    id: 'r5',
    path: generateBuildingPath({ x: 414, width: 78, groundY: 580, height: 258, floors: 9, windowCols: 3, variant: 'parapet' }),
    drawRange: [0.54, 0.73],
    strokeColor: '#93c5fd',
    strokeWidth: 1.5,
    drawDirection: 'reverse',
  },
  {
    id: 'r4',
    path: generateBuildingPath({ x: 506, width: 62, groundY: 580, height: 228, floors: 7, windowCols: 2, variant: 'simple' }),
    drawRange: [0.42, 0.58],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
    drawDirection: 'forward',
  },
  {
    id: 'r3',
    path: generateBuildingPath({ x: 582, width: 68, groundY: 580, height: 185, floors: 6, windowCols: 3, variant: 'parapet' }),
    drawRange: [0.30, 0.46],
    strokeColor: '#93c5fd',
    strokeWidth: 1.5,
    drawDirection: 'reverse',
  },
  {
    id: 'r2',
    path: generateBuildingPath({ x: 664, width: 58, groundY: 580, height: 108, floors: 4, windowCols: 2, variant: 'simple' }),
    drawRange: [0.18, 0.34],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
    drawDirection: 'forward',
  },
  {
    id: 'r1',
    path: generateBuildingPath({ x: 736, width: 52, groundY: 580, height: 95, floors: 3, windowCols: 2, variant: 'parapet' }),
    drawRange: [0.07, 0.22],
    strokeColor: '#93c5fd',
    strokeWidth: 1.5,
    drawDirection: 'reverse',
  },
]

export const ANNOTATIONS: AnnotationData[] = [
  {
    id: 'ann-l5',
    path: 'M 302,580 L 302,302 M 299,580 L 305,580 M 299,302 L 305,302',
    label: '278m',
    labelX: 307,
    labelY: 440,
    drawRange: [0.88, 0.95],
  },
  {
    id: 'ann-r5',
    path: 'M 498,580 L 498,322 M 495,580 L 501,580 M 495,322 L 501,322',
    label: '258m',
    labelX: 503,
    labelY: 445,
    drawRange: [0.93, 1.0],
  },
]
