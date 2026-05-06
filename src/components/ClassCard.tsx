import React from 'react'

interface ClassCardProps {
  courseName: string
  coachName: string
  venueName: string
  isHomeService: boolean
  date: string
  time: string
  cancelDeadline?: string
  status: 'pending' | 'upcoming' | 'confirmed' | 'completed'
  onCheckIn?: () => void
  onViewDetail?: () => void
  onCancel?: () => void
}

const statusConfig: Record<string, { color: string; label: string; bg: string }> = {
  pending: { color: '#D97706', label: '待付款', bg: '#FFFBEB' },
  upcoming: { color: 'var(--c-accent)', label: '待上课', bg: '#fff' },
  confirmed: { color: 'var(--c-accent)', label: '待确认', bg: '#fff' },
  completed: { color: '#7BC67E', label: '已完成', bg: '#F5FFF5' },
}

const borderColorMap: Record<string, string> = {
  pending: '#D97706',
  upcoming: 'var(--c-accent)',
  confirmed: 'var(--c-accent)',
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
    color: '#222',
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
    color: '#6a6a6a',
    margin: 0,
    lineHeight: 1.3,
  },
  dateTime: {
    fontSize: 11,
    color: '#6a6a6a',
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
    background: 'var(--c-accent)',
    color: '#FFFFFF',
  },
  dangerBtn: {
    background: '#fff',
    color: '#c13515',
    border: '1px solid rgba(193,53,21,0.3)',
  },
  outlineBtn: {
    background: '#FFFFFF',
    color: 'var(--c-accent)',
    border: '1px solid #E3617B',
  },
}

const ClassCard: React.FC<ClassCardProps> = ({
  courseName, coachName, venueName, isHomeService,
  date, time, cancelDeadline, status, onCheckIn, onViewDetail, onCancel,
}) => {
  const sc = statusConfig[status] || statusConfig.upcoming
  const borderColor = borderColorMap[status] || 'var(--c-accent)'

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

        {/* Cancellation policy */}
        {cancelDeadline && (status === 'upcoming' || status === 'confirmed') && (
          <p style={{ fontSize: 11, color: '#16A34A', margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#16A34A', flexShrink: 0 }} />
            可免费取消 · {cancelDeadline}截止
          </p>
        )}

        <div style={s.actions}>
          {status === 'completed' ? (
            <>
              <button style={{ ...s.actionBtn, ...s.outlineBtn }} onClick={onViewDetail}>查看详情</button>
              <button style={{ ...s.actionBtn, ...s.primaryBtn }} onClick={onCheckIn}>去评价</button>
            </>
          ) : status === 'pending' ? (
            <>
              <button style={{ ...s.actionBtn, ...s.outlineBtn }} onClick={onViewDetail}>查看地址</button>
              {onCancel && (
                <button style={{ ...s.actionBtn, ...s.dangerBtn }} onClick={onCancel}>取消订单</button>
              )}
              <button style={{ ...s.actionBtn, ...s.primaryBtn }} onClick={onCheckIn}>去付款</button>
            </>
          ) : isHomeService ? (
            <>
              <button style={{ ...s.actionBtn, ...s.outlineBtn }} onClick={onViewDetail}>修改地址</button>
              <button style={{ ...s.actionBtn, ...s.primaryBtn }} onClick={onCheckIn}>联系教练</button>
              {onCancel && (
                <button style={{ ...s.actionBtn, ...s.dangerBtn }} onClick={onCancel}>取消课程</button>
              )}
            </>
          ) : (
            <>
              <button style={{ ...s.actionBtn, ...s.outlineBtn }} onClick={onViewDetail}>查看地址</button>
              {onCancel && (
                <button style={{ ...s.actionBtn, ...s.dangerBtn }} onClick={onCancel}>取消课程</button>
              )}
              <button style={{ ...s.actionBtn, ...s.primaryBtn }} onClick={onCheckIn}>签到核销</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ClassCard
