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
    let result = [...studioCourses]

    if (activeFilter === 'corebed') {
      result = result.filter((c) => c.title.includes('核心床'))
    } else if (activeFilter === 'mat') {
      result = result.filter((c) => c.title.includes('垫上'))
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
    <div style={s.page}>
      {/* Filter chips */}
      <div style={s.filterRow}>
        {filters.map((f) => (
          <span
            key={f.key}
            style={{
              ...s.chip,
              ...(activeFilter === f.key ? s.chipActive : {}),
            }}
            onClick={() => setActiveFilter(f.key)}
          >
            {f.label}
          </span>
        ))}
      </div>

      {/* Course list */}
      <div style={s.list}>
        {filtered.length > 0 ? (
          filtered.map((course) => (
            <div key={course.id} style={{ marginBottom: 12 }}>
              <CourseCard
                title={course.title}
                coachName={course.coachName}
                venueName={course.venueName}
                distance={course.distance}
                duration={`${course.duration} min`}
                price={course.price}
                time={course.time}
                imageGradient={course.imageGradient}
                isHomeService={course.isHomeService}
                onClick={() => nav(`/course/${course.id}`)}
              />
            </div>
          ))
        ) : (
          <EmptyState
            icon="📭"
            text="暂无符合条件的场馆课程"
          />
        )}
      </div>

      {/* Bottom spacer for TabBar */}
      <div style={s.bottomSpacer} />
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#FFF5F0',
    padding: '0 16px',
    paddingTop: 12,
  },
  filterRow: {
    display: 'flex',
    gap: 8,
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    paddingBottom: 12,
    paddingTop: 4,
  },
  chip: {
    display: 'inline-block',
    padding: '7px 16px',
    borderRadius: 18,
    fontSize: 12,
    color: '#8B7E74',
    background: '#FFFFFF',
    border: '1px solid #F0E8E0',
    cursor: 'pointer',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    fontWeight: 400,
  },
  chipActive: {
    color: '#FFFFFF',
    background: '#E8B4A2',
    borderColor: '#E8B4A2',
    fontWeight: 500,
  },
  list: {
    paddingBottom: 8,
  },
  bottomSpacer: {
    height: 70,
  },
}
