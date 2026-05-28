import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BUILDINGS, ANNOTATIONS } from '../lib/buildings'

export function SkylineCanvas() {
  const buildingRefs = useRef<Map<string, SVGPathElement>>(new Map())
  const annotationRefs = useRef<Map<string, SVGPathElement>>(new Map())
  const annotationTextRefs = useRef<Map<string, SVGTextElement>>(new Map())

  const setBuildingRef = (id: string) => (el: SVGPathElement | null) => {
    if (el) buildingRefs.current.set(id, el)
    else buildingRefs.current.delete(id)
  }

  const setAnnotationRef = (id: string) => (el: SVGPathElement | null) => {
    if (el) annotationRefs.current.set(id, el)
    else annotationRefs.current.delete(id)
  }

  const setAnnotationTextRef = (id: string) => (el: SVGTextElement | null) => {
    if (el) annotationTextRefs.current.set(id, el)
    else annotationTextRefs.current.delete(id)
  }

  useEffect(() => {
    const tl = gsap.timeline({ paused: true })

    BUILDINGS.forEach(building => {
      const path = buildingRefs.current.get(building.id)
      if (!path) return
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      tl.to(
        path,
        { strokeDashoffset: 0, ease: 'none', duration: building.drawRange[1] - building.drawRange[0] },
        building.drawRange[0],
      )
    })

    ANNOTATIONS.forEach(ann => {
      const path = annotationRefs.current.get(ann.id)
      const text = annotationTextRefs.current.get(ann.id)
      if (!path) return
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      gsap.set([path, text].filter(Boolean), { opacity: 0 })
      tl.to(
        path,
        { strokeDashoffset: 0, opacity: 1, ease: 'none', duration: ann.drawRange[1] - ann.drawRange[0] },
        ann.drawRange[0],
      )
      if (text) {
        tl.to(text, { opacity: 1, duration: 0.02 }, ann.drawRange[1] - 0.02)
      }
    })

    const st = ScrollTrigger.create({
      animation: tl,
      start: 0,
      end: 'max',
      scrub: 0.8,
    })

    return () => {
      st.kill()
      tl.kill()
    }
  }, [])

  return (
    <div className="sticky top-0 h-screen w-full flex items-end">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMax meet"
        style={{ filter: 'drop-shadow(0 0 8px rgba(37,99,235,0.3))' }}
      >
        {BUILDINGS.map(building => (
          <path
            key={building.id}
            ref={setBuildingRef(building.id)}
            d={building.path}
            stroke={building.strokeColor}
            strokeWidth={building.strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {ANNOTATIONS.map(ann => (
          <g key={ann.id}>
            <path
              ref={setAnnotationRef(ann.id)}
              d={ann.path}
              stroke="#93c5fd"
              strokeWidth={1}
              fill="none"
              strokeLinecap="round"
            />
            <text
              ref={setAnnotationTextRef(ann.id)}
              x={ann.labelX}
              y={ann.labelY}
              fill="#93c5fd"
              fontSize="10"
              fontFamily="JetBrains Mono, monospace"
            >
              {ann.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
