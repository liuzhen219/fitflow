import { useNavigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { Popup, Toast } from 'antd-mobile'
import ClassCard from '../components/ClassCard'
import EmptyState from '../components/EmptyState'
import { venues, courses } from '../data/mock'
import { useAppState } from '../store/AppContext'
import {
  LocationIcon, BuildingIcon, MapPinIcon, ClockIcon,
  CalendarIcon, CloseIcon, StarFilledIcon,
} from '../components/Icons'

const DAY_HEADERS = ['日', '一', '二', '三', '四', '五', '六']

export default function Schedule() {
  const nav = useNavigate()
  const { scheduleItems, cancelBooking, checkInBooking } = useAppState()
  const [tab, setTab] = useState<'upcoming' | 'completed'>('upcoming')
  const [addrItem, setAddrItem] = useState<typeof scheduleItems[0] | null>(null)
  const [checkinItem, setCheckinItem] = useState<typeof scheduleItems[0] | null>(null)
  const [isPaying, setIsPaying] = useState(false)
  const [cancelItem, setCancelItem] = useState<typeof scheduleItems[0] | null>(null)

  const upcomingItems = useMemo(() => scheduleItems.filter(s => s.status !== 'completed' && s.status !== 'cancelled'), [scheduleItems])
  const completedItems = useMemo(() => scheduleItems.filter(s => s.status === 'completed'), [scheduleItems])
  const activeItems = tab === 'upcoming' ? upcomingItems : completedItems

  const nextClass = upcomingItems.find(s => s.status === 'upcoming' || s.status === 'confirmed')

  // Dynamic calendar
  const now = new Date()
  const YEAR = now.getFullYear()
  const MONTH = now.getMonth() + 1
  const today = now.getDate()

  const highlightedDays = useMemo(() => {
    const days = new Set<number>()
    upcomingItems.forEach(s => {
      const d = new Date(s.date)
      if (d.getFullYear() === YEAR && d.getMonth() + 1 === MONTH) days.add(d.getDate())
    })
    return days
  }, [upcomingItems, YEAR, MONTH])

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
  }, [YEAR, MONTH])

  // Get price for checkin popup
  const checkinPrice = useMemo(() => {
    if (!checkinItem) return 0
    const c = courses.find(c => c.title === checkinItem.courseName)
    return c?.price || 0
  }, [checkinItem])

  return (
    <div className="page-enter" style={{ minHeight: '100vh', background: '#f7f7f7', paddingBottom: 60 }}>
      {/* Header — matching Profile style */}
      <div style={{
        background: 'linear-gradient(135deg, var(--c-accent), var(--c-accent-deep))',
        padding: '30px 16px 28px', color: '#fff',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, lineHeight: 1.18 }}>我的行程</h1>
            <div style={{ fontSize: 13, opacity: 0.75, marginTop: 4, fontWeight: 500 }}>
              {upcomingItems.length} 节待上 · {completedItems.length} 节已完成
            </div>
          </div>
          {nextClass && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 500, marginBottom: 2 }}>最近一节</div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>
                {nextClass.date.slice(5)} {nextClass.time.split(' - ')[0]}
              </div>
              <div style={{ fontSize: 11, opacity: 0.7, marginTop: 2, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {nextClass.courseName}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Calendar Card */}
      <div style={{
        margin: '-14px 12px 0', background: '#fff', borderRadius: 16,
        padding: '16px 12px 12px',
        boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#222' }}>
            <CalendarIcon size={14} color="var(--c-accent)" /> {YEAR}年{MONTH}月
          </span>
          <span style={{
            fontSize: 11, fontWeight: 600, color: 'var(--c-accent)',
            background: 'var(--c-accent-soft)', padding: '3px 10px', borderRadius: 10,
          }}>
            {upcomingItems.length} 节待上
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: 4 }}>
          {DAY_HEADERS.map((h, i) => (
            <div key={i} style={{
              textAlign: 'center', fontSize: 11, fontWeight: 600,
              color: i === 0 || i === 6 ? '#c0c0c0' : '#929292', padding: '4px 0',
            }}>{h}</div>
          ))}
        </div>

        {calendarData.map((week, wi) => (
          <div key={wi} style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {week.map((d, di) => {
              const hasClass = d !== null && highlightedDays.has(d)
              const isToday = d === today
              return (
                <div key={di} style={{
                  textAlign: 'center', padding: '3px 0', position: 'relative',
                  minHeight: 30, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {d !== null && (
                    <span style={{
                      width: 28, height: 28, borderRadius: '50%', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: isToday ? 700 : hasClass ? 600 : 400,
                      background: isToday ? 'var(--c-accent)' : hasClass ? 'var(--c-accent-soft)' : 'transparent',
                      color: isToday ? '#fff' : hasClass ? 'var(--c-accent)' : '#444',
                    }}>{d}</span>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Tab Toggle */}
      <div style={{
        display: 'flex', margin: '16px 12px 0', background: '#fff',
        borderRadius: 12, padding: 3,
        border: '1px solid #eee',
      }}>
        {(['upcoming', 'completed'] as const).map((t) => (
          <div key={t} onClick={() => setTab(t)} style={{
            flex: 1, textAlign: 'center', padding: '9px 0', borderRadius: 10,
            fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
            background: tab === t ? 'var(--c-accent)' : 'transparent',
            color: tab === t ? '#fff' : '#6a6a6a',
          }}>
            {t === 'upcoming' ? `待上课 (${upcomingItems.length})` : `已完结 (${completedItems.length})`}
          </div>
        ))}
      </div>

      {/* Class List */}
      <div style={{ padding: '12px 12px 0' }}>
        {activeItems.length > 0 ? activeItems.map(item => (
          <div key={item.id} style={{ marginBottom: 10 }}>
            <ClassCard
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
          </div>
        )) : tab === 'upcoming' ? (
          <EmptyState text="暂无课程安排" actionText="去约课" onAction={() => nav('/home')} />
        ) : (
          <EmptyState text="暂无已完结课程" />
        )}
      </div>

      {/* ====== Popups ====== */}
      {/* Address Popup */}
      <Popup visible={!!addrItem} onClose={() => setAddrItem(null)} onMaskClick={() => setAddrItem(null)}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#fff' }}>
        {addrItem && (() => {
          const v = venues.find(x => x.name === addrItem.venueName)
          return (
            <div style={{ padding: '20px 16px 30px' }}>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 4 }}>
                {addrItem.venueName || '上课地点'}
              </div>
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
                <div onClick={() => { setAddrItem(null); nav(`/venue/${v.id}`) }} style={{
                  textAlign: 'center', padding: '12px', borderRadius: 12,
                  background: 'var(--c-accent)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}>
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

      {/* Cancel Popup */}
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
                <div style={{ fontWeight: 600, marginBottom: 4 }}>
                  {cancelItem.status === 'pending' ? '取消规则' : '取消规则'}
                </div>
                {cancelItem.status === 'pending'
                  ? (<><div>· 未付款的订单可直接取消</div><div>· 取消后订单将被移除</div></>)
                  : (<>{course?.cancelDeadline && <div>· {course.cancelDeadline}前可免费取消，全额退款</div>}<div>· 超过截止时间取消，不退款</div><div>· 退款将在1-3个工作日原路返回</div></>)}
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div onClick={() => setCancelItem(null)} style={{
                  flex: 1, padding: '14px', borderRadius: 12, textAlign: 'center',
                  background: '#f7f7f7', color: '#6a6a6a', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}>再想想</div>
                <div onClick={() => { cancelBooking(cancelItem.id); setCancelItem(null); Toast.show({ icon: 'success', content: '课程已取消' }) }} style={{
                  flex: 1, padding: '14px', borderRadius: 12, textAlign: 'center',
                  background: '#c13515', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                }}>确认取消</div>
              </div>
            </div>
          )
        })()}
      </Popup>

      {/* Checkin Popup */}
      <Popup visible={!!checkinItem} onClose={() => { if (!isPaying) setCheckinItem(null) }} onMaskClick={() => { if (!isPaying) setCheckinItem(null) }}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#fff' }}>
        {checkinItem && (isPaying ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px',
              border: '3px solid #f0f0f0', borderTopColor: 'var(--c-accent)',
              animation: 'spin 0.8s linear infinite',
            }} />
            <div style={{ fontSize: 16, fontWeight: 600, color: '#222', marginBottom: 4 }}>支付处理中...</div>
            <div style={{ fontSize: 13, color: '#6a6a6a' }}>请稍候</div>
            <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
          </div>
        ) : checkinItem.status === 'pending' ? (
          <div style={{ padding: '24px 16px 30px', textAlign: 'center' }}>
            <div style={{
              fontSize: 11, fontWeight: 600, color: '#D97706', background: '#FFFBEB',
              display: 'inline-block', padding: '4px 12px', borderRadius: 12, marginBottom: 8,
            }}>待付款</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 2 }}>完成支付后签到</div>
            <div style={{ fontSize: 13, color: '#6a6a6a' }}>该课程尚未付款，请先完成支付</div>
            <div style={{
              padding: '12px 14px', borderRadius: 12, background: '#fafafa',
              border: '1px solid #eee', margin: '16px 0',
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 6 }}>{checkinItem.courseName}</div>
              <div style={{ fontSize: 12, color: '#6a6a6a' }}>{checkinItem.coachName} · {checkinItem.venueName}</div>
              <div style={{ fontSize: 12, color: '#6a6a6a' }}>{checkinItem.date} · {checkinItem.time}</div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--c-accent)', marginBottom: 16 }}>
              <span className="num">¥{checkinPrice}</span>
            </div>
            <div onClick={() => {
              setIsPaying(true)
              setTimeout(() => {
                setIsPaying(false)
                checkInBooking(checkinItem.id)
                setCheckinItem(prev => prev ? { ...prev, status: 'upcoming' as const } : null)
                Toast.show({ icon: 'success', content: '支付成功！' })
              }, 1500)
            }} style={{
              padding: '14px', borderRadius: 12, background: 'var(--c-accent)', color: '#fff',
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
            }}>立即支付 ¥{checkinPrice}</div>
          </div>
        ) : (
          <div style={{ padding: '28px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 2 }}>签到核销</div>
            <div style={{ fontSize: 13, color: '#6a6a6a', marginBottom: 16 }}>{checkinItem.courseName}</div>
            <div style={{
              width: 140, height: 140, margin: '0 auto 16px', borderRadius: 16,
              background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=https://fitflow.app/checkin/${checkinItem.id}`}
                alt="签到二维码"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                style={{ width: 140, height: 140 }}
              />
            </div>
            <div style={{ fontSize: 12, color: '#6a6a6a', marginBottom: 16 }}>
              出示此码给场馆工作人员扫码签到
            </div>
            <div style={{
              padding: '10px 14px', borderRadius: 12, background: '#fafafa',
              border: '1px solid #eee', fontSize: 12, color: '#6a6a6a', textAlign: 'left', marginBottom: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <LocationIcon size={12} color="#6a6a6a" /> {checkinItem.venueName}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <ClockIcon size={12} color="#6a6a6a" /> {checkinItem.date} · {checkinItem.time}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                <StarFilledIcon size={12} color="#6a6a6a" /> {checkinItem.coachName}
              </div>
            </div>
            <div onClick={() => {
              checkInBooking(checkinItem.id)
              setCheckinItem(null)
              Toast.show({ icon: 'success', content: '签到成功！' })
            }} style={{
              padding: '14px', borderRadius: 12, background: 'var(--c-accent)', color: '#fff',
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
            }}>确认签到</div>
          </div>
        ))}
      </Popup>
    </div>
  )
}
