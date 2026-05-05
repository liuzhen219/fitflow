import React from 'react'
import { LocationIcon, ClockIcon, HomeServiceIcon, DumbbellIcon } from './Icons'

interface CourseCardProps {
  title: string
  coachName: string
  coachRating?: number
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
  coachRating,
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
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            {isHomeService ? (
              <HomeServiceIcon size={36} color="#fff" />
            ) : (
              <DumbbellIcon size={36} color="#fff" />
            )}
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
          <div style={{ fontSize: 14, fontWeight: 500, color: '#6a6a6a', lineHeight: 1.29, marginTop: 4 }}>
            {coachName}{venueName ? ` · ${venueName}` : ''}
          </div>
          {coachRating !== undefined && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
              {[1, 2, 3, 4, 5].map((star) => {
                const fill = Math.min(1, Math.max(0, coachRating - star + 1))
                return (
                  <div key={star} style={{
                    width: 14, height: 14, position: 'relative', flexShrink: 0,
                  }}>
                    {/* Empty star */}
                    <svg viewBox="0 0 24 24" width={14} height={14} fill="#ddd" stroke="none">
                      <path d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 7-6.2-3.3-6.2 3.3L7 14.2l-5-4.9 6.9-1L12 2z"/>
                    </svg>
                    {/* Filled portion */}
                    <svg viewBox="0 0 24 24" width={14} height={14} fill="#E3617B" stroke="none"
                      style={{ position: 'absolute', top: 0, left: 0, clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)` }}>
                      <path d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 7-6.2-3.3-6.2 3.3L7 14.2l-5-4.9 6.9-1L12 2z"/>
                    </svg>
                  </div>
                )
              })}
              <span style={{ fontSize: 12, fontWeight: 600, color: '#E3617B' }}>{coachRating.toFixed(1)}</span>
            </div>
          )}
          <div
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: '#6a6a6a',
              lineHeight: 1.29,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <LocationIcon size={12} color="#6a6a6a" />
            {' '}{distance}{' · '}
            <ClockIcon size={12} color="#6a6a6a" />
            {' '}{duration}分钟
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 500, color: '#6a6a6a', display: 'flex', alignItems: 'center', gap: 2 }}>
            <ClockIcon size={12} color="#6a6a6a" />
            {' '}{time}
          </span>
          <span style={{ fontSize: 18, fontWeight: 600, color: '#E3617B' }}>
            <span className="num">¥{price}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
)

export default CourseCard
