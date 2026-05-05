import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Popup } from 'antd-mobile'
import StatsRow from '../components/StatsRow'
import CertBadge from '../components/CertBadge'
import ReviewCard from '../components/ReviewCard'
import SectionHeader from '../components/SectionHeader'
import StarRating from '../components/StarRating'
import { coaches, reviews, venues as allVenues } from '../data/mock'
import {
  SearchIcon,
  PlayIcon,
  ShieldIcon,
  VerifiedIcon,
  SparkleIcon,
  CommentIcon,
  OrdersIcon,
  BuildingIcon,
  ClockIcon,
  LocationIcon,
  PhotoIcon,
  HomeServiceIcon,
  CloseIcon,
} from '../components/Icons'

// Sample teaching photos for the gallery
const galleryPhotos = [
  'https://picsum.photos/seed/CoachProfile-0/600/600',
  'https://picsum.photos/seed/CoachProfile-1/600/600',
  'https://picsum.photos/seed/CoachProfile-2/600/600',
  'https://picsum.photos/seed/CoachProfile-3/600/600',
  'https://picsum.photos/seed/CoachProfile-4/600/600',
  'https://picsum.photos/seed/CoachProfile-5/600/600',
]

export default function CoachProfile() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const coach = coaches.find((c) => c.id === Number(id))
  const [mediaVisible, setMediaVisible] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  // Look up venue details for partner venues
  const partnerVenuesWithImages = coach?.partnerVenues
    .map(pv => {
      const full = allVenues.find(v => v.id === pv.id)
      return { ...pv, heroImage: full?.heroImage }
    })
    .filter(Boolean) || []

  if (!coach) {
    return (
      <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 20 }}>
        <SearchIcon size={48} color="#c0c0c0" />
        <p style={{ fontSize: 16, color: '#222', fontWeight: 500, margin: 0 }}>教练未找到</p>
        <div
          style={{ marginTop: 8, padding: '10px 28px', borderRadius: 8, background: '#E3617B', color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
          onClick={() => nav(-1)}
        >
          返回
        </div>
      </div>
    )
  }

  // Find reviews whose courseLabel matches one of this coach's courses
  const coachCourseNames = coach.courses.map((c) => c.name)
  const coachReviews = reviews.filter((r) =>
    coachCourseNames.includes(r.courseLabel)
  )

  // Rating distribution
  const ratingDist = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: coachReviews.filter((r) => r.rating === star).length,
    pct: coachReviews.length > 0
      ? Math.round((coachReviews.filter((r) => r.rating === star).length / coachReviews.length) * 100)
      : 0,
  }))

  // Review state
  const [reviewFilter, setReviewFilter] = useState<number | null>(null)
  const [showAllReviews, setShowAllReviews] = useState(false)
  const filteredReviews = reviewFilter
    ? coachReviews.filter((r) => r.rating === reviewFilter)
    : coachReviews
  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews.slice(0, 3)

  const statsItems = [
    { value: `${coach.totalClasses.toLocaleString()}+`, label: '累计课时' },
    { value: coach.totalStudents.toString(), label: '服务学员' },
    { value: `${coach.retentionRate}%`, label: '复购率' },
    { value: `${coach.years}年`, label: '教龄' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Hero — full-bleed image with gradient fallback */}
      <div
        style={{
          height: 280,
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #E3617B, #D44A65)',
        }}
      >
        {coach.heroImage && (
          <img
            src={coach.heroImage}
            alt=""
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
        {/* Dark overlay for readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 70%, rgba(0,0,0,0.5) 100%)',
        }} />
        {/* NavBar overlay */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            paddingTop: 16,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <div
            onClick={() => nav(-1)}
            style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: '#fff', cursor: 'pointer',
              fontWeight: 500, lineHeight: 1, flexShrink: 0,
            }}
          >
            ‹
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>
            {coach.name}
          </div>
          <div style={{ width: 32 }} />
        </div>

        {/* Bottom right badge — tappable */}
        <div
          onClick={() => setMediaVisible(true)}
          style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '6px 14px',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.25)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          {coach.hasVideo ? (
            <><PlayIcon size={12} color="#fff" /> 观看介绍视频</>
          ) : (
            <><PhotoIcon size={12} color="#fff" /> 查看教学照片</>
          )}
        </div>
      </div>

      {/* Info Card */}
      <div
        style={{
          background: '#fff',
          borderRadius: '20px 20px 0 0',
          marginTop: -16,
          padding: '20px 16px 0',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Name + Title + Rating */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                flexWrap: 'wrap',
              }}
            >
              <h1
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  color: '#222',
                  margin: 0,
                  lineHeight: 1.18,
                }}
              >
                {coach.name}
              </h1>
              <span
                style={{
                  fontSize: 12,
                  color: '#E3617B',
                  background: 'rgba(227,97,123,0.08)',
                  padding: '4px 10px',
                  borderRadius: 4,
                  fontWeight: 500,
                }}
              >
                {coach.title}
              </span>
            </div>
            <p
              style={{
                fontSize: 14,
                color: '#6a6a6a',
                margin: '4px 0 0',
                lineHeight: 1.29,
              }}
            >
              教龄 {coach.years} 年
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <span
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  color: '#E3617B',
                  lineHeight: 1,
                }}
              >
                {coach.rating.toFixed(1)}
              </span>
              <StarRating value={coach.rating} size={14} />
            </div>
            <p
              style={{
                fontSize: 12,
                color: '#6a6a6a',
                margin: '2px 0 0',
                lineHeight: 1.29,
              }}
            >
              {coach.reviewCount} 条评价
            </p>
          </div>
        </div>

        <div style={{ height: 16 }} />

        {/* StatsRow */}
        <StatsRow items={statsItems} />

        <div style={{ height: 20 }} />

        {/* Certifications */}
        <div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#222',
              margin: '0 0 10px',
              lineHeight: 1.25,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <ShieldIcon size={16} color="#E3617B" />
            资质认证
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {coach.certifications.map((cert, idx) => (
              <CertBadge key={idx} label={cert} />
            ))}
            <CertBadge label="平台核验" verified />
          </div>
        </div>

        <div style={{ height: 18 }} />

        {/* Specialties */}
        <div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#222',
              margin: '0 0 10px',
              lineHeight: 1.25,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <SparkleIcon size={16} color="#E3617B" />
            擅长领域
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {coach.specialties.slice(0, 3).map((spec, idx) => (
              <span
                key={idx}
                style={{
                  display: 'inline-block',
                  padding: '6px 14px',
                  borderRadius: 32,
                  fontSize: 13,
                  background: 'rgba(227,97,123,0.08)',
                  color: '#E3617B',
                  fontWeight: 500,
                }}
              >
                {spec}
              </span>
            ))}
            {coach.specialties.slice(3).map((spec, idx) => (
              <span
                key={idx + 3}
                style={{
                  display: 'inline-block',
                  padding: '6px 14px',
                  borderRadius: 32,
                  fontSize: 13,
                  background: '#f7f7f7',
                  color: '#6a6a6a',
                  fontWeight: 500,
                }}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div style={{ height: 18 }} />

        {/* Bio */}
        <div>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#222',
              margin: '0 0 10px',
              lineHeight: 1.25,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <CommentIcon size={16} color="#E3617B" />
            个人简介
          </p>
          <p
            style={{
              fontSize: 14,
              color: '#222',
              lineHeight: 1.43,
              margin: 0,
            }}
          >
            {coach.bio}
          </p>
        </div>

        <div style={{ height: 24 }} />

        {/* Courses */}
        <SectionHeader
          title={`可约课程 (${coach.courses.length})`}
          icon={<OrdersIcon size={16} color="#E3617B" />}
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {coach.courses.map((course) => (
            <div
              key={course.id}
              onClick={() => nav(`/course/${course.id}`)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid #ddd',
                padding: '14px 0',
                cursor: 'pointer',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: '#222',
                    margin: 0,
                    lineHeight: 1.25,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  {course.isHomeService ? (
                    <HomeServiceIcon size={14} color="#E3617B" />
                  ) : (
                    <LocationIcon size={14} color="#E3617B" />
                  )}
                  {course.name}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: '#6a6a6a',
                    margin: '4px 0 0',
                    lineHeight: 1.29,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <ClockIcon size={12} color="#6a6a6a" />
                  {' '}{course.duration}分钟
                  {course.venue && ` · ${course.venue}`}
                  {course.isHomeService && ' · 上门服务'}
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: 2,
                  flexShrink: 0,
                  marginLeft: 12,
                }}
              >
                <span
                  className="num"
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#222',
                    lineHeight: 1,
                  }}
                >
                  ¥{course.price}
                </span>
                <span style={{ fontSize: 12, color: '#6a6a6a' }}>/节</span>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Venues */}
        {coach.partnerVenues.length > 0 && (
          <>
            <div style={{ height: 24 }} />
            <SectionHeader
              title={`合作场馆 (${coach.partnerVenues.length}家)`}
              icon={<BuildingIcon size={16} color="#E3617B" />}
            />
            <div
              style={{
                display: 'flex',
                gap: 12,
                overflowX: 'auto',
                paddingBottom: 4,
              }}
            >
              {partnerVenuesWithImages.map((venue) => (
                <div
                  key={venue.id}
                  onClick={() => nav(`/venue/${venue.id}`)}
                  style={{
                    minWidth: 140,
                    background: '#fff',
                    borderRadius: 14,
                    border: '1px solid #ddd',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  {/* Venue thumbnail */}
                  <div style={{
                    width: '100%', height: 90,
                    position: 'relative', overflow: 'hidden',
                    background: 'linear-gradient(135deg, #f5e0d8, #e8d4c8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {venue.heroImage && (
                      <img
                        src={venue.heroImage}
                        alt=""
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                    {!venue.heroImage && <BuildingIcon size={28} color="#fff" />}
                  </div>
                  {/* Venue info */}
                  <div style={{ padding: '10px 12px' }}>
                    <p style={{
                      fontSize: 13, fontWeight: 600, color: '#222',
                      margin: 0, lineHeight: 1.25,
                    }}>
                      {venue.name}
                    </p>
                    <p style={{
                      fontSize: 11, color: '#6a6a6a', margin: '2px 0 0', lineHeight: 1.25,
                    }}>
                      {venue.district} · {venue.distance}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Reviews */}
        <div style={{ height: 24 }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <SectionHeader
            title={`学员评价 (${coachReviews.length})`}
            moreText={showAllReviews ? '收起' : '查看全部'}
            icon={<CommentIcon size={16} color="#E3617B" />}
            onMore={() => setShowAllReviews(!showAllReviews)}
          />
          <span
            onClick={() => nav(`/review/${coach.id}`)}
            style={{
              padding: '8px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600,
              background: '#E3617B', color: '#fff', cursor: 'pointer',
              whiteSpace: 'nowrap', flexShrink: 0, userSelect: 'none',
              marginTop: -1,
            }}
          >✎ 写评价</span>
        </div>

        {/* Rating summary bars */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 16, padding: '14px 0', borderBottom: '1px solid #f0f0f0' }}>
          {/* Average score big number */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 56 }}>
            <span style={{ fontSize: 32, fontWeight: 700, color: '#E3617B', lineHeight: 1 }}>{coach.rating.toFixed(1)}</span>
            <span style={{ fontSize: 11, color: '#6a6a6a', marginTop: 2 }}>{coachReviews.length}条评价</span>
          </div>
          {/* Bar chart */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3, justifyContent: 'center' }}>
            {ratingDist.map((d) => (
              <div key={d.star} onClick={() => setReviewFilter(reviewFilter === d.star ? null : d.star)}
                style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', userSelect: 'none' }}>
                <span style={{ fontSize: 11, color: reviewFilter === d.star ? '#E3617B' : '#6a6a6a', fontWeight: reviewFilter === d.star ? 600 : 500, width: 22, textAlign: 'right' }}>{d.star}星</span>
                <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#f0f0f0', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 3, background: reviewFilter === d.star ? '#E3617B' : '#ddd', width: `${d.pct}%`, transition: 'width 0.3s ease, background 0.15s' }} />
                </div>
                <span style={{ fontSize: 11, color: reviewFilter === d.star ? '#E3617B' : '#929292', fontWeight: reviewFilter === d.star ? 600 : 500, width: 20 }}>{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filter active indicator */}
        {reviewFilter && (
          <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: '#E3617B', fontWeight: 500 }}>筛选：{reviewFilter}星</span>
            <span onClick={() => setReviewFilter(null)} style={{ fontSize: 11, color: '#6a6a6a', cursor: 'pointer' }}>✕ 清除</span>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {displayedReviews.length > 0 ? displayedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              userName={review.userName}
              userAvatar={review.userAvatar}
              rating={review.rating}
              tags={review.tags}
              content={review.content}
              images={review.images}
              courseLabel={review.courseLabel}
              classCount={review.classCount}
            />
          )) : (
            <p style={{ fontSize: 13, color: '#929292', textAlign: 'center', padding: 20 }}>暂无{reviewFilter}星评价</p>
          )}
        </div>

        {/* Show more / collapse indicator */}
        {filteredReviews.length > 3 && !reviewFilter && (
          <div onClick={() => setShowAllReviews(!showAllReviews)} style={{
            textAlign: 'center', padding: '12px 0', fontSize: 13, fontWeight: 500,
            color: '#E3617B', cursor: 'pointer',
          }}>
            {showAllReviews ? '收起 ▲' : `查看全部 ${filteredReviews.length} 条评价 ▼`}
          </div>
        )}

        {/* Bottom spacer for fixed CTA */}
        <div style={{ height: 80 }} />
      </div>

      {/* ======== Media Popup ======== */}
      <Popup
        visible={mediaVisible}
        onClose={() => { setMediaVisible(false); setSelectedPhoto(null) }}
        onMaskClick={() => { setMediaVisible(false); setSelectedPhoto(null) }}
        bodyStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          maxHeight: '80vh',
          minHeight: '50vh',
          background: '#fff',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 16px', borderBottom: '1px solid #ddd',
        }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 600, color: '#222' }}>
              {coach.hasVideo ? '介绍视频' : '教学照片'}
            </div>
            <div style={{ fontSize: 13, color: '#6a6a6a', marginTop: 2 }}>
              {coach.hasVideo ? `${coach.name} 的自我介绍与教学展示` : `${coach.name} 的教学瞬间`}
            </div>
          </div>
          <div
            onClick={() => { setMediaVisible(false); setSelectedPhoto(null) }}
            style={{
              width: 32, height: 32, borderRadius: '50%', background: '#f7f7f7',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', flexShrink: 0,
            }}
          >
            <CloseIcon size={16} color="#6a6a6a" />
          </div>
        </div>

        {/* Content */}
        {selectedPhoto ? (
          /* Full-screen photo view */
          <div style={{
            position: 'relative', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: '#000', minHeight: 400,
          }}>
            <img src={selectedPhoto} alt="教学照片"
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }} />
            <div
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: 'absolute', top: 12, right: 12,
                width: 36, height: 36, borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <CloseIcon size={18} color="#fff" />
            </div>
          </div>
        ) : coach.hasVideo ? (
          /* Video placeholder */
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '60px 20px', gap: 16,
          }}>
            {/* Video player placeholder */}
            <div style={{
              width: '100%', maxWidth: 340, height: 220,
              borderRadius: 16, position: 'relative', overflow: 'hidden',
              background: 'linear-gradient(135deg, #E3617B, #D44A65)',
            }}>
              {coach.heroImage && (
                <img
                  src={coach.heroImage}
                  alt=""
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
              )}
              {/* Dark overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'rgba(0,0,0,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {/* Play button */}
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                }}>
                  <PlayIcon size={28} color="#E3617B" />
                </div>
              </div>
              {/* Duration badge */}
              <div style={{
                position: 'absolute', bottom: 10, right: 10,
                padding: '4px 10px', borderRadius: 6,
                background: 'rgba(0,0,0,0.6)', color: '#fff',
                fontSize: 11, fontWeight: 500,
              }}>
                2:30
              </div>
            </div>
            <p style={{ fontSize: 14, color: '#6a6a6a', textAlign: 'center', lineHeight: 1.5, margin: 0 }}>
              了解{coach.name}的教学风格与训练理念<br />更直观地感受课程氛围
            </p>
          </div>
        ) : (
          /* Photo gallery grid */
          <div style={{ padding: '16px', overflowY: 'auto' }}>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
            }}>
              {galleryPhotos.map((photo, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedPhoto(photo)}
                  style={{
                    aspectRatio: '1',
                    borderRadius: 10,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                    background: 'linear-gradient(135deg, #f5e0d8, #e8d4c8)',
                    ...(i === 0 ? { gridColumn: 'span 2', gridRow: 'span 2', aspectRatio: 'auto' } : {}),
                  }}
                >
                  <img
                    src={photo}
                    alt=""
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
            <p style={{
              fontSize: 13, color: '#6a6a6a', textAlign: 'center',
              marginTop: 16, lineHeight: 1.5,
            }}>
              点击照片查看大图
            </p>
          </div>
        )}
      </Popup>

      {/* Fixed Bottom CTA */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#fff',
          padding: '12px 16px',
          paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          borderTop: '1px solid #ddd',
          zIndex: 10,
        }}
      >
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: 13,
              color: '#6a6a6a',
              margin: 0,
              lineHeight: 1.29,
            }}
          >
            参考价格 ¥{coach.basePrice}-{coach.homeServicePrice} /节
          </p>
        </div>
        <div
          onClick={() => {
            if (coach.courses.length > 0) {
              nav(`/course/${coach.courses[0].id}`)
            }
          }}
          style={{
            padding: '14px 32px',
            borderRadius: 8,
            background: '#E3617B',
            color: '#fff',
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          立即预约
        </div>
      </div>
    </div>
  )
}
