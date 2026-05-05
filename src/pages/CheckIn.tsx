import { useNavigate, useParams } from 'react-router-dom'
import { scheduleItems } from '../data/mock'
import {
  SearchIcon,
  ClockIcon,
  UserIcon,
  HomeServiceIcon,
  LocationIcon,
} from '../components/Icons'

export default function CheckIn() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const item = scheduleItems.find((s) => s.id === Number(id))

  if (!item) {
    return (
      <div style={s.page}>
        <div style={s.navBar}>
          <div style={s.navBack} onClick={() => nav(-1)}>‹</div>
          <div style={s.navTitle}>签到核销</div>
          <div style={s.navPlaceholder} />
        </div>
        <div style={s.notFound}>
          <SearchIcon size={48} color="#c0c0c0" />
          <p style={s.notFoundText}>课程未找到</p>
          <div style={s.backBtn} onClick={() => nav(-1)}>返回</div>
        </div>
      </div>
    )
  }

  return (
    <div style={s.page}>
      {/* NavBar */}
      <div style={s.navBar}>
        <div style={s.navBack} onClick={() => nav(-1)}>‹</div>
        <div style={s.navTitle}>签到核销</div>
        <div style={s.navPlaceholder} />
      </div>

      {/* Course Info */}
      <div style={s.infoCard}>
        <h2 style={s.courseName}>{item.courseName}</h2>
        <div style={s.infoRow}>
          <ClockIcon size={14} color="#6a6a6a" />
          <span style={s.infoText}>{item.date} {item.time}</span>
        </div>
        <div style={s.infoRow}>
          <UserIcon size={14} color="#6a6a6a" />
          <span style={s.infoText}>{item.coachName}</span>
        </div>
        <div style={s.infoRow}>
          {item.isHomeService ? (
            <HomeServiceIcon size={14} color="#6a6a6a" />
          ) : (
            <LocationIcon size={14} color="#6a6a6a" />
          )}
          <span style={s.infoText}>
            {item.isHomeService ? '上门服务' : item.venueName}
          </span>
        </div>
      </div>

      {/* QR Code */}
      <div style={s.qrContainer}>
        <div style={s.qrBox}>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://fitflow.app/checkin/12345"
            alt="签到二维码"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            style={{ width: 200, height: 200, borderRadius: 16 }}
          />
        </div>
      </div>

      {/* Hint Text */}
      <p style={s.hintText}>
        请将此二维码出示给场馆工作人员<br />扫码完成签到
      </p>
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
  },

  // NavBar
  navBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    paddingTop: 16,
    width: '100%',
  },
  navBack: {
    width: 34,
    height: 34,
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.35)',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 400,
    lineHeight: '34px',
    flexShrink: 0,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#222',
  },
  navPlaceholder: { width: 32 },

  // Not Found
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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

  // Course Info Card
  infoCard: {
    margin: '20px 12px 0',
    padding: 20,
    background: '#FFFFFF',
    borderRadius: 16,
    width: 'calc(100% - 24px)',
    maxWidth: 360,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  courseName: {
    fontSize: 16,
    fontWeight: 700,
    color: '#222',
    margin: '0 0 12px 0',
    lineHeight: 1.3,
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#6a6a6a',
  },

  // QR Code
  qrContainer: {
    marginTop: 32,
    display: 'flex',
    justifyContent: 'center',
  },
  qrBox: {
    width: 200,
    height: 200,
    background: '#FFFFFF',
    borderRadius: 16,
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Hint
  hintText: {
    marginTop: 24,
    fontSize: 13,
    color: '#6a6a6a',
    textAlign: 'center',
    lineHeight: 1.6,
  },
}
