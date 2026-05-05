import React from 'react'

interface SceneCardProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  count: string
  gradient: string
  imageUrl?: string
  onClick: () => void
}

const SceneCard: React.FC<SceneCardProps> = ({
  icon, title, subtitle, count, gradient, imageUrl, onClick,
}) => (
  <div
    onClick={onClick}
    style={{
      flex: 1, borderRadius: 14, padding: '20px 16px', minHeight: 130,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      color: '#fff', cursor: 'pointer', position: 'relative', overflow: 'hidden',
      background: gradient,
    }}
  >
    {/* Background image with gradient overlay */}
    {imageUrl && (
      <>
        <div style={{
          position: 'absolute', inset: 0,
          background: `url(${imageUrl}) center/cover no-repeat`,
          transition: 'transform 0.4s ease',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 100%)',
        }} />
      </>
    )}

    {/* Content */}
    <div style={{ position: 'relative', zIndex: 1 }}>{icon}</div>
    <div style={{ position: 'relative', zIndex: 1 }}>
      <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0, lineHeight: 1.25 }}>{title}</h3>
      <p style={{ fontSize: 12, opacity: 0.85, margin: 0, lineHeight: 1.29 }}>{subtitle}</p>
    </div>
    <p style={{ position: 'relative', zIndex: 1, fontSize: 12, opacity: 0.75, margin: 0 }}>
      {count} →
    </p>
  </div>
)

export default SceneCard
