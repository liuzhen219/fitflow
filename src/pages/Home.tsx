import { useNavigate } from 'react-router-dom'

const cats = [
  { label: '核心床', icon: '○' },
  { label: '垫上', icon: '◇' },
  { label: '瑜伽', icon: '△' },
  { label: '冥想', icon: '□' },
  { label: '塑形', icon: '☆' },
]

const courses = [
  { id: 1, title: '核心床 · 脊柱灵活', coach: '林若溪', dur: '45 min', level: '初级', color: 'linear-gradient(135deg, #E8DDD2, #D9CFC0)' },
  { id: 2, title: '垫上普拉提 · 核心唤醒', coach: 'Serena Li', dur: '60 min', level: '中级', color: 'linear-gradient(135deg, #DCDACC, #CDD0C0)' },
  { id: 3, title: '流瑜伽 · 身体流动', coach: '王语晴', dur: '50 min', level: '初级', color: 'linear-gradient(135deg, #E0D8CC, #D5CBB8)' },
]

const coaches = [
  { name: '林若溪', role: '核心床导师', exp: '8年', color: '#E8DDD2' },
  { name: 'Serena Li', role: '瑜伽导师', exp: '6年', color: '#DCDACC' },
  { name: '王语晴', role: '冥想导师', exp: '10年', color: '#E0D8CC' },
  { name: 'Mia Chen', role: '塑形导师', exp: '5年', color: '#D9CFC0' },
]

const tabs = [
  { key: 'home', label: '首页', icon: '⌂' },
  { key: 'courses', label: '课程', icon: '⊞' },
  { key: 'coaches', label: '教练', icon: '★' },
  { key: 'profile', label: '我的', icon: '👤' },
]

export default function Home() {
  const nav = useNavigate()

  const goto = (path: string) => nav(path)

  return (
    <div style={{ minHeight: '100vh', background: '#F9F9F7', paddingBottom: 90 }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '12px 20px', background: 'rgba(249,249,247,0.92)',
        backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(200,182,166,0.08)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: 3, color: '#C8B6A6' }}>FLOW</span>
        <span style={{ fontSize: 20, cursor: 'pointer' }}>🔔</span>
      </div>

      <div style={{ padding: '0 20px' }}>
        {/* Banner */}
        <div style={{
          height: 160, borderRadius: 20, margin: '12px 0',
          background: 'linear-gradient(135deg, #E8DDD2 0%, #DCDACC 60%, #D4CFC0 100%)',
          display: 'flex', alignItems: 'center', padding: 24,
        }}>
          <div>
            <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.4)', padding: '4px 12px', borderRadius: 10 }}>新课程上线</span>
            <h2 style={{ fontSize: 22, fontWeight: 400, lineHeight: 1.4, marginTop: 10, color: '#2A2A2A' }}>
              感受身体的<br />流动之美
            </h2>
          </div>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 18, fontWeight: 500, color: '#2A2A2A' }}>探索课程</h3>
            <span style={{ fontSize: 13, color: '#A69480', cursor: 'pointer' }} onClick={() => goto('/courses')}>全部 →</span>
          </div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto' }}>
            {cats.map(c => (
              <div key={c.label} onClick={() => goto('/courses')} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                minWidth: 64, height: 72, background: '#fff', borderRadius: 14,
                justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 16px rgba(42,42,42,0.05)',
              }}>
                <span style={{ fontSize: 20, color: '#C8B6A6' }}>{c.icon}</span>
                <span style={{ fontSize: 11, color: '#8C8C88' }}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Courses */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 18, fontWeight: 500, color: '#2A2A2A' }}>精品课程</h3>
            <span style={{ fontSize: 13, color: '#A69480', cursor: 'pointer' }} onClick={() => goto('/courses')}>全部 →</span>
          </div>
          <div style={{ display: 'flex', gap: 14, overflowX: 'auto' }}>
            {courses.map(c => (
              <div key={c.id} onClick={() => goto(`/course/${c.id}`)} style={{
                minWidth: 240, background: '#fff', borderRadius: 16, overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(42,42,42,0.05)', cursor: 'pointer',
              }}>
                <div style={{ ...s.courseImg, background: c.color }}>
                  <span style={{ fontSize: 10, color:'#fff', background:'rgba(0,0,0,0.12)', padding:'3px 10px', borderRadius:8 }}>{c.level}</span>
                </div>
                <div style={{ padding: 12 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 500, color:'#2A2A2A', marginBottom: 4 }}>{c.title}</h4>
                  <p style={{ fontSize: 12, color:'#8C8C88' }}>{c.coach} · {c.dur}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coaches */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 18, fontWeight: 500, color: '#2A2A2A' }}>专业导师</h3>
            <span style={{ fontSize: 13, color: '#A69480', cursor: 'pointer' }} onClick={() => goto('/coaches')}>全部 →</span>
          </div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto' }}>
            {coaches.map(c => (
              <div key={c.name} onClick={() => goto('/coaches')} style={{
                display:'flex', flexDirection:'column', alignItems:'center',
                background:'#fff', borderRadius:16, padding:'18px 16px 14px',
                minWidth:110, boxShadow:'0 2px 16px rgba(42,42,42,0.05)', cursor:'pointer',
              }}>
                <div style={{ width:56, height:56, borderRadius:'50%', background:c.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, color:'#fff', marginBottom:10 }}>
                  {c.name[0]}
                </div>
                <span style={{ fontSize:13, fontWeight:500, color:'#2A2A2A', marginBottom:2 }}>{c.name}</span>
                <span style={{ fontSize:11, color:'#8C8C88', marginBottom:6 }}>{c.role}</span>
                <span style={{ fontSize:10, color:'#A69480', background:'rgba(200,182,166,0.1)', padding:'2px 10px', borderRadius:8 }}>{c.exp} 经验</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TabBar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(249,249,247,0.95)', backdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(200,182,166,0.08)',
        display: 'flex', justifyContent: 'space-around',
        padding: '8px 16px calc(env(safe-area-inset-bottom, 0) + 8px)',
      }}>
        {tabs.map(t => (
          <div key={t.key} onClick={() => goto(`/${t.key === 'home' ? 'home' : t.key}`)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            cursor: 'pointer', padding: '4px 12px', color: '#8C8C88',
          }}>
            <span style={{ fontSize: 20 }}>{t.icon}</span>
            <span style={{ fontSize: 10 }}>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const s = {
  courseImg: { height: 150, padding: 10, display: 'flex' as const, alignItems: 'flex-end' as const },
}
