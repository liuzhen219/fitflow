import { useNavigate } from 'react-router-dom'
import { NavBar, Avatar, List, Badge, Button } from 'antd-mobile'
import { SetOutline, RightOutline, AppOutline, StarOutline, ClockCircleOutline, CouponOutline, HeartOutline, LocationOutline } from 'antd-mobile-icons'

const menuGroups = [
  {
    items: [
      { icon: <ClockCircleOutline />, label: '我的课程', desc: '3 节进行中', badge: '3' },
      { icon: <StarOutline />, label: '预约记录', desc: '查看全部' },
      { icon: <HeartOutline />, label: '收藏课程', desc: '12 节已收藏' },
    ],
  },
  {
    items: [
      { icon: <CouponOutline />, label: '优惠券', desc: '2 张可用' },
      { icon: <LocationOutline />, label: '我的地址', desc: '2 个工作室' },
      { icon: <SetOutline />, label: '设置', desc: '账号与偏好' },
    ],
  },
]

export default function Profile() {
  const nav = useNavigate()

  return (
    <div style={s.page}>
      {/* 头部卡片 */}
      <div style={s.headerCard}>
        <div style={s.headerBg} />
        <div style={s.headerContent}>
          <Avatar src="" fallback="L" style={s.avatar} />
          <div style={s.userInfo}>
            <h2 style={s.userName}>林小姐</h2>
            <span style={s.userBadge}>高级会员</span>
          </div>
          <RightOutline fontSize={16} color="rgba(255,255,255,0.6)" />
        </div>
        <div style={s.stats}>
          {[ { n: '48', l: '已完成' }, { n: '126', l: '总课时' }, { n: '6', l: '连续月' } ].map(item => (
            <div key={item.l} style={s.stat}>
              <span style={s.statNum}>{item.n}</span>
              <span style={s.statLabel}>{item.l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 菜单 */}
      <div style={s.body}>
        {menuGroups.map((g, gi) => (
          <List key={gi} style={s.listGroup}>
            {g.items.map(item => (
              <List.Item
                key={item.label}
                prefix={item.icon}
                extra={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {item.badge ? <Badge content={item.badge} style={{ marginRight: 4 }} /> : null}
                    <span style={{ fontSize: 12, color: 'var(--c-text-muted)' }}>{item.desc}</span>
                    <RightOutline fontSize={14} color="var(--c-text-muted)" />
                  </div>
                }
              >
                <span style={{ fontSize: 14, color: 'var(--c-text)' }}>{item.label}</span>
              </List.Item>
            ))}
          </List>
        ))}
      </div>

      {/* 退出 */}
      <div style={s.logout}>
        <Button block fill="none" onClick={() => nav('/')} style={s.logoutBtn}>
          退出登录
        </Button>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: 'var(--c-bg)' },
  headerCard: {
    margin: '16px 20px 8px', borderRadius: 24, overflow: 'hidden',
    position: 'relative', boxShadow: 'var(--shadow-card)',
  },
  headerBg: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(135deg, #E8DDD2 0%, #D9CFC0 40%, #DCDACC 100%)',
  },
  headerContent: {
    position: 'relative', display: 'flex', alignItems: 'center', gap: 14,
    padding: '28px 20px 16px', color: 'white',
  },
  avatar: { '--size': '56px', background: 'rgba(255,255,255,0.3)', fontSize: 22, color: '#fff' } as any,
  userInfo: { flex: 1 },
  userName: { fontSize: 20, fontWeight: 500, color: '#fff', marginBottom: 4 },
  userBadge: { fontSize: 11, background: 'rgba(255,255,255,0.25)', padding: '3px 10px', borderRadius: 10, color: '#fff' },
  stats: {
    position: 'relative', display: 'flex', justifyContent: 'center', gap: 32,
    padding: '16px 20px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
  },
  stat: { textAlign: 'center', color: '#fff' },
  statNum: { display: 'block', fontSize: 16, fontWeight: 600 },
  statLabel: { fontSize: 11, opacity: 0.7 },
  body: { padding: '0 20px' },
  listGroup: {
    borderRadius: 16, overflow: 'hidden', marginBottom: 12,
    boxShadow: 'var(--shadow-soft)',
    '--border-inner': '1px solid rgba(200,182,166,0.06)',
  } as any,
  logout: { padding: '16px 20px 40px' },
  logoutBtn: { color: 'var(--c-text-muted)', fontSize: 14, fontWeight: 300 },
}
