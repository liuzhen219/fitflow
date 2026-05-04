import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import StarRating from '../components/StarRating'
import PriceBreakdown from '../components/PriceBreakdown'
import { courses, venues } from '../data/mock'
import {
  SearchIcon,
  HomeServiceIcon,
  LocationIcon,
  ClockIcon,
} from '../components/Icons'

const timeSlots = ['周六 10:00', '周六 14:00', '周日 09:00', '周一 10:00']

export default function BookingConfirm() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const course = courses.find((c) => c.id === Number(id))

  const [selectedTime, setSelectedTime] = useState(0)

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

  return (
    <div style={s.page}>
      {/* NavBar */}
      <div style={s.navBar}>
        <div style={s.navBack} onClick={() => nav(-1)}>←</div>
        <div style={s.navTitle}>确认预约</div>
        <div style={s.navPlaceholder} />
      </div>

      {/* Order Summary Card */}
      <div style={s.card}>
        <h2 style={s.courseTitle}>{course.title}</h2>

        <div style={{ height: 8 }} />

        <div style={s.coachRow}>
          <span style={s.coachName}>{course.coachName}</span>
          <StarRating value={course.coachRating} size={11} />
          <span style={s.coachRatingNum}>{course.coachRating.toFixed(1)}</span>
        </div>

        <div style={{ height: 6 }} />

        <div style={s.venueRow}>
          {course.isHomeService ? (
            <HomeServiceIcon size={14} color="#6a6a6a" />
          ) : (
            <LocationIcon size={14} color="#6a6a6a" />
          )}
          <span style={s.venueName}>
            {course.isHomeService ? '上门服务' : course.venueName}
          </span>
        </div>

        {!course.isHomeService && venue && (
          <div style={s.address}>{venue.address}</div>
        )}
      </div>

      {/* Time Selection */}
      <div style={s.section}>
        <div style={s.sectionTitle}>
          <ClockIcon size={14} color="#222" />
          {' '}选择时间
        </div>
        <div style={s.timeChips}>
          {timeSlots.map((t, i) => (
            <div
              key={i}
              style={{
                ...s.timeChip,
                ...(i === selectedTime ? s.timeChipActive : {}),
              }}
              onClick={() => setSelectedTime(i)}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Price Breakdown */}
      <div style={s.section}>
        <div style={s.priceCard}>
          <PriceBreakdown
            courseFee={courseFee}
            venueFee={venueFee}
            total={course.price}
          />
        </div>
      </div>

      {/* Pay Button */}
      <div style={s.payArea}>
        <button
          style={s.payBtn}
          onClick={() => nav(`/payment-success/${course.id}`)}
        >
          确认支付 ¥{course.price}
        </button>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#fff',
    paddingBottom: 20,
  },

  // Not found
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: 12,
    padding: 20,
  },
  notFoundText: { fontSize: 16, color: '#222', fontWeight: 500, margin: 0 },
  backBtn: {
    marginTop: 8,
    padding: '10px 28px',
    borderRadius: 24,
    background: '#E3617B',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },

  // NavBar
  navBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    paddingTop: 16,
  },
  navBack: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'rgba(227,97,123,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    color: '#222',
    cursor: 'pointer',
    fontWeight: 700,
    lineHeight: 1,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#222',
  },
  navPlaceholder: { width: 32 },

  // Order Card
  card: {
    margin: '0 12px',
    padding: 16,
    background: '#FFFFFF',
    borderRadius: 16,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  courseTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#222',
    margin: 0,
    lineHeight: 1.3,
  },
  coachRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  coachName: {
    fontSize: 13,
    color: '#222',
  },
  coachRatingNum: {
    fontSize: 11,
    color: '#6a6a6a',
  },
  venueRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  venueName: {
    fontSize: 12,
    color: '#6a6a6a',
  },
  address: {
    fontSize: 11,
    color: '#6a6a6a',
    marginTop: 2,
    lineHeight: 1.3,
  },

  // Section
  section: {
    margin: '16px 12px 0',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#222',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },

  // Time Chips
  timeChips: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  timeChip: {
    padding: '8px 14px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 500,
    background: '#FFFFFF',
    color: '#222',
    border: '1px solid #ddd',
    cursor: 'pointer',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
  },
  timeChipActive: {
    background: '#E3617B',
    color: '#FFFFFF',
    border: '1px solid #E3617B',
  },

  // Price Card
  priceCard: {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },

  // Pay Area
  payArea: {
    margin: '16px 12px 0',
  },
  payBtn: {
    width: '100%',
    padding: '14px 0',
    borderRadius: 24,
    background: '#E3617B',
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    lineHeight: 1.2,
  },
}
