import { useNavigate } from 'react-router-dom'

export default function Splash() {
  const nav = useNavigate()

  return (
    <div style={s.page}>
      {/* Background image layer */}
      <img
        src="https://picsum.photos/seed/Splash-0/800/1200"
        alt=""
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.08,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {/* Content */}
      <div style={s.content}>
        {/* Logo */}
        <div style={{ marginBottom: 36 }}>
          <svg
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            style={{ marginBottom: 16 }}
          >
            <circle cx="28" cy="28" r="26" stroke="var(--c-accent)" strokeWidth="1.2" />
            <path
              d="M18 36 Q28 14 38 36"
              stroke="var(--c-accent)"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M22 36 Q28 22 34 36"
              stroke="var(--c-accent)"
              strokeWidth="0.8"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <h1 style={s.title}>FitFlow</h1>
          <p style={s.subtitle}>体态塑造的自由流动空间</p>
        </div>

        {/* Slogan */}
        <div style={{ marginBottom: 44 }}>
          <p style={s.slogan1}>身体的每一次延展</p>
          <p style={s.slogan2}>都是与灵魂的深度对话</p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={() => nav('/login')}
            style={{
              display: 'block',
              width: '100%',
              border: 'none',
              borderRadius: 8,
              height: 50,
              fontSize: 16,
              fontWeight: 500,
              cursor: 'pointer',
              background: 'var(--c-accent)',
              color: '#fff',
              boxShadow: '0 6px 24px rgba(227,97,123,0.35)',
            }}
          >
            开始体验
          </button>
          <button
            onClick={() => nav('/home')}
            style={{
              display: 'block',
              width: '100%',
              border: 'none',
              borderRadius: 8,
              height: 50,
              fontSize: 16,
              fontWeight: 500,
              cursor: 'pointer',
              background: 'transparent',
              color: '#6a6a6a',
            }}
          >
            先随便看看
          </button>
        </div>

        <p style={s.link}>
          已有账号？{' '}
          <span onClick={() => nav('/login')} style={s.linkAction}>
            立即登录
          </span>
        </p>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    height: '100vh',
    background: '#fff',
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 32px',
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 300,
    letterSpacing: 8,
    color: 'var(--c-accent)',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6a6a6a',
    fontWeight: 300,
  },
  slogan1: {
    fontSize: 20,
    fontWeight: 300,
    color: '#222',
    lineHeight: 1.7,
    margin: 0,
  },
  slogan2: {
    fontSize: 20,
    fontWeight: 500,
    color: 'var(--c-accent)',
    fontStyle: 'italic',
    lineHeight: 1.7,
    margin: 0,
  },
  link: {
    marginTop: 40,
    fontSize: 14,
    color: '#6a6a6a',
  },
  linkAction: {
    color: 'var(--c-accent)',
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'underline',
  },
}
