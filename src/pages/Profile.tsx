import { useNavigate } from 'react-router-dom'
import { userProfile } from '../data/mock'

export default function Profile() {
  const nav = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #E3617B, #D44A65)',
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
            fontSize: 18,
            color: 'rgba(255,255,255,0.8)',
            cursor: 'pointer',
            lineHeight: 1,
            padding: 4,
          }}
        >
          ⚙️
        </div>

        {/* Avatar */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: '#fff',
              lineHeight: 1,
            }}
          >
            {(userProfile.name || '李')[0]}
          </span>
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
          { num: userProfile.stats.totalClasses, label: '累计课时' },
          { num: userProfile.stats.totalMinutes, label: '训练分钟' },
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
                color: '#E3617B',
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
          <span>📋 我的订单</span>
          <span style={{ fontSize: 16, color: '#929292', fontWeight: 500 }}>
            ›
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {[
            { icon: '💰', label: '待付款' },
            { icon: '📅', label: '待上课' },
            { icon: '✅', label: '已完成' },
            { icon: '↩️', label: '退款' },
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
              <span style={{ fontSize: 24, lineHeight: 1 }}>{item.icon}</span>
              <span style={{ fontSize: 12, color: '#6a6a6a' }}>
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
            { icon: '💳', label: '储值卡', value: `¥${userProfile.balance}` },
            {
              icon: '🎫',
              label: '优惠券',
              value: `${userProfile.coupons}张可用`,
              highlight: true,
            },
            { icon: '📞', label: '客服帮助' },
          ].map((item, idx, arr) => (
            <div key={item.label}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      lineHeight: 1,
                      width: 24,
                      textAlign: 'center' as const,
                    }}
                  >
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
                        color: item.highlight ? '#E3617B' : '#6a6a6a',
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
            { icon: '📊', label: '训练档案' },
            {
              icon: '⭐',
              label: '我的评价',
              value: '待评价 1条',
              highlight: true,
            },
            {
              icon: '❤️',
              label: '关注教练',
              value: `${userProfile.stats.followedCoaches}位`,
            },
            { icon: '🏛️', label: '收藏场馆', value: '3家' },
          ].map((item, idx, arr) => (
            <div key={item.label}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      lineHeight: 1,
                      width: 24,
                      textAlign: 'center' as const,
                    }}
                  >
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
                        color: item.highlight ? '#E3617B' : '#6a6a6a',
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
            { icon: '📍', label: '常用地址' },
            { icon: '⚙️', label: '设置' },
          ].map((item, idx, arr) => (
            <div key={item.label}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 16px',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      lineHeight: 1,
                      width: 24,
                      textAlign: 'center' as const,
                    }}
                  >
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
