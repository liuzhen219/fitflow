import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from 'antd-mobile'
import { useAppState } from '../store/AppContext'
import { SparkleIcon, TicketIcon, ClockIcon } from '../components/Icons'

const shopItems = [
  { id: 1, name: '普拉提防滑袜', desc: '专业五趾防滑设计', points: 80, image: '🧦', category: '装备' },
  { id: 2, name: '按摩球一对', desc: '深层筋膜放松', points: 80, image: '⚽', category: '装备' },
  { id: 3, name: '弹力带套装', desc: '3条不同阻力级别', points: 120, image: '🎗️', category: '装备' },
  { id: 4, name: '瑜伽垫', desc: '6mm加厚防滑', points: 200, image: '🧘', category: '装备' },
  { id: 5, name: '¥30 课程券', desc: '满300可用', points: 60, image: '🎫', category: '券' },
  { id: 6, name: '¥50 课程券', desc: '满500可用', points: 100, image: '🎟️', category: '券' },
  { id: 7, name: '私教课5折券', desc: '任意私教课程', points: 250, image: '🏅', category: '券' },
  { id: 8, name: '免费小班课1节', desc: '指定场馆', points: 300, image: '🎁', category: '课程' },
]

export default function PointsShop() {
  const nav = useNavigate()
  const { points, spendPoints } = useAppState()
  const [activeTab, setActiveTab] = useState<string>('all')

  const tabs = ['all', '装备', '券', '课程']
  const filtered = activeTab === 'all' ? shopItems : shopItems.filter(i => i.category === activeTab)

  const handleRedeem = (item: typeof shopItems[0]) => {
    const ok = spendPoints(item.points, `兑换${item.name}`)
    if (ok) {
      Toast.show({ icon: 'success', content: `兑换成功！${item.name}` })
    } else {
      Toast.show({ content: '积分不足' })
    }
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
        <span style={{ fontSize: 17, fontWeight: 600, color: '#222' }}>积分商城</span>
      </div>

      {/* Points bar */}
      <div style={{
        margin: '12px', padding: '16px', borderRadius: 14, background: '#fff', border: '1px solid #ddd',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', background: 'var(--c-accent-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <SparkleIcon size={20} color="var(--c-accent)" />
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#929292' }}>可用积分</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--c-accent)' }}>
              <span className="num">{points}</span>
            </div>
          </div>
        </div>
        <div onClick={() => nav('/invite')} style={{
          padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600,
          background: 'var(--c-accent)', color: '#fff', cursor: 'pointer',
        }}>
          赚积分 ›
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 12px 12px', scrollbarWidth: 'none' }}>
        {tabs.map(t => (
          <span key={t} onClick={() => setActiveTab(t)} style={{
            padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 500,
            flexShrink: 0, cursor: 'pointer',
            color: activeTab === t ? '#fff' : '#222',
            background: activeTab === t ? 'var(--c-accent)' : '#fff',
            border: activeTab === t ? '1.5px solid #E3617B' : '1px solid #ddd',
          }}>{t === 'all' ? '全部' : t}</span>
        ))}
      </div>

      {/* Items grid */}
      <div style={{ padding: '0 12px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {filtered.map(item => {
          const canRedeem = points >= item.points
          return (
            <div key={item.id} style={{
              background: '#fff', borderRadius: 14, border: '1px solid #ddd',
              overflow: 'hidden', display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 44, background: '#fafafa',
              }}>
                {item.image}
              </div>
              <div style={{ padding: '12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 2 }}>{item.name}</div>
                <div style={{ fontSize: 11, color: '#6a6a6a', marginBottom: 10 }}>{item.desc}</div>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--c-accent)' }}>
                    <span className="num">{item.points}</span>
                    <span style={{ fontSize: 11, fontWeight: 500 }}>积分</span>
                  </span>
                  <span onClick={() => canRedeem && handleRedeem(item)} style={{
                    padding: '4px 12px', borderRadius: 14, fontSize: 12, fontWeight: 600,
                    cursor: canRedeem ? 'pointer' : 'default',
                    background: canRedeem ? 'var(--c-accent)' : '#ddd',
                    color: '#fff', transition: 'background 0.15s',
                  }}>兑换</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div style={{ height: 16 }} />
    </div>
  )
}
