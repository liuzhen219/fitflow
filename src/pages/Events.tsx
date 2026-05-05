import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { events } from '../data/mock'
import {
  ClockIcon, MapPinIcon, StarFilledIcon, FireIcon,
} from '../components/Icons'

const typeFilters = [
  { key: 'all', label: '全部' },
  { key: '户外', label: '户外' },
  { key: '工作坊', label: '工作坊' },
  { key: '社交', label: '社交' },
]

export default function Events() {
  const nav = useNavigate()
  const [activeType, setActiveType] = useState('all')

  const filtered = useMemo(() => {
    if (activeType === 'all') return events
    return events.filter((e) => e.type === activeType)
  }, [activeType])

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Hero */}
      <div style={{
        height: 160, margin: '0 16px', borderRadius: 16, overflow: 'hidden',
        position: 'relative', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '20px', marginTop: 16,
        background: 'linear-gradient(135deg, #E3617B, #D44A65)',
      }}>
        <img
          src="https://picsum.photos/seed/events-hero/800/400"
          alt="" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
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
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.18 }}>线下活动</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', margin: '4px 0 0' }}>
            与教练和伙伴面对面，探索普拉提的更多可能
          </p>
        </div>
      </div>

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '14px 16px', scrollbarWidth: 'none' }}>
        {typeFilters.map((f) => (
          <span key={f.key} onClick={() => setActiveType(f.key)}
            style={{
              padding: '8px 16px', borderRadius: 32, fontSize: 13, fontWeight: 500,
              flexShrink: 0, cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'all 0.15s ease', userSelect: 'none',
              display: 'flex', alignItems: 'center', gap: 4,
              color: activeType === f.key ? '#fff' : '#222',
              background: activeType === f.key ? '#E3617B' : '#fff',
              border: activeType === f.key ? '1px solid #E3617B' : '1px solid #ddd',
            }}>
            {activeType === f.key && <FireIcon size={14} color="#fff" />}
            {f.label}
          </span>
        ))}
      </div>

      {/* Event list */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ padding: '8px 0 14px', fontSize: 13, color: '#6a6a6a', fontWeight: 500 }}>
          共 <span style={{ color: '#E3617B', fontWeight: 700, fontSize: 15 }}>{filtered.length}</span> 场活动
        </div>

        {filtered.map((ev) => {
          const remaining = ev.totalSpots - ev.filledSpots
          const pct = Math.round((ev.filledSpots / ev.totalSpots) * 100)
          return (
            <div key={ev.id}
              onClick={() => nav(`/event/${ev.id}`)}
              style={{
                borderRadius: 14, overflow: 'hidden', background: '#fff',
                border: '1px solid #ddd', marginBottom: 14, cursor: 'pointer',
              }}>
              {/* Image */}
              <div style={{ height: 160, position: 'relative', overflow: 'hidden', background: '#f0f0f0' }}>
                <img src={ev.image} alt={ev.title}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <span style={{
                  position: 'absolute', top: 10, left: 10, padding: '4px 10px',
                  borderRadius: 12, fontSize: 11, fontWeight: 600, color: '#fff',
                  background: ev.type === '户外' ? 'rgba(22,163,74,0.85)'
                    : ev.type === '工作坊' ? 'rgba(227,97,123,0.85)'
                    : 'rgba(34,34,34,0.8)',
                }}>{ev.type}</span>
                <span style={{
                  position: 'absolute', top: 10, right: 10, padding: '4px 10px',
                  borderRadius: 12, fontSize: 12, fontWeight: 600, color: '#fff',
                  background: ev.price === '免费' ? 'rgba(22,163,74,0.85)' : 'rgba(0,0,0,0.55)',
                }}>{ev.price}</span>
              </div>
              {/* Content */}
              <div style={{ padding: 14 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: '#222', margin: 0, lineHeight: 1.25 }}>
                  {ev.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6a6a6a' }}>
                    <ClockIcon size={12} color="#6a6a6a" />{ev.date} · {ev.time}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6a6a6a' }}>
                    <MapPinIcon size={12} color="#6a6a6a" />{ev.venue}
                    {ev.coach && <span> · 👤 {ev.coach}</span>}
                  </div>
                </div>
                {/* Progress */}
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: '#6a6a6a' }}>已报 {ev.filledSpots}/{ev.totalSpots} 人</span>
                    <span style={{
                      fontSize: 11, fontWeight: 600,
                      color: remaining <= 5 ? '#E3617B' : '#16A34A',
                    }}>
                      {remaining <= 5 ? `仅剩 ${remaining} 位` : `余 ${remaining} 位`}
                    </span>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: '#f0f0f0', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 2, background: remaining <= 5 ? '#E3617B' : '#E3617B', opacity: remaining <= 5 ? 1 : 0.6, width: `${pct}%`, transition: 'width 0.3s ease' }} />
                  </div>
                </div>
                {/* Tags */}
                <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                  {ev.tags.map((tag) => (
                    <span key={tag} style={{ padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500, background: '#f7f7f7', color: '#6a6a6a' }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ height: 70 }} />
    </div>
  )
}
