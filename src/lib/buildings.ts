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
// 4 buildings per side with wide spacing — each pair draws simultaneously (same drawRange)
// Left (l1–l4): x=5→387, taller toward center | Right (r4–r1): x=413→795, mirror
export const BUILDINGS: BuildingData[] = [
  {
    id: 'ground',
    path: 'M 0,580 L 800,580',
    drawRange: [0, 0.07],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
    drawDirection: 'forward',
  },

  // — Left cluster — grows taller toward center, wide gaps between buildings
  {
    id: 'l1',
    path: generateBuildingPath({ x: 5, width: 62, groundY: 580, height: 95, floors: 3, windowCols: 2, variant: 'simple' }),
    drawRange: [0.07, 0.24],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
    drawDirection: 'forward',
  },
  {
    id: 'l2',
    path: generateBuildingPath({ x: 105, width: 70, groundY: 580, height: 155, floors: 5, windowCols: 2, variant: 'parapet' }),
    drawRange: [0.20, 0.38],
    strokeColor: '#93c5fd',
    strokeWidth: 1.5,
    drawDirection: 'reverse',
  },
  {
    id: 'l3',
    path: generateBuildingPath({ x: 220, width: 78, groundY: 580, height: 225, floors: 7, windowCols: 3, variant: 'simple' }),
    drawRange: [0.34, 0.54],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
    drawDirection: 'forward',
  },
  {
    id: 'l4',
    path: generateBuildingPath({ x: 315, width: 72, groundY: 580, height: 288, floors: 10, windowCols: 3, variant: 'tapered' }),
    drawRange: [0.50, 0.72],
    strokeColor: '#93c5fd',
    strokeWidth: 1.5,
    drawDirection: 'reverse',
  },

  // — Right cluster — mirror positions, slightly different heights/variants
  {
    id: 'r4',
    path: generateBuildingPath({ x: 413, width: 72, groundY: 580, height: 268, floors: 9, windowCols: 3, variant: 'parapet' }),
    drawRange: [0.50, 0.72],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
    drawDirection: 'forward',
  },
  {
    id: 'r3',
    path: generateBuildingPath({ x: 502, width: 78, groundY: 580, height: 215, floors: 7, windowCols: 3, variant: 'simple' }),
    drawRange: [0.34, 0.54],
    strokeColor: '#93c5fd',
    strokeWidth: 1.5,
    drawDirection: 'reverse',
  },
  {
    id: 'r2',
    path: generateBuildingPath({ x: 625, width: 70, groundY: 580, height: 148, floors: 5, windowCols: 2, variant: 'parapet' }),
    drawRange: [0.20, 0.38],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
    drawDirection: 'forward',
  },
  {
    id: 'r1',
    path: generateBuildingPath({ x: 733, width: 62, groundY: 580, height: 98, floors: 3, windowCols: 2, variant: 'simple' }),
    drawRange: [0.07, 0.24],
    strokeColor: '#93c5fd',
    strokeWidth: 1.5,
    drawDirection: 'reverse',
  },
]

export const ANNOTATIONS: AnnotationData[] = [
  {
    id: 'ann-l4',
    path: 'M 309,580 L 309,292 M 306,580 L 312,580 M 306,292 L 312,292',
    label: '288m',
    labelX: 314,
    labelY: 435,
    drawRange: [0.88, 0.95],
  },
  {
    id: 'ann-r4',
    path: 'M 491,580 L 491,312 M 488,580 L 494,580 M 488,312 L 494,312',
    label: '268m',
    labelX: 496,
    labelY: 445,
    drawRange: [0.93, 1.0],
  },
]
