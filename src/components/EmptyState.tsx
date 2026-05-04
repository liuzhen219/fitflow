import React from 'react'

interface EmptyStateProps {
  icon?: string
  text: string
  actionText?: string
  onAction?: () => void
}

const s: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    textAlign: 'center',
  },
  icon: {
    fontSize: 48,
    lineHeight: 1,
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    color: '#8B7E74',
    margin: 0,
    lineHeight: 1.5,
    marginBottom: 16,
  },
  actionBtn: {
    padding: '8px 24px',
    borderRadius: 20,
    background: '#E8B4A2',
    color: '#FFFFFF',
    border: 'none',
    fontSize: 13,
    fontWeight: 500,
    cursor: 'pointer',
    lineHeight: 1.2,
  },
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📭',
  text,
  actionText,
  onAction,
}) => {
  return (
    <div style={s.container}>
      <div style={s.icon}>{icon}</div>
      <p style={s.text}>{text}</p>
      {actionText && onAction && (
        <button style={s.actionBtn} onClick={onAction}>
          {actionText}
        </button>
      )}
    </div>
  )
}

export default EmptyState
