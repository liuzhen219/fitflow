import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import { useAppState } from '../store/AppContext'
import { SparkleIcon, CopyIcon } from '../components/Icons'

const INVITE_CODE = 'FITFLOW-LI888'

const rewards = [
  { icon: '🎁', title: '邀请奖励', desc: '每成功邀请1位好友注册，双方各得', value: '50积分' },
  { icon: '📣', title: '分享奖励', desc: '每次分享优质内容被浏览，获得', value: '10积分' },
  { icon: '🏆', title: '里程碑奖励', desc: '累计邀请5位好友，额外获得', value: '200积分' },
]

export default function Invite() {
  const nav = useNavigate()
  const { points, earnPoints } = useAppState()
  const [showSimulate, setShowSimulate] = useState(false)

  const handleCopy = () => {
    navigator.clipboard?.writeText(INVITE_CODE)
    Toast.show({ icon: 'success', content: '邀请码已复制' })
  }

  const handleSimulateInvite = () => {
    earnPoints(50, '邀请好友注册')
    setShowSimulate(false)
    Toast.show({ icon: 'success', content: '模拟邀请成功！+50积分' })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', padding: '14px 16px',
        borderBottom: '1px solid #eee', gap: 8,
      }}>
        <div onClick={() => nav(-1)} style={{
          width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: '#fff', cursor: 'pointer', fontWeight: 400, lineHeight: '34px', flexShrink: 0,
        }}>‹</div>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#222' }}>邀请好友</span>
      </div>

      {/* Hero */}
      <div style={{
        margin: '12px', borderRadius: 16, padding: '28px 20px',
        background: 'linear-gradient(135deg, #E3617B, #F8A05E)',
        color: '#fff', textAlign: 'center',
      }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🎁</div>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 6px' }}>邀请好友一起练普拉提</h2>
        <p style={{ fontSize: 13, opacity: 0.9, margin: '0 0 16px' }}>
          分享你的专属邀请码，好友注册后双方各得 50 积分
        </p>

        {/* Invite Code Box */}
        <div style={{
          background: 'rgba(255,255,255,0.2)', borderRadius: 12, padding: '14px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          border: '1.5px dashed rgba(255,255,255,0.4)',
        }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 2 }}>我的邀请码</div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2 }}>{INVITE_CODE}</div>
          </div>
          <div onClick={handleCopy} style={{
            padding: '8px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.25)',
            fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <CopyIcon size={14} color="#fff" /> 复制
          </div>
        </div>

        {/* Simulate invite button */}
        <div onClick={() => setShowSimulate(true)} style={{
          marginTop: 14, padding: '8px 20px', borderRadius: 20, fontSize: 12, fontWeight: 500,
          background: 'rgba(0,0,0,0.15)', cursor: 'pointer', display: 'inline-block',
        }}>
          + 模拟一位好友通过链接注册
        </div>
      </div>

      {/* Points balance */}
      <div style={{
        margin: '0 12px 12px', padding: '14px 16px', borderRadius: 14,
        background: '#fafafa', border: '1px solid #eee',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: '#222', display: 'flex', alignItems: 'center', gap: 6 }}>
          <SparkleIcon size={16} color="var(--c-accent)" /> 当前积分
        </span>
        <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--c-accent)' }}>
          <span className="num">{points}</span>
        </span>
      </div>

      {/* Rewards */}
      <div style={{ padding: '0 12px' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 10 }}>
          奖励规则
        </div>
        {rewards.map((r, i) => (
          <div key={i} style={{
            padding: '14px 16px', borderRadius: 14, marginBottom: 8,
            background: '#fff', border: '1px solid #eee',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 28 }}>{r.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#222' }}>{r.title}</div>
              <div style={{ fontSize: 12, color: '#6a6a6a', marginTop: 2 }}>
                {r.desc} <span style={{ color: 'var(--c-accent)', fontWeight: 600 }}>{r.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Simulate confirm popup (inline) */}
      {showSimulate && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.45)',
          display: 'flex', alignItems: 'flex-end',
        }} onClick={() => setShowSimulate(false)}>
          <div style={{
            width: '100%', background: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20,
            padding: '24px 16px 30px', textAlign: 'center',
          }} onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 4 }}>
              模拟好友通过你的邀请链接注册
            </div>
            <div style={{ fontSize: 14, color: '#6a6a6a', marginBottom: 20 }}>
              双方各获得 <span style={{ color: 'var(--c-accent)', fontWeight: 600 }}>+50 积分</span>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div onClick={() => setShowSimulate(false)} style={{
                flex: 1, padding: '14px', borderRadius: 12, background: '#f7f7f7',
                color: '#6a6a6a', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>取消</div>
              <div onClick={handleSimulateInvite} style={{
                flex: 1, padding: '14px', borderRadius: 12, background: 'var(--c-accent)',
                color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}>确认邀请成功</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
