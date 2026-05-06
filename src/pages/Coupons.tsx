import { useNavigate } from 'react-router-dom'
import { TicketIcon, ClockIcon } from '../components/Icons'
import { useAppState } from '../store/AppContext'

export default function Coupons() {
  const nav = useNavigate()
  const { coupons } = useAppState()
  const activeCoupons = coupons.filter(c => c.status === 'active')
  const expiredCoupons = coupons.filter(c => c.status === 'expired')

  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', padding: '14px 16px', background: '#fff',
        borderBottom: '1px solid #eee', gap: 8,
      }}>
        <div onClick={() => nav(-1)} style={{
          width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: '#fff', cursor: 'pointer', fontWeight: 400, lineHeight: '34px', flexShrink: 0,
        }}>‹</div>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#222' }}>优惠券</span>
        <span style={{ fontSize: 12, color: '#6a6a6a', marginLeft: 4 }}>
          {activeCoupons.length} 张可用
        </span>
      </div>

      {/* Available */}
      <div style={{ padding: '12px 12px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#6a6a6a', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
          <TicketIcon size={14} color="var(--c-accent)" /> 可用优惠券 ({activeCoupons.length})
        </div>
        {activeCoupons.map(c => (
          <div key={c.id} style={{
            display: 'flex', borderRadius: 14, overflow: 'hidden', marginBottom: 10,
            background: `linear-gradient(135deg, ${c.color}, ${c.color}dd)`,
            color: '#fff',
          }}>
            {/* Left — value */}
            <div style={{
              width: 100, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', padding: '18px 12px',
              borderRight: '1.5px dashed rgba(255,255,255,0.3)', flexShrink: 0,
            }}>
              <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1, marginBottom: 4 }}>¥{c.value}</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>{c.desc}</div>
            </div>
            {/* Right — info */}
            <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{c.name}</div>
              {c.minOrder > 0 && (
                <div style={{ fontSize: 11, opacity: 0.8 }}>订单满 ¥{c.minOrder} 可用</div>
              )}
              <div style={{ fontSize: 11, opacity: 0.7, marginTop: 6, display: 'flex', alignItems: 'center', gap: 3 }}>
                <ClockIcon size={11} color="rgba(255,255,255,0.7)" />
                有效期至 {c.expireDate}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expired */}
      {expiredCoupons.length > 0 && (
        <div style={{ padding: '16px 12px 0' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#929292', marginBottom: 10 }}>
            已过期 ({expiredCoupons.length})
          </div>
          {expiredCoupons.map(c => (
            <div key={c.id} style={{
              display: 'flex', borderRadius: 14, overflow: 'hidden', marginBottom: 10,
              background: '#e0e0e0', color: '#929292', opacity: 0.7,
            }}>
              <div style={{
                width: 100, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', padding: '18px 12px',
                borderRight: '1.5px dashed rgba(255,255,255,0.3)', flexShrink: 0,
              }}>
                <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1, marginBottom: 4 }}>¥{c.value}</div>
                <div style={{ fontSize: 11 }}>{c.desc}</div>
              </div>
              <div style={{ flex: 1, padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4, color: '#888' }}>{c.name}</div>
                <div style={{ fontSize: 11, marginTop: 6 }}>已过期 · {c.expireDate}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No coupons state */}
      {coupons.length === 0 && (
        <div style={{ textAlign: 'center', padding: 60, color: '#929292', fontSize: 14 }}>
          暂无优惠券
        </div>
      )}
    </div>
  )
}
