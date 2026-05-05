import React from 'react'
import { StarFilledIcon, LocationIcon, VerifiedIcon } from './Icons'

interface VenueCardProps {
  name: string
  district: string
  distance: string
  rating: number
  reviewCount: number
  imageUrl?: string
  facilities: string[]
  verified: boolean
  onClick: () => void
}

const VenueCard: React.FC<VenueCardProps> = ({
  name, district, distance, rating, reviewCount, imageUrl, facilities, verified, onClick,
}) => (
  <div onClick={onClick} style={{ minWidth: 220, cursor: 'pointer', flexShrink: 0 }}>
    {/* Photo */}
    <div style={{
      width: '100%', height: 140, borderRadius: 14, overflow: 'hidden',
      background: '#f0f0f0', position: 'relative',
    }}>
      {imageUrl ? (
        <img src={imageUrl} alt={name}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 40 }}>🏛️</div>
      )}
      {verified && (
        <span style={{
          position: 'absolute', top: 8, right: 8,
          padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600,
          background: 'rgba(227,97,123,0.85)', color: '#fff',
          display: 'flex', alignItems: 'center', gap: 2,
        }}>
          <VerifiedIcon size={10} color="#fff" /> 已核验
        </span>
      )}
    </div>
    {/* Info */}
    <div style={{ padding: '10px 0' }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#222', lineHeight: 1.25, marginBottom: 3 }}>
        {name}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 500, color: '#6a6a6a' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <StarFilledIcon size={11} color="#E3617B" />
          <span style={{ color: '#E3617B', fontWeight: 600 }}>{rating.toFixed(1)}</span>
        </span>
        <span>{reviewCount}条评价</span>
      </div>
      <div style={{ fontSize: 12, color: '#6a6a6a', display: 'flex', alignItems: 'center', gap: 2, marginTop: 2 }}>
        <LocationIcon size={11} color="#6a6a6a" />
        {district} · {distance}
      </div>
      <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
        {facilities.slice(0, 3).map((f) => (
          <span key={f} style={{
            padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 500,
            background: '#f7f7f7', color: '#6a6a6a',
          }}>{f}</span>
        ))}
      </div>
    </div>
  </div>
)

export default VenueCard
