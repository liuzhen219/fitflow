import { useNavigate, useParams } from 'react-router-dom'
import { reviews, coaches } from '../data/mock'
import ReviewCard from '../components/ReviewCard'
import SectionHeader from '../components/SectionHeader'
import StarRating from '../components/StarRating'
import {
  SearchIcon, StarFilledIcon, ClockIcon, CommentIcon,
  ArchiveIcon, MapPinIcon,
} from '../components/Icons'

export default function UserProfile() {
  const { name } = useParams<{ name: string }>()
  const nav = useNavigate()
  const decodedName = decodeURIComponent(name || '')

  // Find user's reviews
  const userReviews = reviews.filter((r) => r.userName === decodedName)

  if (userReviews.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <SearchIcon size={48} color="#c0c0c0" />
        <p style={{ fontSize: 16, color: '#222', fontWeight: 500 }}>用户未找到</p>
        <div style={{ padding: '10px 28px', borderRadius: 24, background: '#E3617B', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }} onClick={() => nav(-1)}>返回</div>
      </div>
    )
  }

  const user = userReviews[0]
  const avgRating = userReviews.reduce((s, r) => s + r.rating, 0) / userReviews.length
  const reviewedCoaches = [...new Set(userReviews.map((r) => {
    const c = coaches.find((c2) => c2.courses.some((cr) => cr.name === r.courseLabel))
    return c?.name
  }))].filter(Boolean)

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #E3617B, #D44A65)',
        padding: '30px 16px 24px', position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* Back */}
        <div style={{ position: 'absolute', top: 14, left: 16 }}>
          <div onClick={() => nav(-1)} style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, color: '#fff', cursor: 'pointer', fontWeight: 400, lineHeight: '34px', flexShrink: 0,
          }}>‹</div>
        </div>

        {/* Avatar */}
        <div style={{
          width: 72, height: 72, borderRadius: '50%', overflow: 'hidden',
          border: '3px solid rgba(255,255,255,0.4)', marginBottom: 12,
        }}>
          {user.userAvatar ? (
            <img src={user.userAvatar} alt={user.userName}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: '#fff' }}>
              {user.userName.charAt(0)}
            </div>
          )}
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: 0 }}>{user.userName}</h1>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 24, marginTop: 14 }}>
          {[
            { value: userReviews.length, label: '评价' },
            { value: avgRating.toFixed(1), label: '平均评分' },
            { value: userReviews.reduce((s, r) => s + r.classCount, 0), label: '上课节数' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ borderRadius: '20px 20px 0 0', marginTop: -20, background: '#fff', position: 'relative', zIndex: 1, padding: '20px 16px 0' }}>
        {/* Review stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #f0f0f0' }}>
          <StarFilledIcon size={18} color="#E3617B" />
          <StarRating value={Math.round(avgRating)} size={14} />
          <span style={{ fontSize: 13, color: '#6a6a6a' }}>· 平均 {avgRating.toFixed(1)} 星</span>
        </div>

        {/* Reviewed coaches */}
        {reviewedCoaches.length > 0 && (
          <>
            <SectionHeader title="评价过的教练" icon={<StarFilledIcon size={16} color="#E3617B" />} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {reviewedCoaches.map((c) => (
                <span key={c} style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 500,
                  background: '#f7f7f7', color: '#222', border: '1px solid #ddd',
                }}>{c}</span>
              ))}
            </div>
          </>
        )}

        {/* Reviews */}
        <SectionHeader title={`${user.userName} 的评价 (${userReviews.length})`} icon={<CommentIcon size={16} color="#E3617B" />} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 40 }}>
          {userReviews.map((r) => (
            <ReviewCard key={r.id} {...r} />
          ))}
        </div>
      </div>
    </div>
  )
}
