import { useNavigate, useParams } from 'react-router-dom'
import { NavBar, Button, Image, Tag, Space } from 'antd-mobile'

const courseData: Record<string, any> = {
  '1': {
    title: '核心床基础 · 脊柱灵活', coach: '林若溪', dur: '45 min', level: '初级',
    tags: ['核心床', '脊柱健康', '基础'],
    desc: '本节课程专注于脊柱的逐节活动，通过核心床的弹簧阻力，帮助你找到深层核心的发力感。适合普拉提初学者，无需任何基础。',
    highlights: ['改善脊柱灵活性', '激活深层核心', '改善体态', '缓解腰背不适'],
    price: '¥198',
    time: '周一 / 周三 9:00 — 9:45',
    location: 'FLOW 朝阳公园工作室',
    color: 'linear-gradient(135deg, #E8DDD2, #D9CFC0)',
  },
  '2': {
    title: '垫上普拉提 · 核心唤醒', coach: 'Serena Li', dur: '60 min', level: '中级',
    tags: ['垫上', '核心', '全身'],
    desc: '在经典垫上普拉提的基础上，融入现代功能训练理念。全程自重训练，不需要器械，专注于呼吸与动作的协调。',
    highlights: ['强化核心肌群', '提升身体控制力', '改善协调性', '释放压力'],
    price: '¥168',
    time: '周二 / 周四 10:30 — 11:30',
    location: 'FLOW 朝阳公园工作室',
    color: 'linear-gradient(135deg, #DCDACC, #CDD0C0)',
  },
  '3': {
    title: '流瑜伽 · 身体流动', coach: '王语晴', dur: '50 min', level: '初级',
    tags: ['瑜伽', '流动', '柔韧'],
    desc: '通过流畅的动作串联，配合深长的呼吸，在一呼一吸之间感受身体的温柔流动。强调动作与呼吸的同步。',
    highlights: ['提升柔韧性', '放松身心', '改善呼吸', '缓解紧张'],
    price: '¥148',
    time: '每天 7:00 — 7:50',
    location: 'FLOW 国贸工作室',
    color: 'linear-gradient(135deg, #E0D8CC, #D5CBB8)',
  },
}

export default function CourseDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const c = courseData[id || '1'] || courseData['1']

  return (
    <div style={s.page}>
      <NavBar onBack={() => nav(-1)} style={s.nav}>{c.title}</NavBar>

      <div style={{ ...s.hero, background: c.color }}>
        <div style={s.heroContent}>
          <span style={s.heroLevel}>{c.level}</span>
          <h1 style={s.heroTitle}>{c.title}</h1>
          <p style={s.heroCoach}>{c.coach} · {c.dur}</p>
          <p style={s.heroPrice}>{c.price}<span style={s.heroPer}> / 节</span></p>
        </div>
      </div>

      <div style={s.body}>
        {/* 标签 */}
        <Space wrap style={{ marginBottom: 16 }}>
          {c.tags.map((t: string) => (
            <Tag key={t} round style={{ '--border-color': 'rgba(200,182,166,0.2)', color: 'var(--c-primary-deep)' } as any}>{t}</Tag>
          ))}
        </Space>

        {/* 课程介绍 */}
        <div style={s.block}>
          <h3 style={s.blockTitle}>课程介绍</h3>
          <p style={s.blockText}>{c.desc}</p>
        </div>

        {/* 课程亮点 */}
        <div style={s.block}>
          <h3 style={s.blockTitle}>课程亮点</h3>
          <div style={s.highlights}>
            {c.highlights.map((h: string) => (
              <div key={h} style={s.hlItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8B6A6" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 详情信息 */}
        <div style={s.block}>
          <h3 style={s.blockTitle}>上课信息</h3>
          <div style={s.infoList}>
            <div style={s.infoItem}><span style={s.infoLabel}>时间</span><span>{c.time}</span></div>
            <div style={s.infoItem}><span style={s.infoLabel}>地点</span><span>{c.location}</span></div>
            <div style={s.infoItem}><span style={s.infoLabel}>时长</span><span>{c.dur}</span></div>
          </div>
        </div>

        {/* CTA */}
        <div style={s.cta}>
          <div style={s.ctaPrice}>
            <span style={s.ctaPriceNum}>{c.price}</span>
            <span style={s.ctaPriceUnit}> / 节</span>
          </div>
          <Button block color="primary" size="large" onClick={() => nav(`/booking/${id}`)} style={s.btn}>
            立即预约
          </Button>
        </div>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: 'var(--c-bg)' },
  nav: { '--border-bottom': 'none' } as any,
  hero: { height: 260, padding: '40px 24px 24px', display: 'flex', alignItems: 'flex-end', borderRadius: '0 0 32px 32px' },
  heroContent: { color: 'var(--c-text)' },
  heroLevel: { fontSize: 11, background: 'rgba(255,255,255,0.35)', padding: '4px 12px', borderRadius: 10, display: 'inline-block', marginBottom: 12 },
  heroTitle: { fontSize: 26, fontWeight: 500, lineHeight: 1.3, marginBottom: 8 },
  heroCoach: { fontSize: 14, color: 'var(--c-text-secondary)' },
  heroPrice: { fontSize: 24, fontWeight: 600, color: 'var(--c-primary-deep)', marginTop: 14 },
  heroPer: { fontSize: 14, fontWeight: 400, color: 'var(--c-text-secondary)' },
  body: { padding: '20px 20px 120px' },
  block: { marginBottom: 24 },
  blockTitle: { fontSize: 17, fontWeight: 500, color: 'var(--c-text)', marginBottom: 10, letterSpacing: 0.5 },
  blockText: { fontSize: 14, color: 'var(--c-text-secondary)', lineHeight: 1.8, fontWeight: 300 },
  highlights: { display: 'flex', flexDirection: 'column', gap: 10 },
  hlItem: { display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--c-text-secondary)', fontWeight: 300 },
  infoList: { background: 'var(--c-bg-card)', borderRadius: 16, overflow: 'hidden' },
  infoItem: { display: 'flex', justifyContent: 'space-between', padding: '14px 16px', fontSize: 14, color: 'var(--c-text)', borderBottom: '1px solid rgba(200,182,166,0.08)' },
  infoLabel: { color: 'var(--c-text-secondary)' },
  cta: {
    position: 'fixed', bottom: 0, left: 0, right: 0,
    background: 'rgba(249,249,247,0.95)', backdropFilter: 'blur(16px)',
    padding: '12px 20px calc(env(safe-area-inset-bottom, 0) + 12px)',
    display: 'flex', alignItems: 'center', gap: 16,
    borderTop: '1px solid rgba(200,182,166,0.1)',
  },
  ctaPrice: { flexShrink: 0 },
  ctaPriceNum: { fontSize: 22, fontWeight: 600, color: 'var(--c-primary-deep)' },
  ctaPriceUnit: { fontSize: 12, color: 'var(--c-text-secondary)' },
  btn: {
    '--color': '#C8B6A6', borderRadius: 28, height: 48, fontSize: 16,
    fontWeight: 500, boxShadow: '0 6px 24px rgba(200,182,166,0.35)', border: 'none',
  } as any,
}
