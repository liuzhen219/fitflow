import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Popup, Toast } from 'antd-mobile'
import { useAppState } from '../store/AppContext'
import { WalletIcon, RefreshIcon } from '../components/Icons'

const RECHARGE_OPTIONS = [100, 200, 500, 1000]

export default function Wallet() {
  const nav = useNavigate()
  const { balance, paymentRecords, recharge } = useAppState()
  const [showRecharge, setShowRecharge] = useState(false)

  const handleRecharge = (amount: number) => {
    recharge(amount)
    setShowRecharge(false)
    Toast.show({ icon: 'success', content: `充值成功 ¥${amount}` })
  }

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
        <span style={{ fontSize: 17, fontWeight: 600, color: '#222' }}>我的钱包</span>
      </div>

      {/* Balance Card */}
      <div style={{
        margin: '12px', padding: '24px 20px', borderRadius: 16,
        background: 'linear-gradient(135deg, var(--c-accent), var(--c-accent-deep))',
        color: '#fff',
      }}>
        <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
          <WalletIcon size={14} color="rgba(255,255,255,0.8)" /> 平台余额
        </div>
        <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1, marginBottom: 16 }}>
          <span className="num">¥{balance.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div onClick={() => setShowRecharge(true)} style={{
            flex: 1, padding: '10px 0', borderRadius: 10, textAlign: 'center',
            background: 'rgba(255,255,255,0.2)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}>充值</div>
          <div onClick={() => Toast.show({ content: '提现功能开发中' })} style={{
            flex: 1, padding: '10px 0', borderRadius: 10, textAlign: 'center',
            background: 'rgba(255,255,255,0.2)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}>提现</div>
        </div>
      </div>

      {/* Transactions */}
      <div style={{ padding: '0 12px' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
          <RefreshIcon size={14} color="#6a6a6a" /> 交易记录
        </div>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #ddd', overflow: 'hidden' }}>
          {paymentRecords.length > 0 ? paymentRecords.map((t, i) => (
            <div key={t.id} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 16px',
              borderBottom: i < paymentRecords.length - 1 ? '1px solid #f0f0f0' : 'none',
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#222' }}>{t.label}</div>
                <div style={{ fontSize: 11, color: '#929292', marginTop: 2 }}>{t.time}</div>
              </div>
              <span style={{
                fontSize: 15, fontWeight: 600,
                color: t.amount >= 0 ? '#16A34A' : '#222',
              }}>
                {t.amount >= 0 ? `+¥${t.amount}` : `-¥${Math.abs(t.amount)}`}
              </span>
            </div>
          )) : (
            <div style={{ textAlign: 'center', padding: 32, color: '#929292', fontSize: 14 }}>
              暂无交易记录
            </div>
          )}
        </div>
      </div>

      {/* Recharge Popup */}
      <Popup
        visible={showRecharge}
        onClose={() => setShowRecharge(false)}
        onMaskClick={() => setShowRecharge(false)}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#fff' }}
      >
        <div style={{ padding: '20px 16px 30px' }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 16, textAlign: 'center' }}>
            选择充值金额
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {RECHARGE_OPTIONS.map(amount => (
              <div key={amount}
                onClick={() => handleRecharge(amount)}
                style={{
                  padding: '18px', borderRadius: 14, textAlign: 'center',
                  background: '#fafafa', border: '1px solid #eee', cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--c-accent)' }}>
                  <span className="num">¥{amount}</span>
                </div>
                <div style={{ fontSize: 12, color: '#6a6a6a', marginTop: 4 }}>
                  充值{amount}元
                </div>
              </div>
            ))}
          </div>
        </div>
      </Popup>
    </div>
  )
}
