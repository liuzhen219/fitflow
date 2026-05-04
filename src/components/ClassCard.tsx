import React from 'react'

interface ClassCardProps {
  courseName: string
  coachName: string
  venueName: string
  isHomeService: boolean
  date: string
  time: string
  status: 'upcoming' | 'confirmed' | 'completed'
  onCheckIn?: () => void
  onViewDetail?: () => void
}

const statusConfig: Record<string, { color: string; label: string; bg: string }> = {
  upcoming: { color: '#E8B4A2', label: '待上课', bg: '#FFF5F0' },
  confirmed: { color: '#C4A882', label: '待确认', bg: '#FFF5F0' },
  completed: { color: '#7BC67E', label: '已完成', bg: '#F5FFF5' },
}

const borderColorMap: Record<string, string> = {
  upcoming: '#E8B4A2',
  confirmed: '#C4A882',
  completed: '#7BC67E',
}

const s: Record<string, React.CSSProperties> = {
  card: {
    display: 'flex',
    position: 'relative',
    background: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  leftBorder: {
    width: 4,
    flexShrink: 0,
    borderRadius: '4px 0 0 4px',
  },
  body: {
    flex: 1,
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  courseName: {
    fontSize: 13,
    fontWeight: 700,
    color: '#4A3B3C',
    margin: 0,
    lineHeight: 1.3,
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    marginRight: 8,
  },
  statusBadge: {
    fontSize: 10,
    padding: '2px 8px',
    borderRadius: 10,
    lineHeight: 1.4,
    fontWeight: 500,
    flexShrink: 0,
  },
  coachVenue: {
    fontSize: 11,
    color: '#8B7E74',
    margin: 0,
    lineHeight: 1.3,
  },
  dateTime: {
    fontSize: 11,
    color: '#8B7E74',
    margin: 0,
    lineHeight: 1.3,
  },
  actions: {
    display: 'flex',
    gap: 8,
    marginTop: 4,
  },
  actionBtn: {
    flex: 1,
    padding: '6px 0',
    borderRadius: 16,
    fontSize: 11,
    fontWeight: 500,
    textAlign: 'center',
    cursor: 'pointer',
    border: 'none',
    lineHeight: 1.2,
  },
  primaryBtn: {
    background: '#E8B4A2',
    color: '#FFFFFF',
  },
  outlineBtn: {
    background: '#FFFFFF',
    color: '#E8B4A2',
    border: '1px solid #E8B4A2',
  },
}

const ClassCard: React.FC<ClassCardProps> = ({
  courseName,
  coachName,
  venueName,
  isHomeService,
  date,
  time,
  status,
  onCheckIn,
  onViewDetail,
}) => {
  const sc = statusConfig[status] || statusConfig.upcoming
  const borderColor = borderColorMap[status] || '#E8B4A2'

  return (
    <div style={s.card}>
      <div style={{ ...s.leftBorder, background: borderColor }} />
      <div style={s.body}>
        <div style={s.headerRow}>
          <p style={s.courseName}>{courseName}</p>
          <span style={{ ...s.statusBadge, background: sc.bg, color: sc.color }}>
            {sc.label}
          </span>
        </div>
        <p style={s.coachVenue}>{coachName} · {venueName}</p>
        <p style={s.dateTime}>{date} · {time}</p>
        <div style={s.actions}>
          {isHomeService ? (
            <>
              <button style={{ ...s.actionBtn, ...s.outlineBtn }} onClick={onViewDetail}>
                修改地址
              </button>
              <button style={{ ...s.actionBtn, ...s.primaryBtn }} onClick={onCheckIn}>
                联系教练
              </button>
            </>
          ) : (
            <>
              <button style={{ ...s.actionBtn, ...s.outlineBtn }} onClick={onViewDetail}>
                查看地址
              </button>
              <button
                style={{
                  ...s.actionBtn,
                  ...s.primaryBtn,
                  ...(status === 'completed' ? { opacity: 0.5 } : {}),
                }}
                onClick={onCheckIn}
                disabled={status === 'completed'}
              >
                签到核销
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClassCard
