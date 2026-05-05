import React from 'react'
import { StarFilledIcon } from './Icons'

interface CoachCardProps {
  name: string
  title: string
  certification: string
  rating: number
  classCount: number
  price: number
  imageUrl?: string
  gradient: string
  onClick: () => void
}

const CoachCard: React.FC<CoachCardProps> = ({
  name,
  title: coachTitle,
  certification,
  rating,
  classCount,
  price,
  imageUrl,
  gradient,
  onClick,
}) => (
  <div
    onClick={onClick}
    style={{
      minWidth: 156,
      cursor: 'pointer',
      flexShrink: 0,
    }}
  >
    {/* Photo */}
    <div
      style={{
        width: '100%',
        height: 200,
        borderRadius: 14,
        overflow: 'hidden',
        background: gradient,
        position: 'relative',
      }}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
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
            fontSize: 64,
            color: '#fff',
          }}
        >
          {name[0]}
        </div>
      )}
    </div>
    {/* Text below image */}
    <div style={{ padding: '12px 0 0' }}>
      <div style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.25, color: '#222' }}>
        {name}
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: '#6a6a6a',
          lineHeight: 1.29,
          marginTop: 2,
        }}
      >
        {certification}
      </div>
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
        <StarFilledIcon size={12} color="#E3617B" />
        {' '}{rating} · {classCount}节课
      </div>
      <div
        style={{
          fontSize: 15,
          fontWeight: 600,
          color: '#222',
          marginTop: 4,
        }}
      >
        <span className="num">¥{price}</span>
        <span style={{ fontSize: 14, fontWeight: 500, color: '#6a6a6a' }}>
          {' '}/节起
        </span>
      </div>
    </div>
  </div>
)

export default CoachCard
