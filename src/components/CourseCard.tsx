import React from 'react'

interface CourseCardProps {
  title: string
  coachName: string
  venueName: string
  distance: string
  duration: number
  price: number
  time: string
  imageGradient: string
  isHomeService: boolean
  thumbnail?: string
  onClick: () => void
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
}) => (
  <div
    onClick={onClick}
    style={{
      cursor: 'pointer',
      marginBottom: 0,
      borderBottom: '1px solid #ddd',
      padding: '16px 0',
    }}
  >
    <div style={{ display: 'flex', gap: 16 }}>
      {/* Thumbnail */}
      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: 14,
          flexShrink: 0,
          background: imageGradient,
          overflow: 'hidden',
        }}
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              fontSize: 36,
            }}
          >
            {isHomeService ? '🏠' : '🧘'}
          </div>
        )}
      </div>
      {/* Content */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: 16,
              lineHeight: 1.25,
              color: '#222',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: '#6a6a6a',
              lineHeight: 1.29,
              marginTop: 4,
            }}
          >
            {coachName}
            {venueName ? ` · ${venueName}` : ''}
          </div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: '#6a6a6a',
              lineHeight: 1.29,
            }}
          >
            📍 {distance} · ⏱ {duration}分钟
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 500, color: '#6a6a6a' }}>
            ⏱ {time}
          </span>
          <span style={{ fontSize: 18, fontWeight: 600, color: '#222' }}>
            <span className="num">¥{price}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
)

export default CourseCard
