import React from 'react'

interface CertBadgeProps {
  label: string
  verified?: boolean
}

const s: Record<string, React.CSSProperties> = {
  badge: {
    display: 'inline-block',
    padding: '6px 12px',
    borderRadius: 8,
    fontSize: 11,
    lineHeight: 1,
    fontWeight: 500,
    color: '#4A3B3C',
  },
}

const CertBadge: React.FC<CertBadgeProps> = ({ label, verified = false }) => {
  const bg = verified ? '#FFF0E8' : '#FFF5F0'
  const prefix = verified ? '✅ ' : '🔒 '

  return (
    <span style={{ ...s.badge, background: bg }}>
      {prefix}{label}
    </span>
  )
}

export default CertBadge
