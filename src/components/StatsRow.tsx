import React from 'react'

interface StatsItem {
  value: string
  label: string
}

interface StatsRowProps {
  items: StatsItem[]
}

const s: Record<string, React.CSSProperties> = {
  row: {
    display: 'flex',
    justifyContent: 'space-around',
    background: '#FFF5F0',
    borderRadius: 12,
    padding: '14px 0',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  },
  value: {
    fontSize: 16,
    fontWeight: 700,
    color: '#4A3B3C',
    margin: 0,
    lineHeight: 1.2,
  },
  label: {
    fontSize: 10,
    color: '#8B7E74',
    margin: 0,
    lineHeight: 1.2,
  },
}

const StatsRow: React.FC<StatsRowProps> = ({ items }) => {
  return (
    <div style={s.row}>
      {items.map((item, idx) => (
        <div key={idx} style={s.item}>
          <p style={s.value}>{item.value}</p>
          <p style={s.label}>{item.label}</p>
        </div>
      ))}
    </div>
  )
}

export default StatsRow
