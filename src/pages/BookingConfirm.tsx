import { useNavigate, useParams } from 'react-router-dom'
import { useState, useMemo } from 'react'
import StarRating from '../components/StarRating'
import PriceBreakdown from '../components/PriceBreakdown'
import { courses, venues } from '../data/mock'
import {
  SearchIcon, HomeServiceIcon, LocationIcon, ClockIcon,
} from '../components/Icons'

// Generate next N days from today
function getNextDays(count: number) {
  const days: { date: Date; label: string; weekday: string; key: string }[] = []
  const weekNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  for (let i = 0; i < count; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    days.push({
      date: d,
      label: i === 0 ? '今天' : i === 1 ? '明天' : `${d.getMonth() + 1}/${d.getDate()}`,
      weekday: weekNames[d.getDay()],
      key: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
    })
  }
  return days
}

// Generate time slots grouped by period
const timeGroups = [
  { label: '上午', icon: '🌅', slots: ['07:00', '08:00', '09:00', '10:00', '11:00'] },
  { label: '下午', icon: '☀️', slots: ['13:00', '14:00', '15:00', '16:00', '17:00'] },
  { label: '晚上', icon: '🌙', slots: ['18:00', '19:00', '20:00'] },
]

export default function BookingConfirm() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const course = courses.find((c) => c.id === Number(id))

  const days = useMemo(() => getNextDays(14), [])

  const [selectedDay, setSelectedDay] = useState(1) // default to tomorrow
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  if (!course) {
    return (
      <div style={s.page}>
        <div style={s.notFound}>
          <SearchIcon size={48} color="#c0c0c0" />
          <p style={s.notFoundText}>课程未找到</p>
          <div style={s.backBtn} onClick={() => nav(-1)}>返回</div>
        </div>
      </div>
    )
  }

  const venue = venues.find((v) => v.id === course.venueId)
  const courseFee = Math.round(course.price * 0.9)
  const venueFee = course.isHomeService ? 0 : course.price - courseFee

  // Randomly unavailable slots for realism
  const unavailableSlots = new Set(['07:00'])

  return (
    <div style={s.page}>
      {/* NavBar */}
      <div style={s.navBar}>
        <div style={s.navBack} onClick={() => nav(-1)}>‹</div>
        <div style={s.navTitle}>确认预约</div>
        <div style={s.navPlaceholder} />
      </div>

      {/* Order Summary */}
      <div style={s.card}>
        <h2 style={s.courseTitle}>{course.title}</h2>
        <div style={{ height: 8 }} />
        <div style={s.coachRow}>
          <span style={s.coachName}>{course.coachName}</span>
          <StarRating value={course.coachRating} size={11} />
          <span style={s.coachRatingNum}>{course.coachRating.toFixed(1)}</span>
        </div>
        <div style={{ height: 4 }} />
        <div style={s.venueRow}>
          {course.isHomeService
            ? <><HomeServiceIcon size={14} color="#6a6a6a" /><span style={s.venueName}>上门服务</span></>
            : <><LocationIcon size={14} color="#6a6a6a" /><span style={s.venueName}>{course.venueName}</span></>
          }
        </div>
        {!course.isHomeService && venue && (
          <div style={s.address}>{venue.address}</div>
        )}
      </div>

      {/* ====== Date Picker ====== */}
      <div style={s.section}>
        <div style={s.sectionTitle}>
          <ClockIcon size={14} color="#222" /> 选择日期
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {days.map((d, i) => {
            const isSelected = i === selectedDay
            const isPast = i === 0 && new Date().getHours() > 20
            return (
              <div key={d.key}
                onClick={() => !isPast && setSelectedDay(i)}
                style={{
                  minWidth: 64, padding: '10px 12px', borderRadius: 14,
                  textAlign: 'center', cursor: isPast ? 'default' : 'pointer',
                  flexShrink: 0, userSelect: 'none',
                  background: isSelected ? '#E3617B' : '#f7f7f7',
                  color: isSelected ? '#fff' : isPast ? '#ccc' : '#222',
                  border: isSelected ? '1.5px solid #E3617B' : '1px solid #eee',
                  opacity: isPast ? 0.5 : 1,
                }}>
                <div style={{ fontSize: 11, fontWeight: 500, marginBottom: 2 }}>
                  {d.label}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>
                  {d.weekday}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ====== Time Slot Picker ====== */}
      <div style={s.section}>
        <div style={s.sectionTitle}>
          <ClockIcon size={14} color="#222" /> 选择时段
          {selectedTime && (
            <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 600, color: '#E3617B' }}>
              {days[selectedDay].label} {days[selectedDay].weekday} {selectedTime}
            </span>
          )}
        </div>

        {timeGroups.map((group) => (
          <div key={group.label} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6a6a6a', marginBottom: 8 }}>
              {group.icon} {group.label}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {group.slots.map((slot) => {
                const isUnavailable = unavailableSlots.has(slot)
                const isActive = selectedTime === slot
                return (
                  <div key={slot}
                    onClick={() => !isUnavailable && setSelectedTime(slot)}
                    style={{
                      padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 500,
                      cursor: isUnavailable ? 'default' : 'pointer',
                      whiteSpace: 'nowrap', userSelect: 'none',
                      background: isActive ? '#E3617B' : isUnavailable ? '#f7f7f7' : '#fff',
                      color: isActive ? '#fff' : isUnavailable ? '#ccc' : '#222',
                      border: isActive ? '1.5px solid #E3617B'
                        : isUnavailable ? '1px solid #f0f0f0' : '1px solid #ddd',
                      textDecoration: isUnavailable ? 'line-through' : 'none',
                    }}>
                    {slot}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ====== Price ====== */}
      <div style={s.section}>
        <div style={s.priceCard}>
          <PriceBreakdown courseFee={courseFee} venueFee={venueFee} total={course.price} />
        </div>
      </div>

      {/* ====== Pay Button ====== */}
      <div style={s.payArea}>
        <div style={{ textAlign: 'center', marginBottom: 8, fontSize: 12, color: '#6a6a6a' }}>
          {selectedTime
            ? `${days[selectedDay].label}${days[selectedDay].weekday} ${selectedTime} · ${course.duration}分钟`
            : '请选择日期和时段'}
        </div>
        <button
          style={{ ...s.payBtn, opacity: selectedTime ? 1 : 0.4 }}
          onClick={() => selectedTime && nav(`/payment-success/${course.id}`)}
          disabled={!selectedTime}
        >
          确认支付 ¥{course.price}
        </button>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#fff', paddingBottom: 20 },
  notFound: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 12, padding: 20 },
  notFoundText: { fontSize: 16, color: '#222', fontWeight: 500, margin: 0 },
  backBtn: { marginTop: 8, padding: '10px 28px', borderRadius: 24, background: '#E3617B', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' },

  navBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', paddingTop: 16 },
  navBack: { width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#fff', cursor: 'pointer', fontWeight: 400, lineHeight: '34px', flexShrink: 0 },
  navTitle: { fontSize: 16, fontWeight: 600, color: '#222' },
  navPlaceholder: { width: 32 },

  card: { margin: '0 12px', padding: 16, background: '#fff', borderRadius: 16, border: '1px solid #ddd' },
  courseTitle: { fontSize: 15, fontWeight: 700, color: '#222', margin: 0, lineHeight: 1.3 },
  coachRow: { display: 'flex', alignItems: 'center', gap: 6 },
  coachName: { fontSize: 13, color: '#222' },
  coachRatingNum: { fontSize: 11, color: '#6a6a6a' },
  venueRow: { display: 'flex', alignItems: 'center', gap: 4 },
  venueName: { fontSize: 12, color: '#6a6a6a' },
  address: { fontSize: 11, color: '#6a6a6a', marginTop: 2, lineHeight: 1.3 },

  section: { margin: '16px 12px 0' },
  sectionTitle: { fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4 },

  priceCard: { background: '#fff', borderRadius: 16, padding: 14, border: '1px solid #ddd' },
  payArea: { margin: '20px 12px 0' },
  payBtn: { width: '100%', padding: '14px 0', borderRadius: 24, background: '#E3617B', color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer', textAlign: 'center', lineHeight: 1.2 },
}
