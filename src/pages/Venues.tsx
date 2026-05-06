import { useNavigate } from 'react-router-dom'
import VenueCard from '../components/VenueCard'
import SectionHeader from '../components/SectionHeader'
import { useMemo } from 'react'
import { venues } from '../data/mock'
import { BuildingIcon } from '../components/Icons'

export default function Venues() {
  const nav = useNavigate()

  const stats = useMemo(() => {
    const districts = [...new Set(venues.map((v) => v.district))]
    const avgRating = venues.reduce((s, v) => s + v.rating, 0) / venues.length
    return {
      count: `${venues.length}家`,
      districts: `${districts.length}个区域`,
      avgRating: avgRating.toFixed(1),
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Hero */}
      <div style={{
        height: 160, margin: '0 16px', borderRadius: 16, overflow: 'hidden',
        position: 'relative', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '20px', marginTop: 16,
        background: 'linear-gradient(135deg, #E3617B, #D44A65)',
      }}>
        <img src="" alt=""
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 25%, transparent 70%, rgba(0,0,0,0.5) 100%)',
        }} />
        {/* Back button — absolute at top */}
        <div onClick={() => nav(-1)} style={{
          position: 'absolute', top: 14, left: 16, zIndex: 2,
          width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: '#fff', cursor: 'pointer', fontWeight: 400, lineHeight: '34px', flexShrink: 0,
        }}>‹</div>
        {/* Title */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.18 }}>精选场馆</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', margin: '4px 0 0' }}>探索优质训练空间，找到你附近的专业场馆</p>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-around', padding: '16px 12px',
        margin: '12px 12px 0', background: '#fff', borderRadius: 14, border: '1px solid #ddd',
      }}>
        {[
          { value: stats.count, label: '合作场馆' },
          { value: stats.districts, label: '覆盖区域' },
          { value: stats.avgRating, label: '场馆均分' },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--c-accent)' }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#6a6a6a', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{ padding: '16px 12px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {venues.map((v) => (
          <VenueCard
            key={v.id}
            name={v.name}
            district={v.district}
            distance={v.distance}
            rating={v.rating}
            reviewCount={v.reviewCount}
            imageUrl={v.heroImage}
            facilities={v.facilities}
            verified={v.verified}
            onClick={() => nav(`/venue/${v.id}`)}
          />
        ))}
      </div>

      <div style={{ height: 70 }} />
    </div>
  )
}
