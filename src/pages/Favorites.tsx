import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { coaches, courses, venues } from '../data/mock'
import CourseCard from '../components/CourseCard'
import CoachCard from '../components/CoachCard'
import VenueCard from '../components/VenueCard'
import EmptyState from '../components/EmptyState'
import { HeartFilledIcon } from '../components/Icons'

const FAVORITES_KEY = 'fitflow_favorites'

type TabKey = 'course' | 'coach' | 'venue'

interface FavItem {
  type: string
  id: number
}

function getFavorites(): FavItem[] {
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
  } catch { return [] }
}

export default function Favorites() {
  const nav = useNavigate()
  const [activeTab, setActiveTab] = useState<TabKey>('course')
  const [favorites, setFavorites] = useState<FavItem[]>(getFavorites)

  const refresh = () => setFavorites(getFavorites())

  const favCourses = favorites
    .filter(f => f.type === 'course')
    .map(f => courses.find(c => c.id === f.id))
    .filter(Boolean)

  const favCoaches = favorites
    .filter(f => f.type === 'coach')
    .map(f => coaches.find(c => c.id === f.id))
    .filter(Boolean)

  const favVenues = favorites
    .filter(f => f.type === 'venue')
    .map(f => venues.find(v => v.id === f.id))
    .filter(Boolean)

  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: 'course', label: '课程', count: favCourses.length },
    { key: 'coach', label: '教练', count: favCoaches.length },
    { key: 'venue', label: '场馆', count: favVenues.length },
  ]

  const isEmpty = favorites.length === 0

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <div
        style={{
          background: '#fff',
          padding: '14px 16px',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <span
          onClick={() => nav(-1)}
          style={{ fontSize: 18, cursor: 'pointer', lineHeight: 1, userSelect: 'none' }}
        >
          {'‹'}
        </span>
        <span style={{ fontSize: 18, fontWeight: 600, color: '#222', display: 'flex', alignItems: 'center', gap: 6 }}>
          <HeartFilledIcon size={18} color="var(--c-accent)" />
          我的收藏
        </span>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #ddd',
          background: '#fff',
          position: 'sticky',
          top: 49,
          zIndex: 9,
        }}
      >
        {tabs.map(tab => {
          const isActive = tab.key === activeTab
          return (
            <div
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1,
                textAlign: 'center',
                padding: '12px 0',
                fontSize: 14,
                fontWeight: 600,
                color: isActive ? '#222' : '#6a6a6a',
                borderBottom: isActive ? '2px solid var(--c-accent)' : '2px solid transparent',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'all 0.15s',
              }}
            >
              {tab.label} ({tab.count})
            </div>
          )
        })}
      </div>

      {/* Content */}
      <div style={{ padding: '0 0 70px' }}>
        {isEmpty && (
          <EmptyState
            text="还没有收藏任何内容"
            actionText="去发现"
            onAction={() => { nav('/home') }}
          />
        )}

        {!isEmpty && activeTab === 'course' && (
          <div style={{ padding: '0 16px' }}>
            {favCourses.length === 0 ? (
              <EmptyState text="暂无收藏的课程" actionText="去看看" onAction={() => { nav('/home') }} />
            ) : (
              favCourses.map(c => (
                <CourseCard
                  key={c!.id}
                  title={c!.title}
                  coachName={c!.coachName}
                  coachRating={c!.coachRating}
                  venueName={c!.venueName}
                  distance={c!.distance}
                  duration={c!.duration}
                  price={c!.price}
                  time={c!.time}
                  imageGradient={c!.imageGradient}
                  thumbnail={c!.thumbnail}
                  isHomeService={c!.isHomeService}
                  onClick={() => { nav(`/course/${c!.id}`); refresh() }}
                  courseId={c!.id}
                />
              ))
            )}
          </div>
        )}

        {!isEmpty && activeTab === 'coach' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
            padding: '16px',
          }}>
            {favCoaches.length === 0 ? (
              <div style={{ gridColumn: '1 / -1' }}>
                <EmptyState text="暂无收藏的教练" actionText="去看看" onAction={() => { nav('/home') }} />
              </div>
            ) : (
              favCoaches.map(c => (
                <CoachCard
                  key={c!.id}
                  name={c!.name}
                  title={c!.title}
                  certification={c!.certifications[0]}
                  rating={c!.rating}
                  classCount={c!.reviewCount}
                  price={c!.basePrice}
                  imageUrl={c!.avatar}
                  gradient={`linear-gradient(135deg, ${['#f5e0d8', '#e8d4c8', '#f0ddd4'][c!.id % 3]}, ${['#e8d4c8', '#d4c0b0', '#e0ccc0'][c!.id % 3]})`}
                  onClick={() => { nav(`/coach/${c!.id}`); refresh() }}
                  coachId={c!.id}
                />
              ))
            )}
          </div>
        )}

        {!isEmpty && activeTab === 'venue' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
            padding: '16px',
          }}>
            {favVenues.length === 0 ? (
              <div style={{ gridColumn: '1 / -1' }}>
                <EmptyState text="暂无收藏的场馆" actionText="去看看" onAction={() => { nav('/home') }} />
              </div>
            ) : (
              favVenues.map(v => (
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
                  onClick={() => { nav(`/venue/${v!.id}`); refresh() }}
                  venueId={v!.id}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
