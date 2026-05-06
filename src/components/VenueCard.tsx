import React, { useState, useCallback } from 'react'
import { StarFilledIcon, LocationIcon, VerifiedIcon, HeartIcon, HeartFilledIcon, BuildingIcon } from './Icons'

const FAVORITES_KEY = 'fitflow_favorites'

function getFavorites(): { type: string; id: number }[] {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
  } catch { return [] }
}

function isFavorited(type: string, id: number): boolean {
  return getFavorites().some(f => f.type === type && f.id === id)
}

function toggleFavorite(type: string, id: number): boolean {
  const list = getFavorites()
  const idx = list.findIndex(f => f.type === type && f.id === id)
  if (idx >= 0) {
    list.splice(idx, 1)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(list))
    return false
  } else {
    list.push({ type, id })
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(list))
    return true
  }
}

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
  favoritable?: boolean
  venueId?: number
}

const VenueCard: React.FC<VenueCardProps> = ({
  name, district, distance, rating, reviewCount, imageUrl, facilities, verified, onClick,
  favoritable = true,
  venueId,
}) => {
  const [hearted, setHearted] = useState(() =>
    favoritable && venueId != null ? isFavorited('venue', venueId) : false
  )

  const handleHeart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (venueId == null) return
    const next = toggleFavorite('venue', venueId)
    setHearted(next)
  }, [venueId])

  return (
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <BuildingIcon size={36} color="#c0c0c0" />
        </div>
      )}
      {favoritable && venueId != null && (
        <span
          onClick={handleHeart}
          style={{
            position: 'absolute', top: 8, right: 8,
            cursor: 'pointer', lineHeight: 1,
            display: 'inline-flex',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
            zIndex: 2,
          }}
        >
          {hearted
            ? <HeartFilledIcon size={16} color="#E3617B" />
            : <HeartIcon size={16} color="#fff" />
          }
        </span>
      )}
      {verified && (
        <span style={{
          position: 'absolute', top: 8, right: 8,
          padding: '3px 8px', borderRadius: 4, fontSize: 10, fontWeight: 600,
          background: 'var(--c-accent)', color: '#fff',
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
          <StarFilledIcon size={11} color="var(--c-accent)" />
          <span style={{ color: 'var(--c-accent)', fontWeight: 600 }}>{rating.toFixed(1)}</span>
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
)}

export default VenueCard
