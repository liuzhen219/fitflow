import React, { useState, useCallback } from 'react'
import { StarFilledIcon, HeartIcon, HeartFilledIcon } from './Icons'

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
  favoritable?: boolean
  coachId?: number
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
  favoritable = true,
  coachId,
}) => {
  const [hearted, setHearted] = useState(() =>
    favoritable && coachId != null ? isFavorited('coach', coachId) : false
  )

  const handleHeart = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (coachId == null) return
    const next = toggleFavorite('coach', coachId)
    setHearted(next)
  }, [coachId])

  return (
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
      {favoritable && coachId != null && (
        <span
          onClick={handleHeart}
          style={{
            position: 'absolute', top: 8, right: 8,
            cursor: 'pointer', lineHeight: 1,
            display: 'inline-flex',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
          }}
        >
          {hearted
            ? <HeartFilledIcon size={16} color="#E3617B" />
            : <HeartIcon size={16} color="#fff" />
          }
        </span>
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
        <StarFilledIcon size={12} color="var(--c-accent)" />
        {' '}<span style={{ color: 'var(--c-accent)', fontWeight: 600 }}>{rating}</span><span style={{ color: '#6a6a6a' }}> · {classCount}节课</span>
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
)}

export default CoachCard
