import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import VenueCard from '../components/VenueCard'
import EmptyState from '../components/EmptyState'
import { venues } from '../data/mock'

const FAVORITES_KEY = 'fitflow_favorites'

function getFavorites(): { type: string; id: number }[] {
  try { return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]') } catch { return [] }
}

export default function FollowedVenues() {
  const nav = useNavigate()
  const [favorites] = useState(getFavorites)

  const followedVenues = favorites
    .filter(f => f.type === 'venue')
    .map(f => venues.find(v => v.id === f.id))
    .filter(Boolean)

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <div style={{
        display: 'flex', alignItems: 'center', padding: '14px 16px',
        borderBottom: '1px solid #f0f0f0', gap: 8,
      }}>
        <div onClick={() => nav(-1)} style={{
          width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: '#fff', cursor: 'pointer', fontWeight: 400, lineHeight: '34px', flexShrink: 0,
        }}>‹</div>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#222' }}>
          收藏场馆 ({followedVenues.length})
        </span>
      </div>

      <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {followedVenues.length > 0 ? followedVenues.map((v) => (
          <VenueCard
            key={v!.id}
            name={v!.name}
            district={v!.district}
            distance={v!.distance}
            rating={v!.rating}
            reviewCount={v!.reviewCount}
            imageUrl={v!.heroImage}
            facilities={v!.facilities}
            verified={v!.verified}
            onClick={() => nav(`/venue/${v!.id}`)}
            venueId={v!.id}
          />
        )) : (
          <div style={{ gridColumn: 'span 2' }}>
            <EmptyState text="还没有收藏的场馆" actionText="去发现场馆" onAction={() => nav('/venues')} />
          </div>
        )}
      </div>

      <div style={{ height: 70 }} />
    </div>
  )
}
