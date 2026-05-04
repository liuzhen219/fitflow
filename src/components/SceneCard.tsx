import React from 'react'

interface SceneCardProps {
  icon: string
  title: string
  subtitle: string
  count: string
  gradient: string
  onClick: () => void
}

const s: Record<string, React.CSSProperties> = {
  card: {
    flex: 1,
    background: '#E8B4A2',
    borderRadius: 16,
    padding: '20px 16px',
    minHeight: 120,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: '#FFFFFF',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
  },
  icon: {
    fontSize: 32,
    lineHeight: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    margin: 0,
    lineHeight: 1.3,
  },
  subtitle: {
    fontSize: 11,
    opacity: 0.85,
    margin: 0,
    lineHeight: 1.4,
  },
  count: {
    fontSize: 11,
    opacity: 0.75,
    margin: 0,
    lineHeight: 1,
  },
}

const SceneCard: React.FC<SceneCardProps> = ({ icon, title, subtitle, count, gradient, onClick }) => {
  return (
    <div
      style={{ ...s.card, background: gradient }}
      onClick={onClick}
    >
      <div style={s.icon}>{icon}</div>
      <div>
        <h3 style={s.title}>{title}</h3>
        <p style={s.subtitle}>{subtitle}</p>
      </div>
      <p style={s.count}>{count}</p>
    </div>
  )
}

export default SceneCard
