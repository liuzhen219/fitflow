import React from 'react'

interface EmptyStateProps {
  icon?: string
  text: string
  actionText?: string
  onAction?: () => void
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📭',
  text,
  actionText,
  onAction,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 12 }}>{icon}</div>
      <p
        style={{
          fontSize: 14,
          color: '#6a6a6a',
          margin: 0,
          lineHeight: 1.43,
          marginBottom: 16,
        }}
      >
        {text}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          style={{
            padding: '10px 24px',
            borderRadius: 8,
            background: '#E3617B',
            color: '#fff',
            border: 'none',
            fontSize: 14,
            fontWeight: 500,
            cursor: 'pointer',
            lineHeight: 1.25,
          }}
        >
          {actionText}
        </button>
      )}
    </div>
  )
}

export default EmptyState
