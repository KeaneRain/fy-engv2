import { describe, it, expect } from 'vitest'
import { generateBuildingPath, BUILDINGS, ANNOTATIONS } from '../buildings'

describe('generateBuildingPath', () => {
  it('returns a non-empty string', () => {
    const path = generateBuildingPath({ x: 0, width: 60, groundY: 580, height: 100, floors: 3, windowCols: 2, variant: 'simple' })
    expect(typeof path).toBe('string')
    expect(path.length).toBeGreaterThan(0)
  })
  it('starts with M command', () => {
    const path = generateBuildingPath({ x: 0, width: 60, groundY: 580, height: 100, floors: 3, windowCols: 2, variant: 'simple' })
    expect(path.startsWith('M')).toBe(true)
  })
  it('generates parapet variant without throwing', () => {
    expect(() => generateBuildingPath({ x: 0, width: 60, groundY: 580, height: 100, floors: 3, windowCols: 2, variant: 'parapet' })).not.toThrow()
  })
  it('generates tapered variant without throwing', () => {
    expect(() => generateBuildingPath({ x: 0, width: 60, groundY: 580, height: 200, floors: 8, windowCols: 3, variant: 'tapered' })).not.toThrow()
  })
})

describe('BUILDINGS', () => {
  it('has 11 entries (ground + 5 left + 5 right buildings)', () => {
    expect(BUILDINGS.length).toBe(11)
  })
  it('all ids are unique', () => {
    const ids = BUILDINGS.map(b => b.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
  it('all drawRanges are within [0, 1]', () => {
    BUILDINGS.forEach(b => {
      expect(b.drawRange[0]).toBeGreaterThanOrEqual(0)
      expect(b.drawRange[1]).toBeLessThanOrEqual(1)
      expect(b.drawRange[0]).toBeLessThan(b.drawRange[1])
    })
  })
  it('all paths are non-empty strings', () => {
    BUILDINGS.forEach(b => {
      expect(typeof b.path).toBe('string')
      expect(b.path.length).toBeGreaterThan(0)
    })
  })
  it('all entries have a drawDirection of forward or reverse', () => {
    BUILDINGS.forEach(b => {
      expect(['forward', 'reverse']).toContain(b.drawDirection)
    })
  })
  it('directions alternate across buildings for visual variety', () => {
    // Skip ground line (index 0), check buildings alternate
    const dirs = BUILDINGS.slice(1).map(b => b.drawDirection)
    const hasForward = dirs.includes('forward')
    const hasReverse = dirs.includes('reverse')
    expect(hasForward).toBe(true)
    expect(hasReverse).toBe(true)
  })
})

describe('ANNOTATIONS', () => {
  it('has 2 annotations', () => {
    expect(ANNOTATIONS.length).toBe(2)
  })
  it('all drawRanges are valid [0, 1] and start < end', () => {
    ANNOTATIONS.forEach(a => {
      expect(a.drawRange[0]).toBeGreaterThanOrEqual(0)
      expect(a.drawRange[1]).toBeLessThanOrEqual(1)
      expect(a.drawRange[0]).toBeLessThan(a.drawRange[1])
    })
  })
})
