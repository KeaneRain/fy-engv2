import { describe, it, expect } from 'vitest'
import { mapRange, clamp, getBuildingProgress } from '../scroll'

describe('mapRange', () => {
  it('maps midpoint correctly', () => {
    expect(mapRange(0.5, 0, 1, 0, 100)).toBe(50)
  })
  it('maps at lower boundary', () => {
    expect(mapRange(0, 0, 1, 0, 100)).toBe(0)
  })
  it('maps at upper boundary', () => {
    expect(mapRange(1, 0, 1, 0, 100)).toBe(100)
  })
  it('maps partial range', () => {
    expect(mapRange(0.5, 0.25, 0.75, 0, 1)).toBe(0.5)
  })
})

describe('clamp', () => {
  it('clamps below min to min', () => expect(clamp(-5, 0, 1)).toBe(0))
  it('clamps above max to max', () => expect(clamp(5, 0, 1)).toBe(1))
  it('passes through value within range', () => expect(clamp(0.4, 0, 1)).toBe(0.4))
  it('passes through value at min boundary', () => expect(clamp(0, 0, 1)).toBe(0))
  it('passes through value at max boundary', () => expect(clamp(1, 0, 1)).toBe(1))
})

describe('getBuildingProgress', () => {
  it('returns 0 when scroll is before draw range', () => {
    expect(getBuildingProgress(0.05, [0.1, 0.3])).toBe(0)
  })
  it('returns 1 when scroll is past draw range', () => {
    expect(getBuildingProgress(0.5, [0.1, 0.3])).toBe(1)
  })
  it('returns 0.5 at midpoint of draw range', () => {
    expect(getBuildingProgress(0.2, [0.1, 0.3])).toBeCloseTo(0.5)
  })
  it('returns 0 at exact draw range start', () => {
    expect(getBuildingProgress(0.1, [0.1, 0.3])).toBe(0)
  })
  it('returns 1 at exact draw range end', () => {
    expect(getBuildingProgress(0.3, [0.1, 0.3])).toBe(1)
  })
})
