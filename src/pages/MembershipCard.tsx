import { useNavigate } from 'react-router-dom'
import { WalletIcon, ClockIcon, CheckIcon } from '../components/Icons'

const cards = [
  {
    id: 1, type: '年卡', name: 'FitFlow 年度畅练卡',
    total: 120, used: 38, unit: '次',
    issueDate: '2026-01-15', expiryDate: '2027-01-14',
    color: 'linear-gradient(135deg, #E3617B, #D44A65)',
    status: 'active',
  },
  {
    id: 2, type: '季卡', name: 'FitFlow 季度体验卡',
    total: 30, used: 12, unit: '次',
    issueDate: '2026-04-01', expiryDate: '2026-06-30',
    color: 'linear-gradient(135deg, #2C8A9E, #1A6B7C)',
    status: 'active',
  },
  {
    id: 3, type: '次卡', name: 'FitFlow 十次体验卡',
    total: 10, used: 10, unit: '次',
    issueDate: '2025-10-20', expiryDate: '2026-04-20',
    color: 'linear-gradient(135deg, #6a6a6a, #444)',
    status: 'expired',
  },
]

export default function MembershipCard() {
  const nav = useNavigate()

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
        <span style={{ fontSize: 17, fontWeight: 600, color: '#222' }}>会员卡</span>
      </div>

      {/* Cards */}
      <div style={{ padding: '12px' }}>
        {cards.map((card) => {
          const remaining = card.total - card.used
          const pct = Math.round((card.used / card.total) * 100)
          const isExpired = card.status === 'expired'

          return (
            <div key={card.id} style={{
              borderRadius: 16, overflow: 'hidden', marginBottom: 14,
              background: card.color, color: '#fff', opacity: isExpired ? 0.6 : 1,
            }}>
              {/* Card body */}
              <div style={{ padding: '20px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 6,
                      background: 'rgba(255,255,255,0.25)', letterSpacing: 1,
                    }}>{card.type}</span>
                    <h2 style={{ fontSize: 18, fontWeight: 700, margin: '10px 0 6px', lineHeight: 1.18 }}>
                      {card.name}
                    </h2>
                  </div>
                  {isExpired && (
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 10,
                      background: 'rgba(255,255,255,0.3)',
                    }}>已过期</span>
                  )}
                </div>

                {/* Stats row */}
                <div style={{ display: 'flex', gap: 24, marginTop: 14 }}>
                  <div>
                    <div style={{ fontSize: 10, opacity: 0.7, marginBottom: 2 }}>可用次数</div>
                    <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>
                      {isExpired ? 0 : remaining}
                      <span style={{ fontSize: 13, fontWeight: 500, opacity: 0.8 }}> / {card.total}{card.unit}</span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div style={{ marginTop: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 10, opacity: 0.7 }}>
                    <span>已用 {card.used}{card.unit}</span>
                    <span>共 {card.total}{card.unit}</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.25)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 2, background: '#fff',
                      width: `${pct}%`, transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>
              </div>

              {/* Footer info */}
              <div style={{
                padding: '12px 18px', background: 'rgba(0,0,0,0.15)',
                display: 'flex', justifyContent: 'space-between',
                fontSize: 11, opacity: 0.85,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <ClockIcon size={11} color="rgba(255,255,255,0.8)" />
                  开卡：{card.issueDate}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <CheckIcon size={11} color="rgba(255,255,255,0.8)" />
                  有效期至 {card.expiryDate}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Buy card CTA */}
      <div style={{ padding: '0 12px' }}>
        <div style={{
          padding: '16px', borderRadius: 14, background: '#fff', border: '1px solid #ddd',
          textAlign: 'center', cursor: 'pointer',
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 4 }}>需要更多课时？</div>
          <div style={{ fontSize: 12, color: '#6a6a6a' }}>查看全部会员方案，找到适合你的卡种 →</div>
        </div>
      </div>
    </div>
  )
}
