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
      result.sort((a, b) => {
        const distA = parseFloat(a.distance) || 999
        const distB = parseFloat(b.distance) || 999
        return distA - distB
      })
    } else if (activeFilter === 'price') {
      result.sort((a, b) => a.price - b.price)
    } else if (activeFilter === 'rating') {
      result.sort((a, b) => b.coachRating - a.coachRating)
    }

    return result
  }, [activeFilter, studioCourses])

  return (
    <div style={{ minHeight: '100vh', background: '#fff', paddingBottom: 32 }}>
      {/* Filter chips */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          padding: '12px 16px',
        }}
      >
        {filters.map((f) => (
          <span
            key={f.key}
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              borderRadius: 32,
              fontSize: 13,
              fontWeight: 500,
              flexShrink: 0,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              color: activeFilter === f.key ? '#fff' : '#222',
              background: activeFilter === f.key ? '#222' : '#fff',
              border: activeFilter === f.key ? 'none' : '1px solid #ddd',
            }}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </span>
        ))}
      </div>

      {/* Course list */}
      <div style={{ padding: '0 16px' }}>
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
