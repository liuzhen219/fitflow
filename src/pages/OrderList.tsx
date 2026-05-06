import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import EmptyState from '../components/EmptyState'
import { useAppState } from '../store/AppContext'
import { CalendarIcon, ClockIcon, OrdersIcon, FireIcon } from '../components/Icons'

const statusFilters = ['全部', '待付款', '待上课', '已完成', '退款']

const statusMap: Record<string, string[]> = {
  '全部': [],
  '待付款': ['pending'],
  '待上课': ['upcoming', 'confirmed'],
  '已完成': ['completed'],
  '退款': ['cancelled'],
}

const statusDisplay: Record<string, { label: string; color: string }> = {
  pending: { label: '待付款', color: '#D97706' },
  upcoming: { label: '待上课', color: 'var(--c-accent)' },
  confirmed: { label: '待上课', color: 'var(--c-accent)' },
  completed: { label: '已完成', color: '#7BC67E' },
  cancelled: { label: '已退款', color: '#6a6a6a' },
}

function getInitialFilter(): string {
  const hash = window.location.hash
  const match = hash.match(/[?&]status=([^&]+)/)
  if (match) {
    const s = decodeURIComponent(match[1])
    if (statusFilters.includes(s)) return s
  }
  return '全部'
}

export default function OrderList() {
  const { scheduleItems } = useAppState()
  const nav = useNavigate()
  const [activeFilter, setActiveFilter] = useState(getInitialFilter)

  const allowedStatuses = statusMap[activeFilter] || []
  const filteredItems = allowedStatuses.length === 0
    ? scheduleItems
    : scheduleItems.filter((item) => allowedStatuses.includes(item.status))

  // Map scheduleItem status to display for filter matching
  const filterItems = statusFilters.map((f) => {
    const mapped = statusMap[f]
    if (!mapped || mapped.length === 0) {
      return { label: f, count: scheduleItems.length }
    }
    return {
      label: f,
      count: scheduleItems.filter((item) => mapped.includes(item.status)).length,
    }
  })

  return (
    <div style={s.page}>
      {/* NavBar */}
      <div style={s.navBar}>
        <div style={s.navBack} onClick={() => nav(-1)}>‹</div>
        <div style={s.navTitle}>我的订单</div>
        <div style={s.navPlaceholder} />
      </div>

      {/* Status Filter Chips */}
      <div style={s.filterRow}>
        {filterItems.map((f) => {
          const active = f.label === activeFilter
          return (
            <span
              key={f.label}
              style={{
                ...s.filterChip,
                ...(active ? s.filterChipActive : {}),
              }}
              onClick={() => setActiveFilter(f.label)}
            >
              {active && <FireIcon size={14} color="#fff" />}{f.label}
            </span>
          )
        })}
      </div>

      {/* Order Cards or EmptyState */}
      <div style={s.listArea}>
        {filteredItems.length === 0 ? (
          <EmptyState
            icon={<OrdersIcon size={48} color="#c0c0c0" />}
            text="暂无订单记录"
            actionText="去约课"
            onAction={() => nav('/home')}
          />
        ) : (
          filteredItems.map((item) => {
            const status = statusDisplay[item.status]
            return (
              <div key={item.id} style={s.orderCard}>
                <div style={s.cardHeader}>
                  <h3 style={s.courseName}>{item.courseName}</h3>
                  <span style={{ ...s.statusBadge, color: status.color }}>
                    {status.label}
                  </span>
                </div>
                <div style={s.cardMeta}>
                  <span>{item.coachName}</span>
                  <span style={s.metaDot}>·</span>
                  <span>{item.isHomeService ? '上门服务' : item.venueName}</span>
                </div>
                <div style={s.cardDate}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarIcon size={12} color="#6a6a6a" />
                    {' '}{item.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <ClockIcon size={12} color="#6a6a6a" />
                    {' '}{item.time}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#fff',
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

  // Filter Row
  filterRow: {
    display: 'flex',
    gap: 8,
    padding: '8px 16px 12px',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
  },
  filterChip: {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '6px 14px',
    borderRadius: 16,
    fontSize: 12,
    fontWeight: 500,
    background: '#FFFFFF',
    color: '#6a6a6a',
    border: '1px solid #ddd',
    cursor: 'pointer',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    lineHeight: 1.2,
  },
  filterChipActive: {
    background: 'var(--c-accent)',
    color: '#FFFFFF',
    border: '1px solid #E3617B',
  },

  // List Area
  listArea: {
    padding: '0 12px 40px',
  },

  // Order Card
  orderCard: {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 6,
  },
  courseName: {
    fontSize: 14,
    fontWeight: 700,
    color: '#222',
    margin: 0,
    lineHeight: 1.3,
    flex: 1,
  },
  statusBadge: {
    fontSize: 11,
    fontWeight: 600,
    flexShrink: 0,
  },
  cardMeta: {
    fontSize: 11,
    color: '#6a6a6a',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  metaDot: {
    color: '#ddd',
  },
  cardDate: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    fontSize: 11,
    color: '#6a6a6a',
  },
}
