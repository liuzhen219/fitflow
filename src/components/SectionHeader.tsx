import React from 'react'

interface SectionHeaderProps {
  title: string
  moreText?: string
  onMore?: () => void
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  moreText = '查看全部',
  onMore,
}) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 16,
    }}
  >
    <span style={{ fontWeight: 600, fontSize: 20, lineHeight: 1.18, color: '#222' }}>
      {title}
    </span>
    {onMore && (
      <span
        style={{ fontSize: 14, fontWeight: 500, color: '#6a6a6a', cursor: 'pointer' }}
        onClick={onMore}
      >
        {moreText} →
      </span>
    )}
  </div>
)

export default SectionHeader
