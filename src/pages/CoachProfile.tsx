import { useNavigate, useParams } from 'react-router-dom'
import StatsRow from '../components/StatsRow'
import CertBadge from '../components/CertBadge'
import ReviewCard from '../components/ReviewCard'
import SectionHeader from '../components/SectionHeader'
import StarRating from '../components/StarRating'
import { coaches, reviews } from '../data/mock'
import {
  SearchIcon,
  PlayIcon,
  ShieldIcon,
  VerifiedIcon,
  SparkleIcon,
  CommentIcon,
  OrdersIcon,
  BuildingIcon,
  StarFilledIcon,
  ClockIcon,
  LocationIcon,
  PhotoIcon,
  HomeServiceIcon,
} from '../components/Icons'

export default function CoachProfile() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const coach = coaches.find((c) => c.id === Number(id))

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
      {/* Hero */}
      <div
        style={{
          height: 280,
          backgroundImage: `url(${coach.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          background: coach.heroImage
            ? undefined
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

        {/* Bottom right badge */}
        <div
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
          }}
        >
          {coach.hasVideo ? (
            <><PlayIcon size={12} color="#fff" /> 观看介绍视频 2:30</>
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
              {coach.partnerVenues.map((venue) => (
                <div
                  key={venue.id}
                  onClick={() => nav(`/venue/${venue.id}`)}
                  style={{
                    minWidth: 110,
                    background: '#fff',
                    borderRadius: 14,
                    border: '1px solid #ddd',
                    padding: '16px 14px',
                    cursor: 'pointer',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <BuildingIcon size={24} color="#E3617B" />
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: '#222',
                      margin: 0,
                      lineHeight: 1.25,
                      textAlign: 'center',
                    }}
                  >
                    {venue.name}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: '#6a6a6a',
                      margin: 0,
                      lineHeight: 1.25,
                    }}
                  >
                    {venue.district} · {venue.distance}
                  </p>
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
