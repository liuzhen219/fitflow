import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import { events, coaches } from '../data/mock'
import SectionHeader from '../components/SectionHeader'
import {
  SearchIcon, ClockIcon, MapPinIcon, StarFilledIcon,
  CheckIcon, OrdersIcon, ShieldIcon, PhotoIcon,
} from '../components/Icons'

export default function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const event = events.find((e) => e.id === Number(id))
  const [registered, setRegistered] = useState(false)

  if (!event) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <SearchIcon size={48} color="#c0c0c0" />
        <p style={{ fontSize: 16, color: '#222', fontWeight: 500 }}>活动未找到</p>
        <div style={{ padding: '10px 28px', borderRadius: 24, background: '#E3617B', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }} onClick={() => nav(-1)}>返回</div>
      </div>
    )
  }

  const remaining = event.totalSpots - event.filledSpots
  const pct = Math.round((event.filledSpots / event.totalSpots) * 100)
  const coach = event.coachId ? coaches.find((c) => c.id === event.coachId) : null

  const handleRegister = () => {
    if (registered) return
    setRegistered(true)
    Toast.show({ icon: 'success', content: '报名成功！' })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Hero */}
      <div style={{ height: 260, position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #E3617B, #D44A65)' }}>
        <img src={event.image} alt={event.title}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%)' }} />
        {/* NavBar */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', zIndex: 2 }}>
          <div onClick={() => nav(-1)} style={{
            width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, color: '#fff', cursor: 'pointer', fontWeight: 700,
          }}>←</div>
        </div>
      </div>

      {/* Content */}
      <div style={{ borderRadius: '20px 20px 0 0', marginTop: -20, background: '#fff', position: 'relative', zIndex: 1, padding: '20px 16px 0' }}>
        {/* Type + Price */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
          <span style={{
            padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 600, color: '#fff',
            background: event.type === '户外' ? '#16A34A' : event.type === '工作坊' ? '#E3617B' : '#222',
          }}>{event.type}</span>
          <span style={{
            padding: '4px 12px', borderRadius: 12, fontSize: 12, fontWeight: 600,
            background: event.price === '免费' ? 'rgba(22,163,74,0.1)' : 'rgba(227,97,123,0.1)',
            color: event.price === '免费' ? '#16A34A' : '#E3617B',
          }}>{event.price}</span>
          {event.tags.map((tag) => (
            <span key={tag} style={{ padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 500, background: '#f7f7f7', color: '#6a6a6a' }}>{tag}</span>
          ))}
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#222', margin: 0, lineHeight: 1.18 }}>{event.title}</h1>

        {/* Info Row */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14, padding: '14px', background: '#fafafa', borderRadius: 12, border: '1px solid #f0f0f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#222', fontWeight: 500 }}>
            <ClockIcon size={16} color="#E3617B" />
            {event.date} · {event.time}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#222', fontWeight: 500 }}>
            <MapPinIcon size={16} color="#E3617B" />
            {event.venue}
            {event.venueId && <span style={{ fontSize: 12, color: '#E3617B', fontWeight: 600, cursor: 'pointer' }} onClick={() => nav(`/venue/${event.venueId}`)}> → 查看场馆</span>}
          </div>
          {event.coach && (
            <div
              onClick={() => event.coachId && nav(`/coach/${event.coachId}`)}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, color: '#222', fontWeight: 500, cursor: event.coachId ? 'pointer' : 'default' }}>
              <StarFilledIcon size={16} color="#E3617B" />
              带领教练：{event.coach}
              {event.coachId && <span style={{ fontSize: 12, color: '#E3617B', fontWeight: 600 }}> → 了解教练</span>}
            </div>
          )}
        </div>

        {/* Registration progress */}
        <div style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#222' }}>报名情况</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: remaining <= 5 ? '#E3617B' : '#16A34A' }}>
              {remaining <= 5 ? `仅剩 ${remaining} 位` : `剩余 ${remaining} 位 / 共 ${event.totalSpots} 位`}
            </span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: '#f0f0f0', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 3, background: remaining <= 5 ? '#E3617B' : '#16A34A', width: `${pct}%`, transition: 'width 0.3s ease' }} />
          </div>
          <p style={{ fontSize: 12, color: '#6a6a6a', marginTop: 4 }}>已报名 {event.filledSpots} 人</p>
        </div>

        <div style={{ height: 20 }} />

        {/* Description */}
        <SectionHeader title="活动介绍" icon={<OrdersIcon size={16} color="#E3617B" />} />
        <p style={{ fontSize: 14, color: '#222', lineHeight: 1.6, margin: 0 }}>{event.description}</p>

        <div style={{ height: 20 }} />

        {/* Schedule */}
        <SectionHeader title="活动流程" icon={<ClockIcon size={16} color="#E3617B" />} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderLeft: '2px solid #E3617B', marginLeft: 6, paddingLeft: 16 }}>
          {event.schedule.map((step, i) => (
            <div key={i} style={{
              padding: '8px 0', position: 'relative',
              display: 'flex', alignItems: 'flex-start', gap: 10,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#E3617B', flexShrink: 0, marginTop: 4,
                marginLeft: -21, border: '2px solid #fff', outline: '2px solid #E3617B',
              }} />
              <span style={{ fontSize: 13, color: '#222', lineHeight: 1.5 }}>{step}</span>
            </div>
          ))}
        </div>

        <div style={{ height: 20 }} />

        {/* What to bring */}
        <SectionHeader title="需要准备" icon={<ShieldIcon size={16} color="#E3617B" />} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {event.bringList.map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 8, background: '#f7f7f7', fontSize: 13, fontWeight: 500, color: '#222' }}>
              <CheckIcon size={14} color="#E3617B" />{item}
            </div>
          ))}
        </div>

        {/* Coach info */}
        {coach && (
          <>
            <div style={{ height: 20 }} />
            <SectionHeader title="带领教练" icon={<StarFilledIcon size={16} color="#E3617B" />} />
            <div
              onClick={() => nav(`/coach/${coach.id}`)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '14px',
                borderRadius: 14, border: '1px solid #ddd', cursor: 'pointer',
                background: '#fafafa',
              }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', overflow: 'hidden',
                background: '#f0f0f0', flexShrink: 0,
              }}>
                {coach.avatar && <img src={coach.avatar} alt={coach.name}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#222' }}>{coach.name}</div>
                <div style={{ fontSize: 12, color: '#6a6a6a', marginTop: 2 }}>{coach.title} · {coach.specialties.slice(0, 2).join('、')}</div>
              </div>
              <span style={{ fontSize: 14, color: '#E3617B', fontWeight: 500 }}>了解教练 →</span>
            </div>
          </>
        )}

        {/* Image gallery hint */}
        <div style={{ height: 20 }} />
        <SectionHeader title="往期活动" icon={<PhotoIcon size={16} color="#E3617B" />} />
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} style={{
              width: 140, height: 100, borderRadius: 10, overflow: 'hidden',
              flexShrink: 0, background: '#f0f0f0',
            }}>
              <img src={`https://picsum.photos/seed/past-event-${event.id}-${n}/280/200`} alt=""
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        <div style={{ height: 100 }} />
      </div>

      {/* Fixed CTA */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, background: '#fff',
        padding: '12px 16px', paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
        borderTop: '1px solid #ddd', zIndex: 10, display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: event.price === '免费' ? '#16A34A' : '#E3617B' }}>
            {event.price}
            {event.price !== '免费' && <span style={{ fontSize: 12, fontWeight: 500, color: '#6a6a6a' }}> /人</span>}
          </div>
          <div style={{ fontSize: 11, color: '#6a6a6a' }}>
            {registered ? '已报名' : `${remaining} 个名额剩余`}
          </div>
        </div>
        <div
          onClick={handleRegister}
          style={{
            padding: '14px 36px', borderRadius: 8, fontSize: 15, fontWeight: 600,
            cursor: registered ? 'default' : 'pointer',
            background: registered ? '#f7f7f7' : '#E3617B',
            color: registered ? '#6a6a6a' : '#fff',
          }}>
          {registered ? '已报名 ✓' : '立即报名'}
        </div>
      </div>
    </div>
  )
}
