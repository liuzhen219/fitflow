import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Popup } from 'antd-mobile'
import CoachCard from '../components/CoachCard'
import CourseCard from '../components/CourseCard'
import ReviewCard from '../components/ReviewCard'
import SectionHeader from '../components/SectionHeader'
import { venues, coaches, courses, reviews } from '../data/mock'
import {
  SearchIcon, BuildingIcon, LocationIcon, ClockIcon,
  StarFilledIcon, VerifiedIcon, CheckIcon,
  DumbbellIcon, SparkleIcon, PhotoIcon, MapPinIcon,
} from '../components/Icons'

export default function VenueProfile() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const venue = venues.find((v) => v.id === Number(id))

  if (!venue) {
    return (
      <div style={s.notFound}>
        <SearchIcon size={48} color="#c0c0c0" />
        <p style={s.notFoundText}>场馆未找到</p>
        <div style={s.backBtn} onClick={() => nav(-1)}>返回</div>
      </div>
    )
  }

  // Venue courses
  const venueCourses = courses.filter((c) => c.venueId === venue.id && !c.isHomeService)
  // Venue coaches
  const venueCoaches = coaches.filter((c) => venue.coachIds.includes(c.id))
  // Venue reviews — match via course names taught here
  const venueCourseNames = venueCourses.map((c) => c.title)
  const venueReviews = reviews.filter((r) => venueCourseNames.includes(r.courseLabel))

  // Gallery: video + photos
  const gallery = [
    { type: 'video' as const, src: 'https://www.w3schools.com/html/mov_bbb.mp4', poster: venue.heroImage },
    { type: 'image' as const, src: venue.heroImage },
    { type: 'image' as const, src: `https://picsum.photos/seed/venue-${venue.id}-1/400/300` },
    { type: 'image' as const, src: `https://picsum.photos/seed/venue-${venue.id}-2/400/300` },
    { type: 'image' as const, src: `https://picsum.photos/seed/venue-${venue.id}-3/400/300` },
  ]

  // Media viewer state
  const [viewerVisible, setViewerVisible] = useState(false)
  const [viewerIndex, setViewerIndex] = useState(0)

  return (
    <div style={s.page}>
      {/* ====== Hero ====== */}
      <div style={s.hero}>
        <img src={venue.heroImage || gallery[1].src} alt=""
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          style={s.heroImg} />
        <div style={s.heroOverlay} />
        {/* NavBar */}
        <div style={s.navBar}>
          <div style={s.navBack} onClick={() => nav(-1)}>‹</div>
          <div style={{ flex: 1 }} />
        </div>
        {/* Hero text */}
        <div style={s.heroContent}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <h1 style={s.heroTitle}>{venue.name}</h1>
            {venue.verified && <VerifiedIcon size={20} color="#fff" />}
          </div>
          <div style={s.heroMeta}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <StarFilledIcon size={14} color="#fff" /> {venue.rating.toFixed(1)}
            </span>
            <span>{venue.reviewCount} 条评价</span>
            <span>·</span>
            <span>{venue.district}</span>
          </div>
        </div>
      </div>

      {/* ====== Quick Stats ====== */}
      <div style={s.statsRow}>
        {[
          { icon: <StarFilledIcon size={16} color="#E3617B" />, value: venue.rating.toFixed(1), label: '评分' },
          { icon: <ClockIcon size={16} color="#E3617B" />, value: venue.openHours, label: '营业时间', compact: true },
          { icon: <LocationIcon size={16} color="#E3617B" />, value: venue.distance, label: '距离' },
          { icon: <MapPinIcon size={16} color="#E3617B" />, value: venue.district, label: '区域' },
        ].map((stat, i) => (
          <div key={i} style={s.statItem}>
            {stat.icon}
            <div style={stat.compact ? { fontSize: 12, fontWeight: 600, color: '#E3617B' } : { fontSize: 16, fontWeight: 600, color: '#E3617B' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: 11, color: '#929292' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ====== Description ====== */}
      <div style={s.section}>
        <p style={s.desc}>{venue.description}</p>
      </div>

      {/* ====== Image Gallery ====== */}
      <div style={s.section}>
        <SectionHeader title="场馆实拍" icon={<PhotoIcon size={16} color="#E3617B" />} />
        <div style={s.gallery}>
          {gallery.map((item, i) => (
            <div key={i} style={{ ...s.galleryItem, cursor: 'pointer', position: 'relative' }}
              onClick={() => { setViewerIndex(i); setViewerVisible(true) }}>
              <img src={item.type === 'video' ? item.poster : item.src}
                alt={`${venue.name} ${i + 1}`}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {item.type === 'video' && (
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.2)',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ color: '#E3617B', fontSize: 16, marginLeft: 2 }}>▶</span>
                  </div>
                </div>
              )}
              <span style={{
                position: 'absolute', bottom: 6, right: 6,
                padding: '2px 6px', borderRadius: 4,
                background: 'rgba(0,0,0,0.5)', color: '#fff',
                fontSize: 10, fontWeight: 500,
              }}>
                {item.type === 'video' ? '视频' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ====== Facilities ====== */}
      <div style={s.section}>
        <SectionHeader title={`设施配置 (${venue.facilities.length}项)`} icon={<DumbbellIcon size={16} color="#E3617B" />} />
        <div style={s.tagGrid}>
          {venue.facilities.map((f, i) => (
            <div key={i} style={s.tagItem}>
              <CheckIcon size={14} color="#16A34A" />
              <span>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ====== Services ====== */}
      <div style={s.section}>
        <SectionHeader title="配套服务" icon={<SparkleIcon size={16} color="#E3617B" />} />
        <div style={s.tagGrid}>
          {venue.services.map((svc, i) => (
            <div key={i} style={s.tagItem}>
              <CheckIcon size={14} color="#E3617B" />
              <span>{svc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ====== Available Courses ====== */}
      {venueCourses.length > 0 && (
        <div style={s.section}>
          <SectionHeader
            title={`可约课程 (${venueCourses.length}节)`}
            icon={<ClockIcon size={16} color="#E3617B" />}
          />
          <div>
            {venueCourses.map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                coachName={course.coachName}
              coachRating={course.coachRating}
                venueName={course.venueName}
                distance={course.distance}
                duration={course.duration}
                price={course.price}
                time={course.time}
                imageGradient={course.imageGradient}
                isHomeService={false}
                thumbnail={course.thumbnail}
                onClick={() => nav(`/course/${course.id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ====== Resident Coaches ====== */}
      {venueCoaches.length > 0 && (
        <div style={s.section}>
          <SectionHeader
            title={`驻场教练 (${venueCoaches.length}位)`}
            icon={<BuildingIcon size={16} color="#E3617B" />}
            onMore={() => nav('/homeservice')}
          />
          <div style={s.coachScroll}>
            {venueCoaches.map((c) => (
              <CoachCard
                key={c.id}
                name={c.name}
                title={c.title}
                certification={c.certifications[0]}
                rating={c.rating}
                classCount={c.reviewCount}
                price={c.basePrice}
                imageUrl={c.avatar}
                gradient={`linear-gradient(135deg, ${['#f5e0d8', '#e8d4c8', '#f0ddd4'][c.id % 3]}, ${['#e8d4c8', '#d4c0b0', '#e0ccc0'][c.id % 3]})`}
                onClick={() => nav(`/coach/${c.id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* ====== Address / Map ====== */}
      <div style={s.section}>
        <SectionHeader title="位置交通" icon={<MapPinIcon size={16} color="#E3617B" />} />
        <div style={s.mapCard}>
          <div style={s.mapPlaceholder}>
            <MapPinIcon size={32} color="#E3617B" />
            <p style={{ fontSize: 13, color: '#6a6a6a', margin: '8px 0 0' }}>{venue.address}</p>
            <p style={{ fontSize: 12, color: '#929292', margin: '4px 0 0' }}>
              {venue.district} · 距你 {venue.distance}
            </p>
          </div>
        </div>
      </div>

      {/* ====== Reviews ====== */}
      {venueReviews.length > 0 && (
        <div style={s.section}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <SectionHeader
              title={`学员评价 (${venueReviews.length}条)`}
              icon={<StarFilledIcon size={16} color="#E3617B" />}
            />
            {venueCoaches.length > 0 && (
              <span
                onClick={() => nav(`/review/coach/${venueCoaches[0].id}`)}
                style={{
                  padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                  background: '#E3617B', color: '#fff', cursor: 'pointer',
                  whiteSpace: 'nowrap', flexShrink: 0, userSelect: 'none',
                  marginTop: -1,
                }}
              >✎ 写评价</span>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {venueReviews.map((r) => (
              <ReviewCard key={r.id} {...r} />
            ))}
          </div>
        </div>
      )}

      {/* ====== Photo Viewer ====== */}
      <Popup
        visible={viewerVisible}
        onClose={() => setViewerVisible(false)}
        onMaskClick={() => setViewerVisible(false)}
        bodyStyle={{ background: '#000', minHeight: '100vh' }}
      >
        <div style={{ position: 'relative', width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Close */}
          <div onClick={() => setViewerVisible(false)} style={{
            position: 'absolute', top: 16, right: 16, zIndex: 10,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(0,0,0,0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 16, cursor: 'pointer',
          }}>✕</div>

          {/* Counter */}
          <div style={{
            position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
            zIndex: 10, color: '#fff', fontSize: 13, fontWeight: 500,
          }}>
            {gallery[viewerIndex].type === 'video' ? '视频' : `${viewerIndex + 1} / ${gallery.length - 1}`}
          </div>

          {/* Prev */}
          {viewerIndex > 0 && (
            <div onClick={() => setViewerIndex(viewerIndex - 1)} style={{
              position: 'absolute', left: 12, zIndex: 10,
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 20, cursor: 'pointer',
            }}>‹</div>
          )}

          {/* Video or Image */}
          {gallery[viewerIndex].type === 'video' ? (
            <video src={gallery[viewerIndex].src} controls autoPlay
              poster={gallery[viewerIndex].poster}
              style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: 8 }} />
          ) : (
            <img src={gallery[viewerIndex].src} alt=""
              style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
          )}

          {/* Next */}
          {viewerIndex < gallery.length - 1 && (
            <div onClick={() => setViewerIndex(viewerIndex + 1)} style={{
              position: 'absolute', right: 12, zIndex: 10,
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 20, cursor: 'pointer',
            }}>›</div>
          )}
        </div>
      </Popup>

      {/* Spacer */}
      <div style={{ height: 100 }} />
    </div>
  )
}

/* ====== Styles ====== */
const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#fff' },
  notFound: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    justifyContent: 'center', minHeight: '100vh', gap: 12, padding: 20,
  },
  notFoundText: { fontSize: 16, color: '#222', fontWeight: 500, margin: 0 },
  backBtn: {
    marginTop: 8, padding: '10px 28px', borderRadius: 24, background: '#E3617B',
    color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
  },

  // Hero
  hero: {
    height: 280, position: 'relative', overflow: 'hidden',
    background: 'linear-gradient(135deg, #E3617B, #444)',
    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
  },
  heroImg: {
    position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
  },
  heroOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 70%, rgba(0,0,0,0.5) 100%)',
  },
  navBar: { display: 'flex', alignItems: 'center', padding: '12px 16px', position: 'relative', zIndex: 2 },
  navBack: {
    width: 34, height: 34, borderRadius: '50%',
    background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 20, color: '#fff', cursor: 'pointer', fontWeight: 400, lineHeight: '34px', flexShrink: 0,
  },
  heroContent: { padding: '16px', zIndex: 2 },
  heroTitle: { fontSize: 24, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.18 },
  heroMeta: {
    display: 'flex', alignItems: 'center', gap: 8, marginTop: 6,
    fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.9)',
  },

  // Stats
  statsRow: {
    display: 'flex', justifyContent: 'space-around',
    padding: '16px 12px', margin: '0 12px',
    background: '#fff', borderRadius: 14, border: '1px solid #ddd',
    position: 'relative', zIndex: 2, marginTop: -20,
  },
  statItem: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
  },

  // Sections
  section: { padding: '0 16px', marginTop: 24 },
  desc: { fontSize: 14, color: '#222', lineHeight: 1.6, margin: 0 },

  // Gallery
  gallery: {
    display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4,
  },
  galleryItem: {
    width: 160, height: 120, borderRadius: 12, overflow: 'hidden',
    flexShrink: 0, background: '#f0f0f0',
  },

  // Tag grid
  tagGrid: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  tagItem: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '8px 14px', borderRadius: 8, background: '#f7f7f7',
    fontSize: 13, fontWeight: 500, color: '#222',
  },

  // Coaches
  coachScroll: {
    display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 4,
  },

  // Map
  mapCard: {
    borderRadius: 14, border: '1px solid #ddd', overflow: 'hidden',
    height: 140, background: '#fafafa',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  mapPlaceholder: {
    textAlign: 'center', padding: 20,
  },
}
