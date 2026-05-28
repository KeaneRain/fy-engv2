interface BuildingConfig {
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
export const BUILDINGS: BuildingData[] = [
  {
    id: 'ground',
    path: 'M 0,580 L 800,580',
    drawRange: [0, 0.07],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
  },
  {
    id: 'b1',
    path: generateBuildingPath({ x: 20, width: 58, groundY: 580, height: 88, floors: 3, windowCols: 2, variant: 'simple' }),
    drawRange: [0.07, 0.22],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
  },
  {
    id: 'b2',
    path: generateBuildingPath({ x: 92, width: 62, groundY: 580, height: 122, floors: 4, windowCols: 2, variant: 'parapet' }),
    drawRange: [0.14, 0.30],
    strokeColor: '#93c5fd',
    strokeWidth: 1.5,
  },
  {
    id: 'b3',
    path: generateBuildingPath({ x: 168, width: 72, groundY: 580, height: 178, floors: 6, windowCols: 3, variant: 'simple' }),
    drawRange: [0.27, 0.43],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
  },
  {
    id: 'b4',
    path: generateBuildingPath({ x: 254, width: 68, groundY: 580, height: 218, floors: 7, windowCols: 2, variant: 'parapet' }),
    drawRange: [0.36, 0.52],
    strokeColor: '#93c5fd',
    strokeWidth: 1.5,
  },
  {
    id: 'b5',
    path: generateBuildingPath({ x: 336, width: 82, groundY: 580, height: 292, floors: 10, windowCols: 3, variant: 'simple' }),
    drawRange: [0.48, 0.63],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
  },
  {
    id: 'b6',
    path: generateBuildingPath({ x: 432, width: 86, groundY: 580, height: 318, floors: 11, windowCols: 3, variant: 'parapet' })
      + ` M ${432 + 43},${580 - 318} L ${432 + 43},${580 - 318 - 58}`
      + ` M ${432 + 43},${580 - 318 - 58} L ${432 + 43 + 72},${580 - 318 - 58}`
      + ` M ${432 + 43 + 72},${580 - 318 - 58} L ${432 + 43 + 72},${580 - 318 - 44}`
      + ` M ${432 + 43},${580 - 318 - 50} L ${432 + 43 - 16},${580 - 318 - 40}`,
    drawRange: [0.55, 0.71],
    strokeColor: '#93c5fd',
    strokeWidth: 1.5,
  },
  {
    id: 'b7',
    path: generateBuildingPath({ x: 534, width: 74, groundY: 580, height: 392, floors: 14, windowCols: 3, variant: 'tapered' }),
    drawRange: [0.68, 0.83],
    strokeColor: '#2563eb',
    strokeWidth: 1.5,
  },
  {
    id: 'b8',
    path: generateBuildingPath({ x: 622, width: 102, groundY: 580, height: 458, floors: 16, windowCols: 4, variant: 'tapered' })
      + ` M ${622 + 51},${580 - 458} L ${622 + 51},${580 - 458 - 46}`,
    drawRange: [0.75, 0.92],
    strokeColor: '#93c5fd',
    strokeWidth: 1.5,
  },
]

export const ANNOTATIONS: AnnotationData[] = [
  {
    id: 'ann-b1',
    path: 'M 8,580 L 8,492 M 5,580 L 11,580 M 5,492 L 11,492',
    label: '88m',
    labelX: 13,
    labelY: 540,
    drawRange: [0.90, 0.95],
  },
  {
    id: 'ann-b8',
    path: 'M 738,580 L 738,122 M 735,580 L 741,580 M 735,122 L 741,122',
    label: '458m',
    labelX: 742,
    labelY: 360,
    drawRange: [0.93, 0.99],
  },
]
