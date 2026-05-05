import React from 'react'

interface StatsItem {
  value: string
  label: string
}

interface StatsRowProps {
  items: StatsItem[]
}

const StatsRow: React.FC<StatsRowProps> = ({ items }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        background: '#fff',
        borderRadius: 14,
        border: '1px solid #ddd',
        padding: '14px 0',
      }}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: 'var(--c-accent)',
              margin: 0,
              lineHeight: 1.18,
            }}
          >
            {item.value}
          </p>
          <p
            style={{
              fontSize: 12,
              color: '#6a6a6a',
              margin: 0,
              lineHeight: 1.29,
            }}
          >
            {item.label}
          </p>
        </div>
      ))}
    </div>
  )
}

export default StatsRow
