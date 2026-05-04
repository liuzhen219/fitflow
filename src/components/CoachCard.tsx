import React from 'react'

interface CoachCardProps {
  name: string
  title: string
  certification: string
  rating: number
  classCount: number
  price: number
  gradient: string
  onClick: () => void
}

const s: Record<string, React.CSSProperties> = {
  card: {
    minWidth: 148,
    flexShrink: 0,
    background: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
  },
  gradientArea: {
    height: 110,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 48,
    fontWeight: 700,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1,
  },
  bottom: {
    padding: '10px 10px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  name: {
    fontSize: 13,
    fontWeight: 700,
    color: '#4A3B3C',
    margin: 0,
    lineHeight: 1.2,
  },
  cert: {
    fontSize: 10,
    color: '#8B7E74',
    margin: 0,
    lineHeight: 1.2,
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    fontSize: 11,
    color: '#8B7E74',
  },
  star: {
    color: '#E8B4A2',
  },
  price: {
    fontSize: 13,
    fontWeight: 700,
    color: '#E8B4A2',
    margin: 0,
    lineHeight: 1.2,
  },
}

const CoachCard: React.FC<CoachCardProps> = ({
  name,
  title: coachTitle,
  certification,
  rating,
  classCount,
  price,
  gradient,
  onClick,
}) => {
  return (
    <div style={s.card} onClick={onClick}>
      <div style={{ ...s.gradientArea, background: gradient }}>
        {name.charAt(0)}
      </div>
      <div style={s.bottom}>
        <p style={s.name}>{name}</p>
        <p style={s.cert}>{certification}</p>
        <div style={s.ratingRow}>
          <span style={s.star}>
            {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
          </span>
          <span>{rating.toFixed(1)}</span>
          <span>| {classCount}课</span>
        </div>
        <p style={s.price}>¥{price}/节起</p>
      </div>
    </div>
  )
}

export default CoachCard
