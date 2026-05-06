import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Popup, Toast } from 'antd-mobile'
import { useAppState } from '../store/AppContext'
import { WalletIcon, ClockIcon, CheckIcon } from '../components/Icons'

const plans = [
  { id: 'plan-10', name: '十次体验卡', total: 10, price: 880, desc: '适合初次体验普拉提', tag: '入门' },
  { id: 'plan-30', name: '季度畅练卡', total: 30, price: 2280, desc: '每周2-3次，稳步提升', tag: '人气' },
  { id: 'plan-120', name: '年度畅练卡', total: 120, price: 6880, desc: '全年无限可能，每节仅¥57', tag: '最值' },
]

export default function MembershipCard() {
  const nav = useNavigate()
  const { membershipCards, purchaseMembership } = useAppState()
  const [showBuy, setShowBuy] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isPaying, setIsPaying] = useState(false)

  const handleBuy = () => {
    if (!selectedPlan) return
    setIsPaying(true)
    setTimeout(() => {
      setIsPaying(false)
      setShowBuy(false)
      purchaseMembership(selectedPlan)
      const plan = plans.find(p => p.id === selectedPlan)
      Toast.show({ icon: 'success', content: `购买成功！${plan?.name}` })
    }, 1500)
  }

  const activeCards = membershipCards.filter(c => c.status === 'active')

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
        <span style={{ fontSize: 12, color: '#6a6a6a', marginLeft: 4 }}>
          {activeCards.length} 张可用
        </span>
      </div>

      {/* Cards */}
      <div style={{ padding: '12px' }}>
        {membershipCards.map((card) => {
          const remaining = card.total - card.used
          const pct = Math.round((card.used / card.total) * 100)
          const isExpired = card.status === 'expired'

          return (
            <div key={card.id} style={{
              borderRadius: 16, overflow: 'hidden', marginBottom: 14,
              background: card.color, color: '#fff', opacity: isExpired ? 0.6 : 1,
            }}>
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

                <div style={{ display: 'flex', gap: 24, marginTop: 14 }}>
                  <div>
                    <div style={{ fontSize: 10, opacity: 0.7, marginBottom: 2 }}>可用次数</div>
                    <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>
                      {isExpired ? 0 : remaining}
                      <span style={{ fontSize: 13, fontWeight: 500, opacity: 0.8 }}> / {card.total}{card.unit}</span>
                    </div>
                  </div>
                </div>

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

              <div style={{
                padding: '12px 18px', background: 'rgba(0,0,0,0.15)',
                display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: 0.85,
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

      {/* Buy CTA */}
      <div style={{ padding: '0 12px' }}>
        <div onClick={() => setShowBuy(true)} style={{
          padding: '16px', borderRadius: 14, background: '#fff', border: '1px solid #ddd',
          textAlign: 'center', cursor: 'pointer',
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 4 }}>需要更多课时？</div>
          <div style={{ fontSize: 12, color: '#6a6a6a' }}>查看全部会员方案，找到适合你的卡种 →</div>
        </div>
      </div>

      {/* Buy Popup */}
      <Popup
        visible={showBuy}
        onClose={() => { if (!isPaying) setShowBuy(false) }}
        onMaskClick={() => { if (!isPaying) setShowBuy(false) }}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#fff' }}
      >
        {isPaying ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px',
              border: '3px solid #f0f0f0', borderTopColor: 'var(--c-accent)',
              animation: 'spin 0.8s linear infinite',
            }} />
            <div style={{ fontSize: 16, fontWeight: 600, color: '#222', marginBottom: 4 }}>支付处理中...</div>
            <div style={{ fontSize: 13, color: '#6a6a6a' }}>请稍候，正在开通会员卡</div>
            <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
          </div>
        ) : (
          <div style={{ padding: '20px 16px 30px' }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#222', textAlign: 'center', marginBottom: 16 }}>
              选择会员方案
            </div>

            {plans.map(plan => (
              <div key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                style={{
                  padding: '16px', borderRadius: 14, marginBottom: 10, cursor: 'pointer',
                  background: selectedPlan === plan.id ? 'var(--c-accent-soft)' : '#fafafa',
                  border: selectedPlan === plan.id ? '1.5px solid var(--c-accent)' : '1px solid #eee',
                  display: 'flex', alignItems: 'center', gap: 14,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 16, fontWeight: 600, color: '#222' }}>{plan.name}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 6,
                      background: plan.tag === '最值' ? 'var(--c-accent)' : plan.tag === '人气' ? '#219EA5' : '#6a6a6a',
                      color: '#fff',
                    }}>{plan.tag}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#6a6a6a' }}>{plan.desc} · 共 {plan.total} 次</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--c-accent)' }}>
                    <span className="num">¥{plan.price}</span>
                  </div>
                </div>
              </div>
            ))}

            <div
              onClick={handleBuy}
              style={{
                marginTop: 16, width: '100%', padding: '14px', borderRadius: 12,
                background: selectedPlan ? 'var(--c-accent)' : '#ddd',
                color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 600,
                cursor: selectedPlan ? 'pointer' : 'default',
              }}
            >
              {selectedPlan ? `确认购买 ¥${plans.find(p => p.id === selectedPlan)?.price}` : '请选择方案'}
            </div>
          </div>
        )}
      </Popup>
    </div>
  )
}
