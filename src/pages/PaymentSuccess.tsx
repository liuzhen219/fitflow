import { useNavigate, useParams } from 'react-router-dom'
import { courses, coaches, venues } from '../data/mock'
import {
  SearchIcon,
  CheckIcon,
  CalendarIcon,
  OrdersIcon,
  HomeServiceIcon,
  QRIcon,
} from '../components/Icons'

export default function PaymentSuccess() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const course = courses.find((c) => c.id === Number(id))

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

  const coach = coaches.find((c) => c.id === course.coachId)
  const venue = venues.find((v) => v.id === course.venueId)

  return (
    <div style={s.page}>
      {/* Success Check */}
      <div style={s.checkArea}>
        <div className="a-check" style={s.checkIcon}>
          <CheckIcon size={56} color="#16A34A" />
        </div>
        <h1 style={s.successTitle}>预约成功!</h1>
        <p style={s.subtitle}>课程开始前1小时可签到</p>
      </div>

      {/* QR Code */}
      <div style={s.qrSection}>
        <div style={s.qrBox}>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://fitflow.app/checkin/12345"
            alt="签到二维码"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            style={{ width: 140, height: 140, borderRadius: 12 }}
          />
        </div>
        <p style={s.qrHint}>到店出示此码完成签到核销</p>
      </div>

      {/* Course Reminder Card */}
      <div style={s.reminderCard}>
        <h3 style={s.reminderTitle}>
          <CalendarIcon size={16} color="#E3617B" />
          {' '}课程提醒
        </h3>

        <div style={s.reminderList}>
          <div style={s.reminderItem}>
            <span style={s.reminderLabel}>日期</span>
            <span style={s.reminderValue}>2026年5月9日 周六</span>
          </div>
          <div style={s.reminderItem}>
            <span style={s.reminderLabel}>时间</span>
            <span style={s.reminderValue}>10:00 - {10 + Math.floor(course.duration / 60)}:{String(course.duration % 60).padStart(2, '0')}</span>
          </div>
          <div style={s.reminderItem}>
            <span style={s.reminderLabel}>场馆</span>
            <span style={s.reminderValue}>
              {course.isHomeService ? (
                <span><HomeServiceIcon size={12} color="#6a6a6a" /> 上门服务</span>
              ) : (
                course.venueName
              )}
            </span>
          </div>
          <div style={s.reminderItem}>
            <span style={s.reminderLabel}>教练</span>
            <span style={s.reminderValue}>
              {coach ? `${coach.name} · ${coach.title}` : course.coachName}
            </span>
          </div>
          {!course.isHomeService && venue && (
            <div style={s.reminderItem}>
              <span style={s.reminderLabel}>地址</span>
              <span style={s.reminderValue}>{venue.address}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={s.actionRow}>
        <button
          style={s.actionOutline}
          onClick={() => nav('/schedule')}
        >
          <OrdersIcon size={14} color="#E3617B" />
          {' '}查看订单
        </button>
        <button
          style={s.actionPrimary}
          onClick={() => {
            // Add to calendar placeholder
          }}
        >
          <CalendarIcon size={14} color="#E3617B" />
          {' '}添加到日历
        </button>
      </div>

      {/* Back Home Button */}
      <div style={s.backHomeArea}>
        <button style={s.backHomeBtn} onClick={() => nav('/home')}>
          返回首页
        </button>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 16px 20px',
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

  // Check Area
  checkArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  checkIcon: {
    marginBottom: 16,
    lineHeight: 1,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: '#222',
    margin: '0 0 8px',
    lineHeight: 1.3,
  },
  subtitle: {
    fontSize: 13,
    color: '#6a6a6a',
    margin: 0,
    lineHeight: 1.3,
  },

  // QR Section
  qrSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 32,
  },
  qrBox: {
    width: 140,
    height: 140,
    background: '#FFFFFF',
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
  },
  qrHint: {
    fontSize: 11,
    color: '#6a6a6a',
    marginTop: 10,
    lineHeight: 1.3,
  },

  // Reminder Card
  reminderCard: {
    width: '100%',
    maxWidth: 360,
    marginTop: 24,
    padding: 16,
    background: '#FFFFFF',
    borderRadius: 16,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  reminderTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: '#222',
    margin: '0 0 12px',
    lineHeight: 1.3,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  reminderList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  reminderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  reminderLabel: {
    fontSize: 12,
    color: '#6a6a6a',
    flexShrink: 0,
    width: 36,
    lineHeight: 1.4,
  },
  reminderValue: {
    fontSize: 13,
    color: '#222',
    fontWeight: 500,
    textAlign: 'right',
    lineHeight: 1.4,
    flex: 1,
  },

  // Action Row
  actionRow: {
    width: '100%',
    maxWidth: 360,
    display: 'flex',
    gap: 10,
    marginTop: 20,
  },
  actionOutline: {
    flex: 1,
    padding: '12px 0',
    borderRadius: 24,
    background: '#FFFFFF',
    color: '#E3617B',
    fontSize: 13,
    fontWeight: 600,
    border: '1px solid #E3617B',
    cursor: 'pointer',
    textAlign: 'center',
    lineHeight: 1.2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  actionPrimary: {
    flex: 1,
    padding: '12px 0',
    borderRadius: 24,
    background: '#FFFFFF',
    color: '#E3617B',
    fontSize: 13,
    fontWeight: 600,
    border: '1px solid #E3617B',
    cursor: 'pointer',
    textAlign: 'center',
    lineHeight: 1.2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },

  // Back Home
  backHomeArea: {
    width: '100%',
    maxWidth: 360,
    marginTop: 12,
  },
  backHomeBtn: {
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
