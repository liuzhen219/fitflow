import { useNavigate, useParams } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { Popup, Toast } from 'antd-mobile'
import StarRating from '../components/StarRating'
import PriceBreakdown from '../components/PriceBreakdown'
import { courses, venues } from '../data/mock'
import { useAppState, type Address } from '../store/AppContext'
import {
  SearchIcon, HomeServiceIcon, LocationIcon, ClockIcon, CheckIcon, MapPinIcon,
} from '../components/Icons'

// Generate next N days from today
function getNextDays(count: number) {
  const days: { date: Date; label: string; weekday: string; key: string }[] = []
  const weekNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  for (let i = 0; i < count; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    days.push({
      date: d,
      label: i === 0 ? '今天' : i === 1 ? '明天' : `${d.getMonth() + 1}/${d.getDate()}`,
      weekday: weekNames[d.getDay()],
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
    })
  }
  return days
}

// Generate time slots grouped by period
const timeGroups = [
  { label: '上午', icon: '🌅', slots: ['07:00', '08:00', '09:00', '10:00', '11:00'] },
  { label: '下午', icon: '☀️', slots: ['13:00', '14:00', '15:00', '16:00', '17:00'] },
  { label: '晚上', icon: '🌙', slots: ['18:00', '19:00', '20:00'] },
]

