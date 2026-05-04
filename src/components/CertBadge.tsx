import React from 'react'

interface CertBadgeProps {
  label: string
  verified?: boolean
}

const CertBadge: React.FC<CertBadgeProps> = ({ label, verified = false }) => {
  const prefix = verified ? '✅ ' : ''

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '6px 12px',
        borderRadius: 4,
        fontSize: 12,
        lineHeight: 1.33,
        fontWeight: 500,
        color: '#222',
        background: '#fff',
        border: '1px solid #ddd',
      }}
    >
      {prefix}
      {label}
    </span>
  )
}

export default CertBadge
