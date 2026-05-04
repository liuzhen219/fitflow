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
  { key: 'postnatal', label: '产后恢复' },
  { key: 'rehab', label: '康复训练' },
]

export default function HomeService() {
  const nav = useNavigate()
  const [activeFilter, setActiveFilter] = useState('all')

  const homeServiceCourses = useMemo(() => {
    const base = courses.filter((c) => c.isHomeService)
    return base
  }, [])

  const filtered = useMemo(() => {
    const result = [...homeServiceCourses]

    if (activeFilter === 'postnatal') {
      return result.filter((c) => c.title.includes('产后'))
    } else if (activeFilter === 'rehab') {
      return result.filter((c) => c.title.includes('康复'))
    }

    if (activeFilter === 'price') {
      result.sort((a, b) => a.price - b.price)
    } else if (activeFilter === 'rating') {
      result.sort((a, b) => b.coachRating - a.coachRating)
    }

    return result
  }, [activeFilter, homeServiceCourses])

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
          <EmptyState text="暂无符合条件的上门服务课程" />
        )}
      </div>

      {/* Bottom spacer for TabBar */}
      <div style={{ height: 70 }} />
    </div>
  )
}