export default function BookingConfirm() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const course = courses.find((c) => c.id === Number(id))

  const { addBooking, addresses, coupons, useCoupon, balance, payWithBalance } = useAppState()
  const days = useMemo(() => getNextDays(14), [])

  const paymentMethods = [
    { key: 'wechat', label: '微信支付', icon: '💚', tag: '推荐' },
    { key: 'alipay', label: '支付宝', icon: '💙' },
    { key: 'balance', label: '平台余额', icon: '💰', extra: `余额 ¥${balance}` },
    { key: 'card', label: '银行卡', icon: '💳' },
  ]
  const defaultAddr = addresses.find(a => a.isDefault) || addresses[0]
  const [selectedAddr, setSelectedAddr] = useState<Address | null>(defaultAddr || null)
  const [showAddrPicker, setShowAddrPicker] = useState(false)

  const [selectedDay, setSelectedDay] = useState(1)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showPaySheet, setShowPaySheet] = useState(false)
  const [payMethod, setPayMethod] = useState('wechat')
  const [selectedCoupon, setSelectedCoupon] = useState<number | null>(null)
  const [isPaying, setIsPaying] = useState(false)

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

  const availableCoupons = coupons.filter(c => c.status === 'active' && c.minOrder <= course.price)
  const activeCoupon = selectedCoupon ? coupons.find(c => c.id === selectedCoupon) : null
  const discount = activeCoupon ? Math.min(activeCoupon.value, course.price) : 0
  const finalPrice = course.price - discount

  // Randomly unavailable slots for realism
  const unavailableSlots = new Set(['07:00'])

  return (
    <div style={s.page}>
      {/* NavBar */}
      <div style={s.navBar}>
        <div style={s.navBack} onClick={() => nav(-1)}>‹</div>
        <div style={s.navTitle}>确认预约</div>
        <div style={s.navPlaceholder} />
      </div>

      {/* Order Summary */}
      <div style={s.card}>
        <h2 style={s.courseTitle}>{course.title}</h2>
        <div style={{ height: 8 }} />
        <div style={s.coachRow}>
          <span style={s.coachName}>{course.coachName}</span>
          <StarRating value={course.coachRating} size={11} />
          <span style={s.coachRatingNum}>{course.coachRating.toFixed(1)}</span>
        </div>
        <div style={{ height: 4 }} />
        <div style={s.venueRow}>
          {course.isHomeService
            ? <><HomeServiceIcon size={14} color="#6a6a6a" /><span style={s.venueName}>上门服务</span></>
            : <><LocationIcon size={14} color="#6a6a6a" /><span style={s.venueName}>{course.venueName}</span></>
          }
        </div>
        {!course.isHomeService && venue && (
          <div style={s.address}>{venue.address}</div>
        )}
        {/* Home-service address picker */}
        {course.isHomeService && selectedAddr && (
          <div
            onClick={() => setShowAddrPicker(true)}
            style={{
              marginTop: 12, padding: '12px', borderRadius: 12,
              background: '#fafafa', border: '1px solid #eee',
              display: 'flex', alignItems: 'center', gap: 8,
              cursor: 'pointer', userSelect: 'none',
            }}
          >
            <span style={{
              padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 600,
              background: 'var(--c-accent-soft)', color: 'var(--c-accent)', flexShrink: 0,
            }}>{selectedAddr.tag}</span>
            <span style={{ flex: 1, fontSize: 13, color: '#222', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {selectedAddr.full}
            </span>
            <span style={{ fontSize: 14, color: '#929292', flexShrink: 0 }}>›</span>
          </div>
        )}
      </div>

      {/* ====== Date Picker ====== */}
      <div style={s.section}>
        <div style={s.sectionTitle}>
          <ClockIcon size={14} color="#222" /> 选择日期
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
          {days.map((d, i) => {
            const isSelected = i === selectedDay
            const isPast = i === 0 && new Date().getHours() > 20
            return (
              <div key={d.key}
                onClick={() => !isPast && setSelectedDay(i)}
                style={{
                  minWidth: 64, padding: '10px 12px', borderRadius: 14,
                  textAlign: 'center', cursor: isPast ? 'default' : 'pointer',
                  flexShrink: 0, userSelect: 'none',
                  background: isSelected ? 'var(--c-accent)' : '#f7f7f7',
                  color: isSelected ? '#fff' : isPast ? '#ccc' : '#222',
                  border: isSelected ? '1.5px solid #E3617B' : '1px solid #eee',
                  opacity: isPast ? 0.5 : 1,
                }}>
                <div style={{ fontSize: 11, fontWeight: 500, marginBottom: 2 }}>
                  {d.label}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>
                  {d.weekday}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ====== Time Slot Picker ====== */}
      <div style={s.section}>
        <div style={s.sectionTitle}>
          <ClockIcon size={14} color="#222" /> 选择时段
          {selectedTime && (
            <span style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 600, color: 'var(--c-accent)' }}>
              {days[selectedDay].label} {days[selectedDay].weekday} {selectedTime}
            </span>
          )}
        </div>

        {timeGroups.map((group) => (
          <div key={group.label} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6a6a6a', marginBottom: 8 }}>
              {group.icon} {group.label}
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {group.slots.map((slot) => {
                const isUnavailable = unavailableSlots.has(slot)
                const isActive = selectedTime === slot
                return (
                  <div key={slot}
                    onClick={() => !isUnavailable && setSelectedTime(slot)}
                    style={{
                      padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 500,
                      cursor: isUnavailable ? 'default' : 'pointer',
                      whiteSpace: 'nowrap', userSelect: 'none',
                      background: isActive ? 'var(--c-accent)' : isUnavailable ? '#f7f7f7' : '#fff',
                      color: isActive ? '#fff' : isUnavailable ? '#ccc' : '#222',
                      border: isActive ? '1.5px solid #E3617B'
                        : isUnavailable ? '1px solid #f0f0f0' : '1px solid #ddd',
                      textDecoration: isUnavailable ? 'line-through' : 'none',
                    }}>
                    {slot}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ====== Price ====== */}
      <div style={s.section}>
        <div style={s.priceCard}>
          <PriceBreakdown courseFee={courseFee} venueFee={venueFee} total={course.price} />
        </div>
      </div>

      {/* ====== Pay Button ====== */}
      <div style={s.payArea}>
        <div style={{ textAlign: 'center', marginBottom: 8, fontSize: 12, color: '#6a6a6a' }}>
          {selectedTime
            ? `${days[selectedDay].label}${days[selectedDay].weekday} ${selectedTime} · ${course.duration}分钟`
            : '请选择日期和时段'}
        </div>
        <button
          style={{ ...s.payBtn, opacity: selectedTime ? 1 : 0.4 }}
          onClick={() => selectedTime && setShowPaySheet(true)}
          disabled={!selectedTime}
        >
          确认支付 ¥{finalPrice}
        </button>

        {/* ====== Payment Sheet ====== */}
        <Popup
          visible={showPaySheet}
          onClose={() => { if (!isPaying) setShowPaySheet(false) }}
          onMaskClick={() => { if (!isPaying) setShowPaySheet(false) }}
          bodyStyle={{
            borderTopLeftRadius: 20, borderTopRightRadius: 20,
            background: '#fff', minHeight: '55vh',
          }}
        >
          {isPaying ? (
            /* Processing */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '55vh', gap: 16 }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                border: '3px solid #f0f0f0', borderTopColor: 'var(--c-accent)',
                animation: 'spin 0.8s linear infinite',
              }} />
              <p style={{ fontSize: 16, fontWeight: 600, color: '#222', margin: 0 }}>支付处理中...</p>
              <p style={{ fontSize: 13, color: '#6a6a6a', margin: 0 }}>请稍候，正在确认你的预约</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
            <>
              {/* Sheet Header */}
              <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid #f0f0f0', textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 2 }}>确认支付</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--c-accent)' }}>
                  <span className="num">¥{finalPrice}</span>
                </div>
                {discount > 0 && (
                  <div style={{ fontSize: 12, color: '#929292' }}>
                    已优惠 ¥{discount}，原价 ¥{course.price}
                  </div>
                )}
              </div>

              {/* Order Brief */}
              <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#222', marginBottom: 4 }}>{course.title}</div>
                <div style={{ fontSize: 12, color: '#6a6a6a' }}>
                  {course.coachName} · {selectedTime && `${days[selectedDay].label}${days[selectedDay].weekday} ${selectedTime}`} · {course.duration}分钟
                </div>
              </div>

              {/* Coupon Picker */}
              {availableCoupons.length > 0 && (
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#6a6a6a', marginBottom: 8 }}>优惠券</div>
                  <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
                    <div
                      onClick={() => setSelectedCoupon(null)}
                      style={{
                        padding: '8px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                        flexShrink: 0, cursor: 'pointer',
                        background: !selectedCoupon ? 'var(--c-accent)' : '#f7f7f7',
                        color: !selectedCoupon ? '#fff' : '#6a6a6a',
                        border: !selectedCoupon ? '1.5px solid #E3617B' : '1px solid #eee',
                      }}
                    >不使用</div>
                    {availableCoupons.map(c => (
                      <div
                        key={c.id}
                        onClick={() => setSelectedCoupon(c.id === selectedCoupon ? null : c.id)}
                        style={{
                          padding: '8px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500,
                          flexShrink: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
                          background: selectedCoupon === c.id ? 'var(--c-accent-soft)' : '#f7f7f7',
                          color: selectedCoupon === c.id ? 'var(--c-accent)' : '#6a6a6a',
                          border: selectedCoupon === c.id ? '1.5px solid #E3617B' : '1px solid #eee',
                        }}
                      >
                        -¥{c.value}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Methods */}
              <div style={{ padding: '12px 16px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#6a6a6a', marginBottom: 10 }}>选择支付方式</div>
                {paymentMethods.map((m) => (
                  <div key={m.key}
                    onClick={() => setPayMethod(m.key)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '14px 12px', borderRadius: 12, marginBottom: 6, cursor: 'pointer',
                      background: payMethod === m.key ? 'var(--c-accent-bg)' : '#fafafa',
                      border: payMethod === m.key ? '1.5px solid #E3617B' : '1px solid #eee',
                    }}>
                    <span style={{ fontSize: 22 }}>{m.icon}</span>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#222' }}>{m.label}</span>
                    {m.tag && <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--c-accent)', background: 'var(--c-accent-soft)', padding: '2px 8px', borderRadius: 8 }}>{m.tag}</span>}
                    {m.extra && <span style={{ fontSize: 11, color: '#929292' }}>{m.extra}</span>}
                    {payMethod === m.key && <CheckIcon size={16} color="var(--c-accent)" />}
                  </div>
                ))}
              </div>

              {/* Pay Button */}
              <div style={{ padding: '12px 16px 20px' }}>
                <div
                  onClick={() => {
                    if (payMethod === 'balance') {
                      const ok = payWithBalance(finalPrice, course.title)
                      if (!ok) {
                        Toast.show({ icon: 'fail', content: '余额不足，请选择其他支付方式' })
                        return
                      }
                      setShowPaySheet(false)
                      const dateKey = days[selectedDay].key
                      const booking = addBooking({ course, date: dateKey, timeSlot: selectedTime! })
                      if (selectedCoupon) useCoupon(selectedCoupon)
                      Toast.show({ icon: 'success', content: `支付成功 ¥${finalPrice}` })
                      nav(`/payment-success/${booking.id}/${course.id}`)
                      return
                    }
                    setIsPaying(true)
                    setTimeout(() => {
                      setShowPaySheet(false)
                      setIsPaying(false)
                      const dateKey = days[selectedDay].key
                      const booking = addBooking({ course, date: dateKey, timeSlot: selectedTime! })
                      if (selectedCoupon) useCoupon(selectedCoupon)
                      Toast.show({ icon: 'success', content: `支付成功 ¥${finalPrice}` })
                      nav(`/payment-success/${booking.id}/${course.id}`)
                    }, 1500)
                  }}
                  style={{
                    width: '100%', padding: '15px 0', borderRadius: 12,
                    background: 'var(--c-accent)', color: '#fff', textAlign: 'center',
                    fontSize: 16, fontWeight: 600, cursor: 'pointer',
                  }}>
                  立即支付 ¥{finalPrice}
                </div>
              </div>
            </>
          )}
        </Popup>

        {/* Address Picker Popup */}
        <Popup
          visible={showAddrPicker}
          onClose={() => setShowAddrPicker(false)}
          onMaskClick={() => setShowAddrPicker(false)}
          bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#fff', maxHeight: '60vh', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid #f0f0f0', flexShrink: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#222', textAlign: 'center' }}>选择上门地址</div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
            {addresses.map(addr => (
              <div key={addr.id}
                onClick={() => { setSelectedAddr(addr); setShowAddrPicker(false) }}
                style={{
                  padding: '14px', borderRadius: 12, marginBottom: 8, cursor: 'pointer',
                  background: selectedAddr?.id === addr.id ? 'var(--c-accent-soft)' : '#fafafa',
                  border: selectedAddr?.id === addr.id ? '1.5px solid var(--c-accent)' : '1px solid #eee',
                  display: 'flex', alignItems: 'center', gap: 10,
                }}
              >
                <span style={{
                  padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, flexShrink: 0,
                  background: addr.tag === '家' ? 'rgba(227,97,123,0.1)' : addr.tag === '公司' ? 'rgba(44,138,158,0.1)' : 'rgba(22,163,74,0.1)',
                  color: addr.tag === '家' ? 'var(--c-accent)' : addr.tag === '公司' ? '#2C8A9E' : '#16A34A',
                }}>{addr.tag}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#222' }}>{addr.name} <span style={{ fontSize: 12, fontWeight: 400, color: '#6a6a6a' }}>{addr.phone}</span></div>
                  <div style={{ fontSize: 12, color: '#6a6a6a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2 }}>
                    <MapPinIcon size={11} color="#929292" /> {addr.full}
                  </div>
                </div>
                {selectedAddr?.id === addr.id && <CheckIcon size={18} color="var(--c-accent)" />}
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 16px 20px', borderTop: '1px solid #f0f0f0', flexShrink: 0 }}>
            <div onClick={() => { nav('/addresses'); setShowAddrPicker(false) }} style={{
              textAlign: 'center', padding: '12px', borderRadius: 12, background: '#f7f7f7',
              color: 'var(--c-accent)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}>
              + 管理地址
            </div>
          </div>
        </Popup>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#fff', paddingBottom: 20 },
  notFound: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 12, padding: 20 },
  notFoundText: { fontSize: 16, color: '#222', fontWeight: 500, margin: 0 },
  backBtn: { marginTop: 8, padding: '10px 28px', borderRadius: 24, background: 'var(--c-accent)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' },

  navBar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', paddingTop: 16 },
  navBack: { width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: '#fff', cursor: 'pointer', fontWeight: 400, lineHeight: '34px', flexShrink: 0 },
  navTitle: { fontSize: 16, fontWeight: 600, color: '#222' },
  navPlaceholder: { width: 32 },

  card: { margin: '0 12px', padding: 16, background: '#fff', borderRadius: 16, border: '1px solid #ddd' },
  courseTitle: { fontSize: 15, fontWeight: 700, color: '#222', margin: 0, lineHeight: 1.3 },
  coachRow: { display: 'flex', alignItems: 'center', gap: 6 },
  coachName: { fontSize: 13, color: '#222' },
  coachRatingNum: { fontSize: 11, color: '#6a6a6a' },
  venueRow: { display: 'flex', alignItems: 'center', gap: 4 },
  venueName: { fontSize: 12, color: '#6a6a6a' },
  address: { fontSize: 11, color: '#6a6a6a', marginTop: 2, lineHeight: 1.3 },

  section: { margin: '16px 12px 0' },
  sectionTitle: { fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4 },

  priceCard: { background: '#fff', borderRadius: 16, padding: 14, border: '1px solid #ddd' },
  payArea: { margin: '20px 12px 0' },
  payBtn: { width: '100%', padding: '14px 0', borderRadius: 24, background: 'var(--c-accent)', color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer', textAlign: 'center', lineHeight: 1.2 },
}
