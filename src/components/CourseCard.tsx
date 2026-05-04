import React from 'react'

interface CourseCardProps {
  title: string
  coachName: string
  venueName: string
  distance: string
  duration: string
  price: number
  time: string
  imageGradient: string
  isHomeService?: boolean
  thumbnail?: string
  onClick: () => void
}

const s: Record<string, React.CSSProperties> = {
  card: {
    display: 'flex',
    gap: 12,
    padding: 14,
    background: '#FFFFFF',
    borderRadius: 16,
    cursor: 'pointer',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28,
    flexShrink: 0,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minWidth: 0,
  },
  title: {
    fontSize: 13,
    fontWeight: 700,
    color: '#4A3B3C',
    margin: 0,
    lineHeight: 1.3,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  coachVenue: {
    fontSize: 11,
    color: '#8B7E74',
    margin: 0,
    lineHeight: 1.3,
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 10,
    color: '#8B7E74',
  },
  locationIcon: {
    fontSize: 12,
    lineHeight: 1,
  },
  bottomRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 10,
    color: '#8B7E74',
  },
  price: {
    fontSize: 14,
    fontWeight: 700,
    color: '#E8B4A2',
    margin: 0,
    lineHeight: 1,
  },
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  coachName,
  venueName,
  distance,
  duration,
  price,
  time,
  imageGradient,
  isHomeService,
  thumbnail,
  onClick,
}) => {
  return (
    <div style={s.card} onClick={onClick}>
      <div style={{ ...s.thumbnail, background: imageGradient }}>
        {thumbnail ? (
          <img src={thumbnail} alt={title} style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: 12 }} />
        ) : (
          isHomeService ? '🏠' : '🧘'
        )}
      </div>
      <div style={s.content}>
        <div>
          <p style={s.title}>{title}</p>
          <p style={s.coachVenue}>{coachName} · {venueName}</p>
        </div>
        <div style={s.infoRow}>
          <span style={s.locationIcon}>{isHomeService ? '🏠' : '📍'}</span>
          <span>{distance}</span>
          <span>·</span>
          <span>⏱ {duration}</span>
        </div>
        <div style={s.bottomRow}>
          <span style={s.time}>{time}</span>
          <p style={s.price}>¥{price}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
