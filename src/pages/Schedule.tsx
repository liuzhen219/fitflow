import { useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { Popup, Toast } from 'antd-mobile'
import ClassCard from '../components/ClassCard'
import EmptyState from '../components/EmptyState'
import { scheduleItems, venues, courses } from '../data/mock'
import { LocationIcon, BuildingIcon, MapPinIcon, ClockIcon, StarFilledIcon, CalendarIcon } from '../components/Icons'

const DAY_HEADERS = ['日', '一', '二', '三', '四', '五', '六']
const YEAR = 2026; const MONTH = 5

export default function Schedule() {
  const nav = useNavigate()
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming')
  const [addrItem, setAddrItem] = useState<typeof scheduleItems[0] | null>(null)
  const [checkinItem, setCheckinItem] = useState<typeof scheduleItems[0] | null>(null)
  const [isPaying, setIsPaying] = useState(false)
  const [cancelItem, setCancelItem] = useState<typeof scheduleItems[0] | null>(null)

  const upcomingItems = useMemo(() => scheduleItems.filter(s => s.status !== 'completed'), [])
  const completedItems = useMemo(() => scheduleItems.filter(s => s.status === 'completed'), [])
  const activeItems = tab === 'upcoming' ? upcomingItems : completedItems

  // Next upcoming class
  const nextClass = upcomingItems.find(s => s.status === 'upcoming' || s.status === 'confirmed')

  const highlightedDays = useMemo(() => {
    const days = new Set<number>()
    upcomingItems.forEach(s => {
      const d = new Date(s.date)
      if (d.getFullYear() === YEAR && d.getMonth() + 1 === MONTH) days.add(d.getDate())
    })
    return days
  }, [upcomingItems])

  const calendarData = useMemo(() => {
    const firstDay = new Date(YEAR, MONTH - 1, 1).getDay()
    const daysInMonth = new Date(YEAR, MONTH, 0).getDate()
    const totalRows = Math.ceil((firstDay + daysInMonth) / 7)
    const grid: (number | null)[][] = []
    let day = 1
    for (let row = 0; row < totalRows; row++) {
      const week: (number | null)[] = []
      for (let col = 0; col < 7; col++) {
        if ((row === 0 && col < firstDay) || day > daysInMonth) week.push(null)
        else week.push(day++)
      }
      grid.push(week)
    }
    return grid
  }, [])

  const today = new Date().getDate()

  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7' }}>
      {/* ====== Header ====== */}
      <div style={{
        background: 'linear-gradient(135deg, var(--c-accent), var(--c-accent-deep))',
        padding: '44px 20px 32px', color: '#fff',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 500, marginBottom: 4 }}>MY SCHEDULE</div>
            <h1 style={{ fontSize: 26, fontWeight: 700, margin: 0, lineHeight: 1.15 }}>我的行程</h1>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 500, marginBottom: 4 }}>即将开始</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>
              {nextClass ? `${nextClass.date.slice(5)} ${nextClass.time.split(' - ')[0]}` : '暂无'}
            </div>
            {nextClass && (
              <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2, maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {nextClass.courseName}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ====== Calendar Card ====== */}
      <div style={{
        margin: '-16px 14px 0', background: '#fff', borderRadius: 18,
        padding: '16px 14px 14px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        position: 'relative', zIndex: 2,
      }}>
        {/* Month */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#222' }}>{YEAR}年{MONTH}月</span>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--c-accent)', background: 'rgba(227,97,123,0.08)', padding: '4px 10px', borderRadius: 10 }}>
            {upcomingItems.length} 节待上
          </span>
        </div>

        {/* Day headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 6 }}>
          {DAY_HEADERS.map((h, i) => (
            <div key={i} style={{
              textAlign: 'center', fontSize: 11, fontWeight: 600, color: i === 0 || i === 6 ? '#ccc' : '#929292',
              padding: '4px 0',
            }}>{h}</div>
          ))}
        </div>

        {/* Calendar grid */}
        {calendarData.map((week, wi) => (
          <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 2 }}>
            {week.map((d, di) => {
              const hasClass = d !== null && highlightedDays.has(d)
              const isToday = d === today
              return (
                <div key={di} style={{
                  textAlign: 'center', padding: '4px 0', position: 'relative',
                  minHeight: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {d !== null && (
                    <span style={{
                      width: 30, height: 30, borderRadius: '50%', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: isToday ? 700 : hasClass ? 600 : 400,
                      background: isToday ? 'var(--c-accent)' : hasClass ? 'rgba(227,97,123,0.08)' : 'transparent',
                      color: isToday ? '#fff' : hasClass ? 'var(--c-accent)' : '#444',
                      transition: 'all 0.15s',
                    }}>{d}</span>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* ====== Tab Toggle ====== */}
      <div style={{
        display: 'flex', margin: '20px 14px 0', background: '#fff',
        borderRadius: 14, padding: 4, boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
      }}>
        {(['upcoming', 'completed'] as const).map((t) => (
          <div key={t} onClick={() => setTab(t)} style={{
            flex: 1, textAlign: 'center', padding: '10px 0', borderRadius: 11,
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: tab === t ? 'var(--c-accent)' : 'transparent',
            color: tab === t ? '#fff' : '#6a6a6a',
          }}>
            {t === 'upcoming' ? `待上课 (${upcomingItems.length})` : `已完结 (${completedItems.length})`}
          </div>
        ))}
      </div>

      {/* ====== Class List ====== */}
      <div style={{ padding: '14px 14px 40px' }}>
        {activeItems.length > 0 ? activeItems.map(item => (
          <ClassCard
            key={item.id}
            courseName={item.courseName}
            coachName={item.coachName}
            venueName={item.venueName}
            isHomeService={item.isHomeService}
            date={item.date}
            time={item.time}
            status={item.status as 'pending' | 'upcoming' | 'confirmed' | 'completed'}
            cancelDeadline={courses.find(c => c.title === item.courseName)?.cancelDeadline}
            onCheckIn={item.status === 'completed' ? () => nav(`/review/coach/${item.coachId}`) : () => setCheckinItem(item)}
            onViewDetail={() => setAddrItem(item)}
            onCancel={item.status !== 'completed' ? () => setCancelItem(item) : undefined}
          />
        )) : tab === 'upcoming' ? (
          <EmptyState text="暂无课程安排" actionText="去约课" onAction={() => nav('/home')} />
        ) : (
          <EmptyState text="暂无已完结课程" />
        )}
      </div>

      {/* ====== Popups (unchanged) ====== */}
      <Popup visible={!!addrItem} onClose={() => setAddrItem(null)} onMaskClick={() => setAddrItem(null)}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#fff' }}>
        {addrItem && (() => {
          const v = venues.find(x => x.name === addrItem.venueName)
          return (
            <div style={{ padding: '20px 16px 30px' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 4 }}>{addrItem.venueName || '上课地点'}</div>
              <div style={{ fontSize: 13, color: '#6a6a6a', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 4 }}>
                <ClockIcon size={13} color="#6a6a6a" /> {addrItem.date} · {addrItem.time}
              </div>
              {v ? (<>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '14px', background: '#fafafa', borderRadius: 12, border: '1px solid #eee', marginBottom: 14 }}>
                  <MapPinIcon size={18} color="var(--c-accent)" />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#222' }}>{v.address}</div>
                    <div style={{ fontSize: 12, color: '#6a6a6a', marginTop: 4 }}>{v.district} · 距你 {v.distance}</div>
                    <div style={{ fontSize: 12, color: '#6a6a6a' }}>营业时间：{v.openHours}</div>
                  </div>
                </div>
                <div onClick={() => { setAddrItem(null); nav(`/venue/${v.id}`) }} style={{ textAlign: 'center', padding: '12px', borderRadius: 12, background: 'var(--c-accent)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                  <BuildingIcon size={14} color="#fff" /> 进入场馆主页
                </div>
              </>) : (
                <div style={{ padding: '30px 0', textAlign: 'center', color: '#6a6a6a', fontSize: 14 }}>
                  <MapPinIcon size={32} color="#ddd" />
                  <p style={{ marginTop: 8 }}>{addrItem.isHomeService ? '上门服务，无需前往场馆' : '暂无场馆详细信息'}</p>
                </div>
              )}
            </div>
          )
        })()}
      </Popup>

      <Popup visible={!!cancelItem} onClose={() => setCancelItem(null)} onMaskClick={() => setCancelItem(null)}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#fff' }}>
        {cancelItem && (() => {
          const course = courses.find(c => c.title === cancelItem.courseName)
          return (
            <div style={{ padding: '24px 16px 30px', textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 4 }}>确认取消课程？</div>
              <div style={{ fontSize: 14, color: '#6a6a6a', marginBottom: 20 }}>{cancelItem.courseName}</div>
              <div style={{
                padding: '12px 14px', borderRadius: 12,
                background: cancelItem.status === 'pending' ? '#fefce8' : '#f0fdf4',
                border: cancelItem.status === 'pending' ? '1px solid #fef08a' : '1px solid #dcfce7',
                marginBottom: 16, textAlign: 'left', fontSize: 12,
                color: cancelItem.status === 'pending' ? '#a16207' : '#16A34A',
              }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{cancelItem.status === 'pending' ? '取消规则' : '✓ 取消规则'}</div>
                {cancelItem.status === 'pending' ? (<><div>· 未付款的订单可直接取消</div><div>· 取消后订单将被移除</div></>)
                  : (<>{course?.cancelDeadline && <div>· {course.cancelDeadline}前可免费取消，全额退款</div>}<div>· 超过截止时间取消，不退款</div><div>· 退款将在1-3个工作日原路返回</div></>)}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div onClick={() => setCancelItem(null)} style={{ flex: 1, padding: '14px', borderRadius: 12, textAlign: 'center', background: '#f7f7f7', color: '#6a6a6a', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>再想想</div>
                <div onClick={() => { setCancelItem(null); Toast.show({ icon: 'success', content: cancelItem.status === 'pending' ? '订单已取消' : '课程已取消，退款将原路返回' }) }} style={{ flex: 1, padding: '14px', borderRadius: 12, textAlign: 'center', background: '#c13515', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>确认取消</div>
              </div>
            </div>
          )
        })()}
      </Popup>

      <Popup visible={!!checkinItem} onClose={() => { if (!isPaying) setCheckinItem(null) }} onMaskClick={() => { if (!isPaying) setCheckinItem(null) }}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#fff' }}>
        {checkinItem && (isPaying ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px', border: '3px solid #f0f0f0', borderTopColor: 'var(--c-accent)', animation: 'spin 0.8s linear infinite' }} />
            <div style={{ fontSize: 16, fontWeight: 600, color: '#222', marginBottom: 4 }}>支付处理中...</div>
            <div style={{ fontSize: 13, color: '#6a6a6a' }}>请稍候</div>
            <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
          </div>
        ) : checkinItem.status === 'pending' ? (
          <div style={{ padding: '24px 16px 30px', textAlign: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#D97706', background: '#FFFBEB', display: 'inline-block', padding: '4px 12px', borderRadius: 12, marginBottom: 8 }}>待付款</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 2 }}>完成支付后签到</div>
            <div style={{ fontSize: 13, color: '#6a6a6a' }}>该课程尚未付款，请先完成支付</div>
            <div style={{ padding: '12px 14px', borderRadius: 12, background: '#fafafa', border: '1px solid #eee', margin: '16px 0' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 6 }}>{checkinItem.courseName}</div>
              <div style={{ fontSize: 12, color: '#6a6a6a' }}>{checkinItem.coachName} · {checkinItem.venueName}</div>
              <div style={{ fontSize: 12, color: '#6a6a6a' }}>{checkinItem.date} · {checkinItem.time}</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--c-accent)', marginBottom: 16 }}>¥420</div>
            <div onClick={() => { setIsPaying(true); setTimeout(() => { setIsPaying(false); Toast.show({ icon: 'success', content: '支付成功！' }); setCheckinItem({ ...checkinItem, status: 'upcoming' }) }, 1500) }} style={{ padding: '14px', borderRadius: 12, background: 'var(--c-accent)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>立即支付 ¥420</div>
          </div>
        ) : (
          <div style={{ padding: '28px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 2 }}>签到核销</div>
            <div style={{ fontSize: 13, color: '#6a6a6a', marginBottom: 16 }}>{checkinItem.courseName}</div>
            <div style={{ width: 160, height: 160, margin: '0 auto 16px', borderRadius: 16, background: '#f7f7f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>📱</div>
            <div style={{ fontSize: 12, color: '#6a6a6a', marginBottom: 16 }}>出示此码给场馆工作人员扫码签到</div>
            <div style={{ padding: '10px 14px', borderRadius: 12, background: '#fafafa', border: '1px solid #eee', fontSize: 12, color: '#6a6a6a', textAlign: 'left', marginBottom: 16 }}>
              <div>📍 {checkinItem.venueName}</div><div>📅 {checkinItem.date} · {checkinItem.time}</div><div>👤 {checkinItem.coachName}</div>
            </div>
            <div onClick={() => { setCheckinItem(null); Toast.show({ icon: 'success', content: '签到成功！' }) }} style={{ padding: '14px', borderRadius: 12, background: 'var(--c-accent)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>确认签到</div>
          </div>
        ))}
      </Popup>
    </div>
  )
}
