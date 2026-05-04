import { useNavigate } from 'react-router-dom'

export default function Welcome() {
  const nav = useNavigate()

  const btn = (s: React.CSSProperties) => ({
    display: 'block', width: '100%', border: 'none', borderRadius: 28, height: 50,
    fontSize: 16, fontWeight: 500, cursor: 'pointer', letterSpacing: 0.5,
    ...s,
  })

  return (
    <div style={{
      height: '100vh', background: '#F9F9F7',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '0 32px', textAlign: 'center',
    }}>
      {/* Logo */}
      <div style={{ marginBottom: 36 }}>
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" style={{ marginBottom: 16 }}>
          <circle cx="28" cy="28" r="26" stroke="#C8B6A6" strokeWidth="1.2"/>
          <path d="M18 36 Q28 14 38 36" stroke="#C8B6A6" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
          <path d="M22 36 Q28 22 34 36" stroke="#C8B6A6" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
        </svg>
        <h1 style={{ fontSize: 32, fontWeight: 300, letterSpacing: 8, color: '#C8B6A6', marginBottom: 8 }}>FLOW</h1>
        <p style={{ fontSize: 15, color: '#8C8C88', fontWeight: 300 }}>普拉提 · 遇见更好的自己</p>
      </div>

      {/* Slogan */}
      <div style={{ marginBottom: 44 }}>
        <p style={{ fontSize: 20, fontWeight: 300, color: '#2A2A2A', lineHeight: 1.7 }}>身体的每一次延展</p>
        <p style={{ fontSize: 20, fontWeight: 500, color: '#A69480', fontStyle: 'italic', lineHeight: 1.7 }}>都是与灵魂的深度对话</p>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button
          onClick={() => nav('/login')}
          style={btn({ background: '#C8B6A6', color: '#fff', boxShadow: '0 6px 24px rgba(200,182,166,0.35)' })}
        >
          开始体验
        </button>
        <button
          onClick={() => nav('/home')}
          style={btn({ background: 'transparent', color: '#A69480' })}
        >
          先随便看看
        </button>
      </div>

      <p style={{ marginTop: 40, fontSize: 14, color: '#8C8C88' }}>
        已有账号？{' '}
        <span onClick={() => nav('/login')} style={{ color: '#A69480', fontWeight: 500, cursor: 'pointer', textDecoration: 'underline' }}>
          立即登录
        </span>
      </p>
    </div>
  )
}
