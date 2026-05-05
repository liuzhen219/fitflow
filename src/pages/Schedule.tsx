import { useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import ClassCard from '../components/ClassCard'
import EmptyState from '../components/EmptyState'
import { scheduleItems } from '../data/mock'

const DAY_HEADERS = ['日', '一', '二', '三', '四', '五', '六']
const HIGHLIGHTED_DAYS = [9, 21]
const YEAR = 2026
const MONTH = 5

export default function Schedule() {
  const nav = useNavigate()
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming')

  const upcomingItems = useMemo(
    () => scheduleItems.filter((s) => s.status !== 'completed'),
    [],
  )
  const completedItems = useMemo(
    () => scheduleItems.filter((s) => s.status === 'completed'),
    [],
  )

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
                  (HIGHLIGHTED_DAYS.includes(d) ? (
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
          <span style={s.legendText}>有课 · 2节待上</span>
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
              onCheckIn={item.status === 'completed' ? () => nav(`/review/coach/${item.coachId}`) : () => {}}
              onViewDetail={() => nav(`/course/${item.id}`)}
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
    background: '#E3617B',
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
    background: '#E3617B',
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
    color: '#E3617B',
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
