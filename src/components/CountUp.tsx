import { useState, useEffect, useRef } from 'react'

export default function CountUp({ end, suffix = '', duration = 600 }: { end: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0)
  const raf = useRef<number>(0)
  const start = useRef(0)

  useEffect(() => {
    setVal(0)
    start.current = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - start.current) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(end * eased))
      if (p < 1) raf.current = requestAnimationFrame(step)
    }
    raf.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf.current)
  }, [end, duration])

  return <span className="count-up">{val}{suffix}</span>
}
