import React from 'react'
import { CheckIcon } from './Icons'

interface CertBadgeProps {
  label: string
  verified?: boolean
}

const CertBadge: React.FC<CertBadgeProps> = ({ label, verified = false }) => {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
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
      {verified && <CheckIcon size={12} color="#16A34A" />}
      {label}
    </span>
  )
}

export default CertBadge
