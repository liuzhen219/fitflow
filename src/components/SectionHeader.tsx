import React from 'react'

interface SectionHeaderProps {
  title: string
  moreText?: string
  onMore?: () => void
}

const s: Record<string, React.CSSProperties> = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: '#4A3B3C',
    margin: 0,
    lineHeight: 1.3,
  },
  more: {
    fontSize: 12,
    color: '#E8B4A2',
    cursor: 'pointer',
    fontWeight: 500,
    lineHeight: 1.3,
  },
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  moreText = '查看全部',
  onMore,
}) => {
  return (
    <div style={s.header}>
      <h3 style={s.title}>{title}</h3>
      {onMore && (
        <span style={s.more} onClick={onMore}>
          {moreText} →
        </span>
      )}
    </div>
  )
}

export default SectionHeader
