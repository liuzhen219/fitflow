import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userProfile } from '../data/mock'
import {
  UserIcon,
  SettingsIcon,
  OrdersIcon,
  WalletIcon,
  CalendarIcon,
  CheckIcon,
  RefreshIcon,
  TicketIcon,
  SupportIcon,
  ArchiveIcon,
  CommentIcon,
  HeartIcon,
  BuildingIcon,
  MapPinIcon,
} from '../components/Icons'

export default function Profile() {
  const nav = useNavigate()
  const [isMale, setIsMale] = useState(() => document.documentElement.getAttribute('data-theme') === 'male')

  const toggleTheme = () => {
    const next = !isMale
    setIsMale(next)
    document.documentElement.setAttribute('data-theme', next ? 'male' : '')
    localStorage.setItem('fitflow_theme', next ? 'male' : 'female')
  }

  const accent = isMale ? '#2C8A9E' : 'var(--c-accent)'
  const accentDeep = isMale ? '#1A6B7C' : 'var(--c-accent-deep)'

  const menuIconStyle = (size: number): React.CSSProperties => ({
    width: size,
    height: size,
    flexShrink: 0,
  })

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${accent}, ${accentDeep})`,
          padding: '30px 16px 24px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Settings gear top-right */}
        <div
          onClick={() => nav('/settings')}
          style={{
            position: 'absolute',
            top: 14,
            right: 16,
            cursor: 'pointer',
            lineHeight: 1,
            padding: 4,
          }}
        >
          <SettingsIcon size={20} color="rgba(255,255,255,0.8)" />
        </div>

        {/* Avatar */}
        <div
          style={{
            width: 64, height: 64, borderRadius: '50%',
            marginBottom: 10, overflow: 'hidden',
            border: '2px solid rgba(255,255,255,0.4)',
          }}
        >
          {userProfile.avatar ? (
            <img src={userProfile.avatar} alt={userProfile.name}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{
              width: '100%', height: '100%', background: 'rgba(255,255,255,0.25)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <UserIcon size={28} color="#fff" />
            </div>
          )}
        </div>
        <h2
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: '#fff',
            margin: '0 0 4px 0',
          }}
        >
          {userProfile.name}
        </h2>
        <div
          style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.75)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span>{userProfile.phone}</span>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>·</span>
          <span>{userProfile.membership}</span>
        </div>

        {/* Theme toggle */}
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          {[
            { key: 'female', label: '♀ 女性', color: 'var(--c-accent)' },
            { key: 'male', label: '♂ 男性', color: '#2C8A9E' },
          ].map((t) => {
            const active = t.key === 'male' ? isMale : !isMale
            return (
              <span key={t.key} onClick={() => { if (t.key === 'male' && !isMale) toggleTheme(); if (t.key === 'female' && isMale) toggleTheme() }}
                style={{
                  padding: '5px 12px', borderRadius: 16, fontSize: 11, fontWeight: 600,
                  cursor: 'pointer', userSelect: 'none', transition: 'all 0.15s',
                  background: active ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                  color: '#fff', border: active ? '1.5px solid rgba(255,255,255,0.5)' : '1.5px solid transparent',
                }}>
                {t.label}
              </span>
            )
          })}
        </div>
      </div>

      {/* Stats Cards (floating up) */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          margin: '-16px 12px 0',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {[
          { num: `${userProfile.stats.totalClasses}节`, label: '累计上课' },
          { num: `${Math.round(userProfile.stats.totalMinutes / 60)}h`, label: '训练时长' },
          { num: userProfile.stats.followedCoaches, label: '关注教练' },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              background: '#fff',
              borderRadius: 14,
              border: '1px solid #ddd',
              padding: '14px 8px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <span
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: accent,
                lineHeight: 1.18,
              }}
            >
              {stat.num}
            </span>
            <span style={{ fontSize: 11, color: '#929292', lineHeight: 1.29 }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Order Status Bar */}
      <div
        style={{
          margin: '16px 12px 0',
          background: '#fff',
          borderRadius: 14,
          border: '1px solid #ddd',
          padding: '14px 16px',
        }}
      >
        <div
          onClick={() => nav('/orders')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 15,
            fontWeight: 600,
            color: '#222',
            marginBottom: 14,
            cursor: 'pointer',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <OrdersIcon size={18} color="var(--c-accent)" />
            我的订单
          </span>
          <span style={{ fontSize: 16, color: '#929292', fontWeight: 500 }}>
            ›
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {[
            { icon: <WalletIcon size={24} color="var(--c-accent)" />, label: '待付款' },
            { icon: <CalendarIcon size={24} color="var(--c-accent)" />, label: '待上课' },
            { icon: <CheckIcon size={24} color="var(--c-accent)" />, label: '已完成' },
            { icon: <RefreshIcon size={24} color="var(--c-accent)" />, label: '退款' },
          ].map((item) => (
            <div
              key={item.label}
              onClick={() => nav('/orders')}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
              }}
            >
              <span style={{ lineHeight: 1 }}>{item.icon}</span>
              <span style={{ fontSize: 12, color: accent }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Groups */}
      <div style={{ padding: '0 12px', marginTop: 12 }}>
        {/* Group 1 */}
        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            border: '1px solid #ddd',
            marginBottom: 12,
            overflow: 'hidden',
          }}
        >
          {[
            { icon: <WalletIcon size={18} color="var(--c-accent)" />, label: '储值卡', value: `¥${userProfile.balance}`, path: '/orders' },
            { icon: <TicketIcon size={18} color="var(--c-accent)" />, label: '优惠券', value: `${userProfile.coupons}张可用`, highlight: true, path: '/orders' },
            { icon: <SupportIcon size={18} color="var(--c-accent)" />, label: '客服帮助', path: '' },
          ].map((item, idx, arr) => (
            <div key={item.label}>
              <div
                onClick={() => item.path && nav(item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  cursor: item.path ? 'pointer' : 'default',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span style={{ lineHeight: 1, display: 'inline-flex', width: 24, justifyContent: 'center' }}>
                    {item.icon}
                  </span>
                  <span
                    style={{
                      fontSize: 15,
                      color: '#222',
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {item.value && (
                    <span
                      style={{
                        fontSize: 13,
                        color: item.highlight ? accent : '#6a6a6a',
                        fontWeight: item.highlight ? 500 : 400,
                      }}
                    >
                      {item.value}
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: 16,
                      color: '#929292',
                      lineHeight: 1,
                    }}
                  >
                    ›
                  </span>
                </div>
              </div>
              {idx < arr.length - 1 && (
                <div
                  style={{
                    height: 1,
                    background: '#ddd',
                    margin: '0 16px',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Group 2 */}
        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            border: '1px solid #ddd',
            marginBottom: 12,
            overflow: 'hidden',
          }}
        >
          {[
            { icon: <ArchiveIcon size={18} color="var(--c-accent)" />, label: '训练档案', path: '/training' },
            { icon: <CommentIcon size={18} color="var(--c-accent)" />, label: '我的评价', value: '待评价 1条', highlight: true, path: '/orders' },
            { icon: <HeartIcon size={18} color="var(--c-accent)" />, label: '关注教练', value: `${userProfile.stats.followedCoaches}位`, path: '/homeservice' },
            { icon: <BuildingIcon size={18} color="var(--c-accent)" />, label: '收藏场馆', value: '3家', path: '/studio' },
          ].map((item, idx, arr) => (
            <div key={item.label}>
              <div
                onClick={() => item.path && nav(item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  cursor: item.path ? 'pointer' : 'default',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span style={{ lineHeight: 1, display: 'inline-flex', width: 24, justifyContent: 'center' }}>
                    {item.icon}
                  </span>
                  <span
                    style={{
                      fontSize: 15,
                      color: '#222',
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {item.value && (
                    <span
                      style={{
                        fontSize: 13,
                        color: item.highlight ? accent : '#6a6a6a',
                        fontWeight: item.highlight ? 500 : 400,
                      }}
                    >
                      {item.value}
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: 16,
                      color: '#929292',
                      lineHeight: 1,
                    }}
                  >
                    ›
                  </span>
                </div>
              </div>
              {idx < arr.length - 1 && (
                <div
                  style={{
                    height: 1,
                    background: '#ddd',
                    margin: '0 16px',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Group 3 */}
        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            border: '1px solid #ddd',
            marginBottom: 12,
            overflow: 'hidden',
          }}
        >
          {[
            { icon: <MapPinIcon size={18} color="var(--c-accent)" />, label: '常用地址', path: '/orders' },
            { icon: <SettingsIcon size={18} color="var(--c-accent)" />, label: '设置', path: '/settings' },
          ].map((item, idx, arr) => (
            <div key={item.label}>
              <div
                onClick={() => item.path && nav(item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  cursor: item.path ? 'pointer' : 'default',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span style={{ lineHeight: 1, display: 'inline-flex', width: 24, justifyContent: 'center' }}>
                    {item.icon}
                  </span>
                  <span
                    style={{
                      fontSize: 15,
                      color: '#222',
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 16,
                      color: '#929292',
                      lineHeight: 1,
                    }}
                  >
                    ›
                  </span>
                </div>
              </div>
              {idx < arr.length - 1 && (
                <div
                  style={{
                    height: 1,
                    background: '#ddd',
                    margin: '0 16px',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom spacer for TabBar */}
      <div style={{ height: 70 }} />
    </div>
  )
}
