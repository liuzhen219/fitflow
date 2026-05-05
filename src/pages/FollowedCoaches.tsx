import { useNavigate } from 'react-router-dom'
import CoachCard from '../components/CoachCard'
import EmptyState from '../components/EmptyState'
import { coaches, userProfile } from '../data/mock'

// Mock: user's followed coaches (first N from the coaches array)
const followedCoaches = coaches.slice(0, userProfile.stats.followedCoaches)

export default function FollowedCoaches() {
  const nav = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
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
          关注教练 ({followedCoaches.length})
        </span>
      </div>

      {/* Coach grid */}
      <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {followedCoaches.length > 0 ? followedCoaches.map((c) => (
          <CoachCard
            key={c.id}
            name={c.name}
            title={c.title}
            certification={c.certifications[0]}
            rating={c.rating}
            classCount={c.reviewCount}
            price={c.basePrice}
            imageUrl={c.avatar}
            gradient={`linear-gradient(135deg, ${
              ['#f5e0d8', '#e8d4c8', '#f0ddd4'][c.id % 3]
            }, ${
              ['#e8d4c8', '#d4c0b0', '#e0ccc0'][c.id % 3]
            })`}
            onClick={() => nav(`/coach/${c.id}`)}
          />
        )) : (
          <div style={{ gridColumn: 'span 2' }}>
            <EmptyState text="还没有关注的教练" actionText="去发现教练" onAction={() => nav('/homeservice')} />
          </div>
        )}
      </div>

      <div style={{ height: 70 }} />
    </div>
  )
}
