import React from 'react'
import { ArrowRightIcon } from './Icons'

interface SectionHeaderProps {
  title: string
  moreText?: string
  onMore?: () => void
  icon?: React.ReactNode
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  moreText = '查看全部',
  onMore,
  icon,
}) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    }}
  >
    <span style={{ fontWeight: 600, fontSize: 20, lineHeight: 1.18, color: '#222', display: 'flex', alignItems: 'center', gap: 6 }}>
      {icon && <span style={{ display: 'inline-flex', verticalAlign: 'middle' }}>{icon}</span>}
      {title}
    </span>
    {onMore && (
      <span
        style={{ fontSize: 14, fontWeight: 500, color: '#6a6a6a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}
        onClick={onMore}
      >
        {moreText}
        <ArrowRightIcon size={14} color="#6a6a6a" />
      </span>
    )}
  </div>
)

export default SectionHeader
