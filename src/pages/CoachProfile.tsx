import { useNavigate, useParams } from 'react-router-dom'
import StatsRow from '../components/StatsRow'
import CertBadge from '../components/CertBadge'
import ReviewCard from '../components/ReviewCard'
import SectionHeader from '../components/SectionHeader'
import StarRating from '../components/StarRating'
import { coaches, reviews } from '../data/mock'

export default function CoachProfile() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const coach = coaches.find((c) => c.id === Number(id))

  if (!coach) {
    return (
      <div style={s.page}>
        <div style={s.notFound}>
          <div style={s.notFoundEmoji}>🔍</div>
          <p style={s.notFoundText}>教练未找到</p>
          <div style={s.backBtn} onClick={() => nav(-1)}>
            返回
          </div>
        </div>
      </div>
    )
  }

  // Find reviews whose courseLabel matches one of this coach's courses
  const coachCourseNames = coach.courses.map((c) => c.name)
  const coachReviews = reviews.filter((r) => coachCourseNames.includes(r.courseLabel))

  const statsItems = [
    { value: `${coach.totalClasses.toLocaleString()}+`, label: '累计课时' },
    { value: coach.totalStudents.toString(), label: '服务学员' },
    { value: `${coach.retentionRate}%`, label: '复购率' },
    { value: `${coach.years}年`, label: '教龄' },
  ]

  return (
    <div style={s.page}>
      {/* Hero */}
      <div
        style={{
          ...s.hero,
          backgroundImage: `url(${coach.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* NavBar */}
        <div style={s.navBar}>
          <div style={s.navBack} onClick={() => nav(-1)}>
            ←
          </div>
          <div style={s.navTitle}>{coach.name}</div>
          <div style={s.navPlaceholder} />
        </div>

        {/* Center (image background, no emoji) */}
        <div style={s.heroCenter} />

        {/* Bottom right badge */}
        <div style={s.heroBadgeRow}>
          <div style={s.heroBadge}>
            {coach.hasVideo ? '▶  观看介绍视频 2:30' : '📷  查看教学照片'}
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div style={s.card}>
        {/* Name + Title + Rating */}
        <div style={s.headerRow}>
          <div style={s.headerLeft}>
            <div style={s.nameRow}>
              <h1 style={s.nameText}>{coach.name}</h1>
              <span style={s.titleTag}>{coach.title}</span>
            </div>
            <p style={s.yearsText}>教龄 {coach.years} 年</p>
          </div>
          <div style={s.headerRight}>
            <div style={s.ratingRow}>
              <span style={s.ratingNum}>{coach.rating.toFixed(1)}</span>
              <StarRating value={coach.rating} size={14} />
            </div>
            <p style={s.reviewCount}>{coach.reviewCount} 条评价</p>
          </div>
        </div>

        <div style={{ height: 14 }} />

        {/* StatsRow */}
        <StatsRow items={statsItems} />

        <div style={{ height: 20 }} />

        {/* Certifications */}
        <div style={s.sectionBlock}>
          <p style={s.sectionLabel}>🏅 资质认证</p>
          <div style={s.certRow}>
            {coach.certifications.map((cert, idx) => (
              <CertBadge key={idx} label={cert} />
            ))}
            <CertBadge label="平台核验" verified />
          </div>
        </div>

        <div style={{ height: 18 }} />

        {/* Specialties */}
        <div style={s.sectionBlock}>
          <p style={s.sectionLabel}>✨ 擅长领域</p>
          <div style={s.specRow}>
            {coach.specialties.slice(0, 3).map((spec, idx) => (
              <span key={idx} style={s.specHighlighted}>
                {spec}
              </span>
            ))}
            {coach.specialties.slice(3).map((spec, idx) => (
              <span key={idx + 3} style={s.specNormal}>
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div style={{ height: 18 }} />

        {/* Bio */}
        <div style={s.sectionBlock}>
          <p style={s.sectionLabel}>💬 个人简介</p>
          <p style={s.bioText}>{coach.bio}</p>
        </div>

        <div style={{ height: 20 }} />

        {/* Courses */}
        <SectionHeader title={`📋 可约课程 (${coach.courses.length})`} />
        <div style={s.courseList}>
          {coach.courses.map((course) => (
            <div
              key={course.id}
              style={s.courseItem}
              onClick={() => nav(`/course/${course.id}`)}
            >
              <div style={s.courseInfo}>
                <p style={s.courseName}>{course.isHomeService ? '🏠 ' : '📍 '}{course.name}</p>
                <p style={s.courseMeta}>
                  ⏱ {course.duration}分钟
                  {course.venue && ` · ${course.venue}`}
                  {course.isHomeService && ' · 上门服务'}
                </p>
              </div>
              <div style={s.coursePrice}>
                <p style={s.priceNum}>¥{course.price}</p>
                <p style={s.priceUnit}>/节</p>
              </div>
            </div>
          ))}
        </div>

        {/* Partner Venues */}
        {coach.partnerVenues.length > 0 && (
          <>
            <div style={{ height: 20 }} />
            <SectionHeader title={`🏛️ 合作场馆 (${coach.partnerVenues.length}家)`} />
            <div style={s.venueScroll}>
              {coach.partnerVenues.map((venue) => (
                <div
                  key={venue.id}
                  style={s.venueCard}
                  onClick={() => nav(`/venue/${venue.id}`)}
                >
                  <div style={s.venueIcon}>🏛️</div>
                  <p style={s.venueName}>{venue.name}</p>
                  <p style={s.venueDistrict}>
                    {venue.district} · {venue.distance}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Reviews */}
        <div style={{ height: 20 }} />
        <SectionHeader
          title={`📝 学员评价 (${coachReviews.length})`}
          moreText="查看全部"
          onMore={undefined}
        />
        <div style={s.reviewList}>
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
        <div style={s.bottomSpacer} />
      </div>

      {/* Fixed Bottom CTA */}
      <div style={s.fixedCta}>
        <div style={s.ctaLeft}>
          <p style={s.ctaPriceLabel}>
            参考价格 ¥{coach.basePrice}-{coach.homeServicePrice} /节
          </p>
        </div>
        <div
          style={s.ctaBtn}
          onClick={() => {
            if (coach.courses.length > 0) {
              nav(`/course/${coach.courses[0].id}`)
            }
          }}
        >
          立即预约
        </div>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#FFF5F0',
  },
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: 12,
    padding: 20,
  },
  notFoundEmoji: {
    fontSize: 48,
    lineHeight: 1,
  },
  notFoundText: {
    fontSize: 16,
    color: '#4A3B3C',
    fontWeight: 500,
    margin: 0,
  },
  backBtn: {
    marginTop: 8,
    padding: '10px 28px',
    borderRadius: 24,
    background: '#E8B4A2',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },

  // Hero
  hero: {
    height: 240,
    background: 'linear-gradient(135deg, #E8B4A2, #D4A08A)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  navBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    paddingTop: 16,
  },
  navBack: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    color: '#FFFFFF',
    cursor: 'pointer',
    fontWeight: 700,
    lineHeight: 1,
  },
  navTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: '#FFFFFF',
  },
  navPlaceholder: {
    width: 32,
  },
  heroCenter: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroEmoji: {
    fontSize: 64,
    lineHeight: 1,
  },
  heroBadgeRow: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '0 16px 16px',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '6px 14px',
    borderRadius: 16,
    background: 'rgba(255,255,255,0.25)',
    backdropFilter: 'blur(8px)',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 500,
  },

  // Card
  card: {
    background: '#FFFFFF',
    borderRadius: '20px 20px 0 0',
    marginTop: -16,
    padding: '20px 16px 0',
    position: 'relative',
    zIndex: 1,
  },

  // Header
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  nameRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  nameText: {
    fontSize: 22,
    fontWeight: 700,
    color: '#4A3B3C',
    margin: 0,
    lineHeight: 1.2,
  },
  titleTag: {
    fontSize: 11,
    color: '#E8B4A2',
    background: 'rgba(232,180,162,0.10)',
    padding: '3px 10px',
    borderRadius: 8,
    fontWeight: 500,
  },
  yearsText: {
    fontSize: 12,
    color: '#8B7E74',
    margin: '4px 0 0',
    lineHeight: 1.3,
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    flexShrink: 0,
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  ratingNum: {
    fontSize: 24,
    fontWeight: 700,
    color: '#E8B4A2',
    lineHeight: 1,
  },
  reviewCount: {
    fontSize: 11,
    color: '#8B7E74',
    margin: '2px 0 0',
    lineHeight: 1.3,
  },

  // Sections
  sectionBlock: {},
  sectionLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: '#4A3B3C',
    margin: '0 0 10px',
    lineHeight: 1.3,
  },
  certRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  specRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  specHighlighted: {
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: 16,
    fontSize: 12,
    background: 'rgba(232,180,162,0.15)',
    color: '#E8B4A2',
    fontWeight: 500,
  },
  specNormal: {
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: 16,
    fontSize: 12,
    background: '#FFF5F0',
    color: '#8B7E74',
    fontWeight: 500,
  },
  bioText: {
    fontSize: 13,
    color: '#4A3B3C',
    lineHeight: 1.7,
    margin: 0,
  },

  // Courses
  courseList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  courseItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#FFF5F0',
    borderRadius: 12,
    padding: '12px 14px',
    cursor: 'pointer',
  },
  courseInfo: {
    flex: 1,
    minWidth: 0,
  },
  courseName: {
    fontSize: 13,
    fontWeight: 600,
    color: '#4A3B3C',
    margin: 0,
    lineHeight: 1.3,
  },
  courseMeta: {
    fontSize: 11,
    color: '#8B7E74',
    margin: '4px 0 0',
    lineHeight: 1.3,
  },
  coursePrice: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 2,
    flexShrink: 0,
    marginLeft: 12,
  },
  priceNum: {
    fontSize: 16,
    fontWeight: 700,
    color: '#E8B4A2',
    margin: 0,
    lineHeight: 1,
  },
  priceUnit: {
    fontSize: 11,
    color: '#8B7E74',
  },

  // Venues
  venueScroll: {
    display: 'flex',
    gap: 10,
    overflowX: 'auto',
    paddingBottom: 4,
  },
  venueCard: {
    minWidth: 100,
    background: '#FFF5F0',
    borderRadius: 12,
    padding: '12px 14px',
    cursor: 'pointer',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  venueIcon: {
    fontSize: 24,
    lineHeight: 1,
  },
  venueName: {
    fontSize: 12,
    fontWeight: 600,
    color: '#4A3B3C',
    margin: 0,
    lineHeight: 1.2,
    textAlign: 'center',
  },
  venueDistrict: {
    fontSize: 10,
    color: '#8B7E74',
    margin: 0,
    lineHeight: 1.2,
  },

  // Reviews
  reviewList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  // Bottom
  bottomSpacer: {
    height: 80,
  },

  // Fixed CTA
  fixedCta: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: '#FFFFFF',
    padding: '12px 16px',
    paddingBottom: 'calc(12px + env(safe-area-inset-bottom))',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    borderTop: '1px solid #F0E8E0',
    boxShadow: '0 -2px 12px rgba(0,0,0,0.04)',
    zIndex: 10,
  },
  ctaLeft: {
    flex: 1,
  },
  ctaPriceLabel: {
    fontSize: 12,
    color: '#8B7E74',
    margin: 0,
    lineHeight: 1.3,
  },
  ctaBtn: {
    padding: '12px 32px',
    borderRadius: 24,
    background: 'linear-gradient(135deg, #E8B4A2, #D4A08A)',
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
}
