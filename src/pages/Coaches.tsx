import { useNavigate } from 'react-router-dom'
import { NavBar, Avatar, Rate } from 'antd-mobile'

const coaches = [
  { id: 1, name: '林若溪', role: '核心床导师', exp: '8年', cert: 'STOTT PILATES® 认证', students: 1200, rate: 5, color: '#E8DDD2', desc: '专注核心床教学，擅长根据学员身体状况定制个性化方案' },
  { id: 2, name: 'Serena Li', role: '瑜伽导师', exp: '6年', cert: 'RYT-500 认证', students: 860, rate: 5, color: '#DCDACC', desc: '将传统瑜伽与普拉提融合，注重动作质感与呼吸的配合' },
  { id: 3, name: '王语晴', role: '冥想导师', exp: '10年', cert: '正念减压 MBSR 认证', students: 2100, rate: 5, color: '#E0D8CC', desc: '十一年练习经验，擅长引导学员进入深度放松状态' },
  { id: 4, name: 'Mia Chen', role: '塑形导师', exp: '5年', cert: 'ACE-CPT 认证', students: 650, rate: 4, color: '#D9CFC0', desc: '科学塑形方法，让你在健康的前提下拥有理想线条' },
  { id: 5, name: '张思语', role: '孕产普拉提导师', exp: '7年', cert: '孕期体适能认证', students: 480, rate: 5, color: '#DCE0D4', desc: '专注女性孕产期身体管理，安全温和高效' },
]

export default function Coaches() {
  const nav = useNavigate()

  return (
    <div style={s.page}>
      <NavBar onBack={() => nav(-1)}>专业导师</NavBar>

      <div style={s.body}>
        {coaches.map(c => (
          <div key={c.id} style={s.card}>
            <div style={s.cardTop}>
              <Avatar src="" fallback={c.name[0]} style={{ ...s.avatar, background: c.color }} />
              <div style={s.cardInfo}>
                <div style={s.nameRow}>
                  <h3 style={s.name}>{c.name}</h3>
                  <span style={s.role}>{c.role}</span>
                </div>
                <div style={s.rateRow}>
                  <Rate readOnly value={c.rate} style={{ '--star-size': '14px', '--active-color': '#C8B6A6' } as any} />
                </div>
              </div>
            </div>
            <p style={s.desc}>{c.desc}</p>
            <div style={s.tags}>
              <span style={s.tag}>{c.cert}</span>
              <span style={s.tag}>{c.exp} 经验</span>
              <span style={s.tag}>{c.students} 学员</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: 'var(--c-bg)' },
  body: { padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 14 },
  card: {
    background: 'var(--c-bg-card)', borderRadius: 18, padding: 18,
    boxShadow: 'var(--shadow-soft)',
  },
  cardTop: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 },
  avatar: { '--size': '56px', fontSize: 22, color: '#fff' } as any,
  cardInfo: { flex: 1 },
  nameRow: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 },
  name: { fontSize: 16, fontWeight: 500, color: 'var(--c-text)' },
  role: { fontSize: 11, color: 'var(--c-primary-deep)', background: 'rgba(200,182,166,0.12)', padding: '2px 10px', borderRadius: 8 },
  rateRow: { display: 'flex' },
  desc: { fontSize: 13, color: 'var(--c-text-secondary)', lineHeight: 1.7, marginBottom: 12, fontWeight: 300 },
  tags: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  tag: {
    fontSize: 11, color: 'var(--c-text-secondary)',
    background: 'rgba(200,182,166,0.06)', padding: '4px 12px', borderRadius: 8,
  },
}
