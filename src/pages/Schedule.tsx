import { useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { Popup, Toast } from 'antd-mobile'
import ClassCard from '../components/ClassCard'
import EmptyState from '../components/EmptyState'
import { scheduleItems, venues } from '../data/mock'
import { LocationIcon, BuildingIcon, MapPinIcon, ClockIcon } from '../components/Icons'

const DAY_HEADERS = ['日', '一', '二', '三', '四', '五', '六']
const YEAR = 2026
const MONTH = 5

export default function Schedule() {
  const nav = useNavigate()
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming')
  const [addrItem, setAddrItem] = useState<typeof scheduleItems[0] | null>(null)
  const [checkinItem, setCheckinItem] = useState<typeof scheduleItems[0] | null>(null)
  const [isPaying, setIsPaying] = useState(false)

  const upcomingItems = useMemo(
    () => scheduleItems.filter((s) => s.status !== 'completed'),
    [],
  )
  const completedItems = useMemo(
    () => scheduleItems.filter((s) => s.status === 'completed'),
    [],
  )

  // Dynamically compute highlighted days from schedule data
  const highlightedDays = useMemo(() => {
    const days = new Set<number>()
    upcomingItems.forEach((s) => {
      const d = new Date(s.date)
      if (d.getFullYear() === YEAR && d.getMonth() + 1 === MONTH) {
        days.add(d.getDate())
      }
    })
    return days
  }, [upcomingItems])

  // Build calendar grid for May 2026
  const calendarData = useMemo(() => {
    const firstDayOfWeek = new Date(YEAR, MONTH - 1, 1).getDay() // Friday = 5
    const daysInMonth = new Date(YEAR, MONTH, 0).getDate() // 31
    const totalRows = Math.ceil((firstDayOfWeek + daysInMonth) / 7)

    const grid: (number | null)[][] = []
    let day = 1
    for (let row = 0; row < totalRows; row++) {
      const week: (number | null)[] = []
      for (let col = 0; col < 7; col++) {
        if (row === 0 && col < firstDayOfWeek) {
          week.push(null)
        } else if (day > daysInMonth) {
          week.push(null)
        } else {
          week.push(day++)
        }
      }
      grid.push(week)
    }
    return grid
  }, [])

  const activeItems = tab === 'upcoming' ? upcomingItems : completedItems

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>我的行程</div>

      {/* Mini Calendar */}
      <div style={s.calendarCard}>
        <div style={s.monthLabel}>{YEAR}年{MONTH}月</div>

        {/* Day-of-week headers */}
        <div style={s.dayHeaderRow}>
          {DAY_HEADERS.map((h, i) => (
            <div key={i} style={s.dayHeaderCell}>
              {h}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        {calendarData.map((week, wi) => (
          <div key={wi} style={s.calendarRow}>
            {week.map((d, di) => (
              <div key={di} style={s.calendarCell}>
                {d !== null &&
                  (highlightedDays.has(d) ? (
                    <span style={s.highlightedDay}>{d}</span>
                  ) : (
                    <span style={s.normalDay}>{d}</span>
                  ))}
              </div>
            ))}
          </div>
        ))}

        {/* Legend */}
        <div style={s.legend}>
          <div style={s.legendDot} />
          <span style={s.legendText}>有课 · {upcomingItems.length}节待上</span>
        </div>
      </div>

      {/* Tab Toggle */}
      <div style={s.tabRow}>
        <div
          style={{
            ...s.tab,
            ...(tab === 'upcoming' ? s.tabActive : {}),
          }}
          onClick={() => setTab('upcoming')}
        >
          待上课 ({upcomingItems.length})
        </div>
        <div
          style={{
            ...s.tab,
            ...(tab === 'completed' ? s.tabActive : {}),
          }}
          onClick={() => setTab('completed')}
        >
          已完结 ({completedItems.length})
        </div>
      </div>

      {/* Class List */}
      <div style={s.list}>
        {activeItems.length > 0 ? (
          activeItems.map((item) => (
            <ClassCard
              key={item.id}
              courseName={item.courseName}
              coachName={item.coachName}
              venueName={item.venueName}
              isHomeService={item.isHomeService}
              date={item.date}
              time={item.time}
              status={item.status as 'pending' | 'upcoming' | 'confirmed' | 'completed'}
              onCheckIn={item.status === 'completed' ? () => nav(`/review/coach/${item.coachId}`) : () => setCheckinItem(item)}
              onViewDetail={() => setAddrItem(item)}
            />
          ))
        ) : tab === 'upcoming' ? (
          <EmptyState
            text="暂无课程安排"
            actionText="去约课"
            onAction={() => nav('/home')}
          />
        ) : (
          <EmptyState
            text="暂无已完结课程"
          />
        )}
      </div>

      {/* ====== Address Popup ====== */}
      <Popup
        visible={!!addrItem}
        onClose={() => setAddrItem(null)}
        onMaskClick={() => setAddrItem(null)}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#fff' }}
      >
        {addrItem && (() => {
          const v = venues.find((x) => x.name === addrItem.venueName)
          return (
            <div style={{ padding: '20px 16px 30px' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 4 }}>
                {addrItem.venueName || '上课地点'}
              </div>
              <div style={{ fontSize: 13, color: '#6a6a6a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4 }}>
                <ClockIcon size={13} color="#6a6a6a" /> {addrItem.date} · {addrItem.time}
              </div>
              {v ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px', background: '#fafafa', borderRadius: 12, border: '1px solid #eee', marginBottom: 14 }}>
                    <MapPinIcon size={18} color="var(--c-accent)" />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: '#222' }}>{v.address}</div>
                      <div style={{ fontSize: 12, color: '#6a6a6a', marginTop: 4 }}>{v.district} · 距你 {v.distance}</div>
                      <div style={{ fontSize: 12, color: '#6a6a6a' }}>营业时间：{v.openHours}</div>
                    </div>
                  </div>
                  <div onClick={() => { setAddrItem(null); nav(`/venue/${v.id}`) }}
                    style={{ textAlign: 'center', padding: '12px', borderRadius: 12, background: 'var(--c-accent)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    <BuildingIcon size={14} color="#fff" /> 进入场馆主页
                  </div>
                </>
              ) : (
                <div style={{ padding: '30px 0', textAlign: 'center', color: '#6a6a6a', fontSize: 14 }}>
                  <MapPinIcon size={32} color="#ddd" />
                  <p style={{ marginTop: 8 }}>{addrItem.isHomeService ? '上门服务，无需前往场馆' : '暂无场馆详细信息'}</p>
                </div>
              )}
            </div>
          )
        })()}
      </Popup>

      {/* ====== Check-in / Payment Popup ====== */}
      <Popup
        visible={!!checkinItem}
        onClose={() => { if (!isPaying) setCheckinItem(null) }}
        onMaskClick={() => { if (!isPaying) setCheckinItem(null) }}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#fff' }}
      >
        {checkinItem && (
          isPaying ? (
            /* Processing */
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px',
                border: '3px solid #f0f0f0', borderTopColor: 'var(--c-accent)',
                animation: 'spin 0.8s linear infinite',
              }} />
              <div style={{ fontSize: 16, fontWeight: 600, color: '#222', marginBottom: 4 }}>支付处理中...</div>
              <div style={{ fontSize: 13, color: '#6a6a6a' }}>请稍候，正在确认付款</div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : checkinItem.status === 'pending' ? (
            /* Payment step */
            <div style={{ padding: '24px 16px 30px' }}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#D97706', background: '#FFFBEB', display: 'inline-block', padding: '4px 12px', borderRadius: 12, marginBottom: 8 }}>待付款</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 2 }}>完成支付后签到</div>
                <div style={{ fontSize: 13, color: '#6a6a6a' }}>该课程尚未付款，请先完成支付</div>
              </div>
              {/* Order info */}
              <div style={{ padding: '12px 14px', borderRadius: 12, background: '#fafafa', border: '1px solid #eee', marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 6 }}>{checkinItem.courseName}</div>
                <div style={{ fontSize: 12, color: '#6a6a6a' }}>{checkinItem.coachName} · {checkinItem.venueName}</div>
                <div style={{ fontSize: 12, color: '#6a6a6a' }}>{checkinItem.date} · {checkinItem.time}</div>
              </div>
              <div style={{ textAlign: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--c-accent)' }}>¥420</span>
              </div>
              <div
                onClick={() => {
                  setIsPaying(true)
                  setTimeout(() => {
                    setIsPaying(false)
                    Toast.show({ icon: 'success', content: '支付成功！' })
                    // Transition to check-in: update item status to upcoming
                    setCheckinItem({ ...checkinItem, status: 'upcoming' })
                  }, 1500)
                }}
                style={{ padding: '14px', borderRadius: 12, background: 'var(--c-accent)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', textAlign: 'center' }}>
                立即支付 ¥420
              </div>
            </div>
          ) : (
            /* Check-in step */
            <div style={{ padding: '28px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 2 }}>签到核销</div>
              <div style={{ fontSize: 13, color: '#6a6a6a', marginBottom: 16 }}>{checkinItem.courseName}</div>
              <div style={{
                width: 160, height: 160, margin: '0 auto 16px', borderRadius: 16,
                background: '#f7f7f7', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 64,
              }}>📱</div>
              <div style={{ fontSize: 12, color: '#6a6a6a', marginBottom: 16 }}>出示此码给场馆工作人员扫码签到</div>
              <div style={{
                padding: '10px 14px', borderRadius: 12, background: '#fafafa', border: '1px solid #eee',
                fontSize: 12, color: '#6a6a6a', textAlign: 'left', marginBottom: 16,
              }}>
                <div>📍 {checkinItem.venueName}</div>
                <div>📅 {checkinItem.date} · {checkinItem.time}</div>
                <div>👤 {checkinItem.coachName}</div>
              </div>
              <div onClick={() => { setCheckinItem(null); Toast.show({ icon: 'success', content: '签到成功！' }) }}
                style={{ padding: '14px', borderRadius: 12, background: 'var(--c-accent)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
                确认签到
              </div>
            </div>
          )
        )}
      </Popup>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#fff',
    paddingBottom: 80,
  },

  // Header
  header: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 700,
    color: '#222',
    padding: '16px 0 12px',
  },

  // Calendar Card
  calendarCard: {
    margin: '0 12px',
    padding: '14px 12px 10px',
    background: '#FFFFFF',
    borderRadius: 16,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  monthLabel: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 600,
    color: '#222',
    marginBottom: 10,
  },

  // Day headers
  dayHeaderRow: {
    display: 'flex',
    marginBottom: 4,
  },
  dayHeaderCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 11,
    color: '#6a6a6a',
    fontWeight: 500,
    padding: '4px 0',
  },

  // Calendar rows
  calendarRow: {
    display: 'flex',
  },
  calendarCell: {
    flex: 1,
    textAlign: 'center',
    padding: '6px 0',
  },
  normalDay: {
    fontSize: 12,
    color: '#222',
    lineHeight: 1,
  },
  highlightedDay: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: '50%',
    background: 'var(--c-accent)',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 600,
    lineHeight: 1,
  },

  // Legend
  legend: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 8,
    paddingTop: 8,
    borderTop: '1px solid #ddd',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'var(--c-accent)',
    flexShrink: 0,
  },
  legendText: {
    fontSize: 11,
    color: '#6a6a6a',
  },

  // Tab Toggle
  tabRow: {
    display: 'flex',
    margin: '16px 12px 0',
    borderBottom: '2px solid #ddd',
  },
  tab: {
    flex: 1,
    textAlign: 'center',
    padding: '10px 0',
    fontSize: 14,
    fontWeight: 500,
    color: '#6a6a6a',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    marginBottom: -2,
    lineHeight: 1.2,
    background: 'transparent',
  },
  tabActive: {
    color: 'var(--c-accent)',
    fontWeight: 600,
    borderBottom: '2px solid #E3617B',
    background: 'transparent',
  },

  // List
  list: {
    margin: '12px 12px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
}
