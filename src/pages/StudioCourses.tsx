import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import EmptyState from '../components/EmptyState'
import { courses } from '../data/mock'

const filters = [
  { key: 'all', label: '全部' },
  { key: 'distance', label: '距离最近' },
  { key: 'price', label: '价格最低' },
  { key: 'rating', label: '评分最高' },
  { key: 'corebed', label: '核心床' },
  { key: 'mat', label: '垫上' },
]

export default function StudioCourses() {
  const nav = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')

  const studioCourses = useMemo(() => {
    const base = courses.filter((c) => !c.isHomeService)
    return base
  }, [])

  const filtered = useMemo(() => {
    const result = [...studioCourses]

    if (activeFilter === 'corebed') {
      return result.filter((c) => c.title.includes('核心床'))
    } else if (activeFilter === 'mat') {
      return result.filter((c) => c.title.includes('垫上'))
    }

    if (activeFilter === 'distance') {
      result.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
    }

    if (activeFilter === 'price') {
      result.sort((a, b) => a.price - b.price)
    } else if (activeFilter === 'rating') {
      result.sort((a, b) => b.coachRating - a.coachRating)
    }

    return result
  }, [activeFilter, studioCourses])

  return (
    <div style={{ minHeight: '100vh', background: '#fff', paddingBottom: 32 }}>
      {/* Page header */}
      <div style={{ padding: '16px 16px 4px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#222', margin: 0, lineHeight: 1.18 }}>
          场馆课程
        </h1>
        <p style={{ fontSize: 13, color: '#6a6a6a', margin: '4px 0 0', lineHeight: 1.29 }}>
          到店体验专业器械 · 找到你附近的优质场馆
        </p>
      </div>

      {/* Filter chips — scrollable with fade hint */}
      <div style={{ position: 'relative' }}>
        <div
          style={{
            display: 'flex', gap: 8, overflowX: 'auto',
            padding: '14px 16px', scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
            maskImage: 'linear-gradient(to right, #000 calc(100% - 40px), transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, #000 calc(100% - 40px), transparent 100%)',
          }}
        >
          {filters.map((f) => (
            <span
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              style={{
                padding: '8px 16px', borderRadius: 32, fontSize: 13, fontWeight: 500,
                flexShrink: 0, whiteSpace: 'nowrap', cursor: 'pointer',
                transition: 'all 0.15s ease', userSelect: 'none',
                color: activeFilter === f.key ? '#fff' : '#222',
                background: activeFilter === f.key ? '#E3617B' : '#fff',
                border: activeFilter === f.key ? '1px solid #E3617B' : '1px solid #ddd',
              }}
            >
              {f.label}
            </span>
          ))}
        </div>
      </div>

      {/* Course list */}
      <div style={{ padding: '0 16px' }}>
        <div style={{
          padding: '10px 0', fontSize: 13, fontWeight: 500, color: '#6a6a6a',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          共 <span style={{ color: '#E3617B', fontWeight: 700, fontSize: 15 }}>{filtered.length}</span> 节场馆课程
        </div>
        {filtered.length > 0 ? (
          filtered.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              coachName={course.coachName}
              venueName={course.venueName}
              distance={course.distance}
              duration={course.duration}
              price={course.price}
              time={course.time}
              imageGradient={course.imageGradient}
              isHomeService={course.isHomeService}
              thumbnail={course.thumbnail}
              onClick={() => nav(`/course/${course.id}`)}
            />
          ))
        ) : (
          <EmptyState text="暂无符合条件的场馆课程" />
        )}
      </div>

      {/* Bottom spacer for TabBar */}
      <div style={{ height: 70 }} />
    </div>
  )
}
