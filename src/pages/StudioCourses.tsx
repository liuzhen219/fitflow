import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import EmptyState from '../components/EmptyState'
import { courses, venues } from '../data/mock'
import { BuildingIcon, StarFilledIcon, LocationIcon } from '../components/Icons'

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
    return courses.filter((c) => !c.isHomeService)
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
    } else if (activeFilter === 'price') {
      result.sort((a, b) => a.price - b.price)
    } else if (activeFilter === 'rating') {
      result.sort((a, b) => b.coachRating - a.coachRating)
    }

    return result
  }, [activeFilter, studioCourses])

  // Group courses by venue
  const groupedByVenue = useMemo(() => {
    const groups: Record<number, typeof filtered> = {}
    const venueOrder: number[] = []

    for (const course of filtered) {
      if (!groups[course.venueId]) {
        groups[course.venueId] = []
        venueOrder.push(course.venueId)
      }
      groups[course.venueId].push(course)
    }
    return { groups, venueOrder }
  }, [filtered])

  return (
    <div style={{ minHeight: '100vh', background: '#fff', paddingBottom: 32 }}>
      {/* Page hero — image with gradient fallback */}
      <div style={{
        height: 160, margin: '0 16px', borderRadius: 16, overflow: 'hidden',
        position: 'relative', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '20px',
        background: 'linear-gradient(135deg, #E3617B, #D44A65)',
      }}>
        {/* Hero image */}
        <img
          src="https://images.unsplash.com/photo-1599901868904-6f95f09e0a1c?w=800&h=300&fit=crop"
          alt=""
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 100%)',
        }} />
        {/* Text */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.18 }}>
            场馆课程
          </h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', margin: '4px 0 0', lineHeight: 1.29 }}>
            到店体验专业器械 · 找到你附近的优质场馆
          </p>
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ position: 'relative', marginTop: 12 }}>
        <div style={{
          display: 'flex', gap: 8, overflowX: 'auto',
          padding: '10px 16px 14px', scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          maskImage: 'linear-gradient(to right, #000 calc(100% - 40px), transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, #000 calc(100% - 40px), transparent 100%)',
        }}>
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

      {/* Course list — grouped by venue */}
      <div style={{ padding: '0 16px' }}>
        <div style={{
          padding: '10px 0', fontSize: 13, fontWeight: 500, color: '#6a6a6a',
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          共 <span style={{ color: '#E3617B', fontWeight: 700, fontSize: 15 }}>{filtered.length}</span> 节场馆课程
        </div>

        {filtered.length > 0 ? (
          groupedByVenue.venueOrder.map((venueId) => {
            const venue = venues.find((v) => v.id === venueId)
            const venueCourses = groupedByVenue.groups[venueId]

            return (
              <div key={venueId} style={{ marginBottom: 8 }}>
                {/* Venue header — clickable card */}
                <div
                  onClick={() => nav(`/venue/${venueId}`)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 14px', borderRadius: 14,
                    background: '#fafafa', border: '1px solid #eee',
                    cursor: 'pointer', marginBottom: 4,
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    width: 56, height: 56, borderRadius: 12, flexShrink: 0,
                    background: venue?.heroImage
                      ? `url(${venue.heroImage}) center/cover no-repeat`
                      : 'linear-gradient(135deg, #f5e0d8, #e8d4c8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {!venue?.heroImage && <BuildingIcon size={22} color="#fff" />}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 15, fontWeight: 600, color: '#222' }}>
                        {venue?.name || venueCourses[0]?.venueName}
                      </span>
                      {venue?.verified && (
                        <span style={{
                          fontSize: 10, fontWeight: 600, color: '#E3617B',
                          background: 'rgba(227,97,123,0.08)', padding: '2px 6px',
                          borderRadius: 4,
                        }}>已核验</span>
                      )}
                    </div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      marginTop: 3, fontSize: 12, color: '#6a6a6a',
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <LocationIcon size={11} color="#6a6a6a" /> {venue?.district || ''} · {venueCourses[0]?.distance}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <StarFilledIcon size={11} color="#E3617B" /> {venue?.rating.toFixed(1)}
                      </span>
                      <span style={{ color: '#6a6a6a' }}>{venue?.reviewCount}条评价</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#6a6a6a', marginTop: 2 }}>
                      {venue?.facilities?.slice(0, 4).join(' · ')}
                    </div>
                  </div>

                  {/* CTA arrow */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 2,
                    flexShrink: 0, color: '#E3617B', fontSize: 12, fontWeight: 500,
                  }}>
                    进入 ›
                  </div>
                </div>

                {/* Courses under this venue — slight left indent */}
                <div style={{
                  borderLeft: '2px solid #f0f0f0',
                  marginLeft: 28, paddingLeft: 12,
                }}>
                  {venueCourses.map((course) => (
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
                  ))}
                </div>
              </div>
            )
          })
        ) : (
          <EmptyState text="暂无符合条件的场馆课程" />
        )}
      </div>

      {/* Bottom spacer for TabBar */}
      <div style={{ height: 70 }} />
    </div>
  )
}
