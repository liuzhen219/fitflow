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
  'https://images.unsplash.com/photo-1518611012118-6960729ce99a?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1575057913256-f0c15f37d64e?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=600&fit=crop',
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
          background: coach.heroImage
            ? `url(${coach.heroImage}) center/cover no-repeat`
            : 'linear-gradient(135deg, #E3617B, #D44A65)',
        }}
      >
        {/* NavBar overlay */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            paddingTop: 16,
          }}
        >
          <div
            onClick={() => nav(-1)}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            ←
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
                    background: venue.heroImage
                      ? `url(${venue.heroImage}) center/cover no-repeat`
                      : 'linear-gradient(135deg, #f5e0d8, #e8d4c8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
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
        <SectionHeader
          title={`学员评价 (${coachReviews.length})`}
          moreText="查看全部"
          icon={<CommentIcon size={16} color="#E3617B" />}
          onMore={() => {}}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {coachReviews.map((review) => (
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
          ))}
        </div>

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
              background: coach.heroImage
                ? `url(${coach.heroImage}) center/cover no-repeat`
                : 'linear-gradient(135deg, #E3617B, #D44A65)',
            }}>
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
                    background: `url(${photo}) center/cover no-repeat`,
                    ...(i === 0 ? { gridColumn: 'span 2', gridRow: 'span 2', aspectRatio: 'auto' } : {}),
                  }}
                />
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
