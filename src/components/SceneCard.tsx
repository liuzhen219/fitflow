import React from 'react'

interface SceneCardProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  count: string
  gradient: string
  onClick: () => void
}

const SceneCard: React.FC<SceneCardProps> = ({
  icon,
  title,
  subtitle,
  count,
  gradient,
  onClick,
}) => {
  return (
    <div
      style={{
        flex: 1,
        borderRadius: 14,
        padding: '20px 16px',
        minHeight: 120,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        color: '#fff',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        background: gradient,
      }}
      onClick={onClick}
    >
      <div style={{ lineHeight: 1 }}>{icon}</div>
      <div>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            margin: 0,
            lineHeight: 1.25,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 12,
            opacity: 0.85,
            margin: 0,
            lineHeight: 1.29,
          }}
        >
          {subtitle}
        </p>
      </div>
      <p
        style={{
          fontSize: 12,
          opacity: 0.75,
          margin: 0,
          lineHeight: 1,
        }}
      >
        {count}
      </p>
    </div>
  )
}

export default SceneCard
