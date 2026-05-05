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
      {/* Page hero — image with gradient fallback */}
      <div style={{
        height: 160, margin: '0 16px', borderRadius: 16, overflow: 'hidden',
        position: 'relative', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '20px',
        background: 'linear-gradient(135deg, #222, #444)',
      }}>
        {/* Hero image */}
        <img
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=300&fit=crop"
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.1) 100%)',
        }} />
        {/* Text */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.18 }}>
            上门私教
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', margin: '4px 0 0', lineHeight: 1.29 }}>
            专业教练到你家 · 足不出户享受一对一私教
          </p>
        </div>
      </div>

      {/* Filter chips — scrollable with fade hint */}
      <div style={{ position: 'relative', marginTop: 12 }}>
        <div
          style={{
            display: 'flex', gap: 8, overflowX: 'auto',
            padding: '10px 16px 14px', scrollbarWidth: 'none',
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
          共 <span style={{ color: '#E3617B', fontWeight: 700, fontSize: 15 }}>{filtered.length}</span> 节上门课程
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
          <EmptyState text="暂无符合条件的上门服务课程" />
        )}
      </div>

      {/* Bottom spacer for TabBar */}
      <div style={{ height: 70 }} />
    </div>
  )
}
