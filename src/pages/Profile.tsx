import { useNavigate } from 'react-router-dom'
import { userProfile } from '../data/mock'

export default function Profile() {
  const nav = useNavigate()

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        {/* Settings gear top-right */}
        <div style={s.settingsIcon} onClick={() => nav('/settings')}>⚙️</div>

        {/* User Info */}
        <div style={s.avatar}>
          <span style={s.avatarText}>{(userProfile.name || '李')[0]}</span>
        </div>
        <h2 style={s.userName}>{userProfile.name}</h2>
        <div style={s.userMeta}>
          <span>{userProfile.phone}</span>
          <span style={s.metaDot}>·</span>
          <span>{userProfile.membership}</span>
        </div>
      </div>

      {/* Stats Cards (floating up) */}
      <div style={s.statsRow}>
        <div style={s.statCard}>
          <span style={s.statNum}>{userProfile.stats.totalClasses}</span>
          <span style={s.statLabel}>累计课时</span>
        </div>
        <div style={s.statCard}>
          <span style={s.statNum}>{userProfile.stats.totalMinutes}</span>
          <span style={s.statLabel}>训练分钟</span>
        </div>
        <div style={s.statCard}>
          <span style={s.statNum}>{userProfile.stats.followedCoaches}</span>
          <span style={s.statLabel}>关注教练</span>
        </div>
      </div>

      {/* Order Status Bar */}
      <div style={s.orderSection}>
        <div style={s.orderHeader} onClick={() => nav('/orders')}>
          <span>📋 我的订单</span>
          <span style={s.orderArrow}>›</span>
        </div>
        <div style={s.orderIconsRow}>
          {[
            { icon: '💰', label: '待付款' },
            { icon: '📅', label: '待上课' },
            { icon: '✅', label: '已完成' },
            { icon: '↩️', label: '退款' },
          ].map((item) => (
            <div
              key={item.label}
              style={s.orderIconItem}
              onClick={() => nav('/orders')}
            >
              <span style={s.orderIcon}>{item.icon}</span>
              <span style={s.orderIconLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Menu Groups */}
      <div style={s.menuContainer}>
        {/* Group 1 */}
        <div style={s.menuGroup}>
          <div style={s.menuItem}>
            <div style={s.menuItemLeft}>
              <span style={s.menuItemIcon}>💳</span>
              <span style={s.menuItemLabel}>储值卡</span>
            </div>
            <div style={s.menuItemRight}>
              <span style={s.menuItemValue}>¥{userProfile.balance}</span>
              <span style={s.menuArrow}>›</span>
            </div>
          </div>
          <div style={s.menuDivider} />
          <div style={s.menuItem}>
            <div style={s.menuItemLeft}>
              <span style={s.menuItemIcon}>🎫</span>
              <span style={s.menuItemLabel}>优惠券</span>
            </div>
            <div style={s.menuItemRight}>
              <span style={s.menuItemValueHighlight}>{userProfile.coupons}张可用</span>
              <span style={s.menuArrow}>›</span>
            </div>
          </div>
          <div style={s.menuDivider} />
          <div style={s.menuItem}>
            <div style={s.menuItemLeft}>
              <span style={s.menuItemIcon}>📞</span>
              <span style={s.menuItemLabel}>客服帮助</span>
            </div>
            <div style={s.menuItemRight}>
              <span style={s.menuArrow}>›</span>
            </div>
          </div>
        </div>

        {/* Group 2 */}
        <div style={s.menuGroup}>
          <div style={s.menuItem}>
            <div style={s.menuItemLeft}>
              <span style={s.menuItemIcon}>📊</span>
              <span style={s.menuItemLabel}>训练档案</span>
            </div>
            <div style={s.menuItemRight}>
              <span style={s.menuArrow}>›</span>
            </div>
          </div>
          <div style={s.menuDivider} />
          <div style={s.menuItem}>
            <div style={s.menuItemLeft}>
              <span style={s.menuItemIcon}>⭐</span>
              <span style={s.menuItemLabel}>我的评价</span>
            </div>
            <div style={s.menuItemRight}>
              <span style={s.menuItemValueHighlight}>待评价 1条</span>
              <span style={s.menuArrow}>›</span>
            </div>
          </div>
          <div style={s.menuDivider} />
          <div style={s.menuItem}>
            <div style={s.menuItemLeft}>
              <span style={s.menuItemIcon}>❤️</span>
              <span style={s.menuItemLabel}>关注教练</span>
            </div>
            <div style={s.menuItemRight}>
              <span style={s.menuItemValue}>{userProfile.stats.followedCoaches}位</span>
              <span style={s.menuArrow}>›</span>
            </div>
          </div>
          <div style={s.menuDivider} />
          <div style={s.menuItem}>
            <div style={s.menuItemLeft}>
              <span style={s.menuItemIcon}>🏛️</span>
              <span style={s.menuItemLabel}>收藏场馆</span>
            </div>
            <div style={s.menuItemRight}>
              <span style={s.menuItemValue}>3家</span>
              <span style={s.menuArrow}>›</span>
            </div>
          </div>
        </div>

        {/* Group 3 */}
        <div style={s.menuGroup}>
          <div style={s.menuItem}>
            <div style={s.menuItemLeft}>
              <span style={s.menuItemIcon}>📍</span>
              <span style={s.menuItemLabel}>常用地址</span>
            </div>
            <div style={s.menuItemRight}>
              <span style={s.menuArrow}>›</span>
            </div>
          </div>
          <div style={s.menuDivider} />
          <div style={s.menuItem}>
            <div style={s.menuItemLeft}>
              <span style={s.menuItemIcon}>⚙️</span>
              <span style={s.menuItemLabel}>设置</span>
            </div>
            <div style={s.menuItemRight}>
              <span style={s.menuArrow}>›</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacer for TabBar */}
      <div style={s.bottomSpacer} />
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#FFF5F0',
  },

  // Header
  header: {
    background: 'linear-gradient(135deg, #E8B4A2, #D4A08A)',
    padding: '30px 16px 24px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  settingsIcon: {
    position: 'absolute',
    top: 14,
    right: 16,
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    cursor: 'pointer',
    lineHeight: 1,
    padding: 4,
  },

  // Avatar
  avatar: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 600,
    color: '#FFFFFF',
    lineHeight: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 700,
    color: '#FFFFFF',
    margin: '0 0 4px 0',
  },
  userMeta: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  metaDot: {
    color: 'rgba(255,255,255,0.4)',
  },

  // Stats Cards
  statsRow: {
    display: 'flex',
    gap: 10,
    margin: '-16px 12px 0',
    position: 'relative',
    zIndex: 2,
  },
  statCard: {
    flex: 1,
    background: '#FFFFFF',
    borderRadius: 14,
    padding: '14px 8px',
    textAlign: 'center',
    boxShadow: '0 2px 12px rgba(74,59,60,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  statNum: {
    fontSize: 20,
    fontWeight: 700,
    color: '#E8B4A2',
    lineHeight: 1.2,
  },
  statLabel: {
    fontSize: 10,
    color: '#B8A89E',
    lineHeight: 1.2,
  },

  // Order Status Bar
  orderSection: {
    margin: '16px 12px 0',
    background: '#FFFFFF',
    borderRadius: 16,
    padding: '14px 16px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  orderHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 14,
    fontWeight: 600,
    color: '#4A3B3C',
    marginBottom: 14,
    cursor: 'pointer',
  },
  orderArrow: {
    fontSize: 16,
    color: '#B8A89E',
    fontWeight: 400,
  },
  orderIconsRow: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  orderIconItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
    cursor: 'pointer',
  },
  orderIcon: {
    fontSize: 24,
    lineHeight: 1,
  },
  orderIconLabel: {
    fontSize: 11,
    color: '#8B7E74',
  },

  // Menu Groups
  menuContainer: {
    padding: '0 12px',
    marginTop: 12,
  },
  menuGroup: {
    background: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    overflow: 'hidden',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    cursor: 'pointer',
  },
  menuItemLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  menuItemIcon: {
    fontSize: 18,
    lineHeight: 1,
    width: 24,
    textAlign: 'center',
  },
  menuItemLabel: {
    fontSize: 14,
    color: '#4A3B3C',
    fontWeight: 500,
  },
  menuItemRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  menuItemValue: {
    fontSize: 12,
    color: '#8B7E74',
  },
  menuItemValueHighlight: {
    fontSize: 12,
    color: '#E8B4A2',
    fontWeight: 500,
  },
  menuArrow: {
    fontSize: 16,
    color: '#B8A89E',
    lineHeight: 1,
  },
  menuDivider: {
    height: 1,
    background: '#F0E8E0',
    margin: '0 16px',
  },

  // Bottom Spacer for TabBar
  bottomSpacer: {
    height: 70,
  },
}
