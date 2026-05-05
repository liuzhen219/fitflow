import React from 'react'
import { ClockIcon, MapPinIcon } from './Icons'

interface EventCardProps {
  title: string
  type: string
  date: string
  time: string
  venue: string
  image: string
  price: string
  totalSpots: number
  filledSpots: number
  tags: string[]
  onClick: () => void
}

const EventCard: React.FC<EventCardProps> = ({
  title, type, date, time, venue, image, price, totalSpots, filledSpots, tags, onClick,
}) => {
  const remaining = totalSpots - filledSpots
  const pct = Math.round((filledSpots / totalSpots) * 100)

  return (
    <div onClick={onClick} style={{
      minWidth: 280, borderRadius: 14, overflow: 'hidden',
      background: '#fff', border: '1px solid #ddd',
      cursor: 'pointer', flexShrink: 0,
    }}>
      {/* Image */}
      <div style={{ height: 140, position: 'relative', overflow: 'hidden', background: '#f0f0f0' }}>
        <img src={image} alt={title}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        {/* Type badge */}
        <span style={{
          position: 'absolute', top: 10, left: 10,
          padding: '4px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600,
          background: type === '户外' ? 'rgba(22,163,74,0.85)'
            : type === '工作坊' ? 'rgba(227,97,123,0.85)'
            : 'rgba(34,34,34,0.8)',
          color: '#fff',
        }}>
          {type}
        </span>
        {/* Price badge */}
        <span style={{
          position: 'absolute', top: 10, right: 10,
          padding: '4px 10px', borderRadius: 12, fontSize: 12, fontWeight: 600,
          background: price === '免费' ? 'rgba(22,163,74,0.15)' : 'rgba(227,97,123,0.12)',
          color: price === '免费' ? '#16A34A' : '#E3617B',
        }}>
          {price}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '14px' }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#222', margin: 0, lineHeight: 1.25 }}>
          {title}
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginTop: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6a6a6a' }}>
            <ClockIcon size={12} color="#6a6a6a" />
            {date} · {time}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#6a6a6a' }}>
            <MapPinIcon size={12} color="#6a6a6a" />
            {venue}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: '#6a6a6a' }}>
              已报 {filledSpots}/{totalSpots} 人
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, color: remaining <= 5 ? '#E3617B' : '#16A34A' }}>
              {remaining <= 5 ? `仅剩 ${remaining} 位` : `余 ${remaining} 位`}
            </span>
          </div>
          <div style={{
            height: 4, borderRadius: 2, background: '#f0f0f0', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', borderRadius: 2, transition: 'width 0.3s ease',
              width: `${pct}%`,
              background: remaining <= 5 ? '#E3617B' : '#E3617B',
              opacity: remaining <= 5 ? 1 : 0.6,
            }} />
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          {tags.map((tag) => (
            <span key={tag} style={{
              padding: '3px 8px', borderRadius: 4, fontSize: 11, fontWeight: 500,
              background: '#f7f7f7', color: '#6a6a6a',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EventCard
