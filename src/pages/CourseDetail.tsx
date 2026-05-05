import { useNavigate, useParams } from 'react-router-dom'
import StarRating from '../components/StarRating'
import { courses } from '../data/mock'
import {
  SearchIcon,
  ClockIcon,
  UserIcon,
  LocationIcon,
  HomeServiceIcon,
  OrdersIcon,
  CheckIcon,
} from '../components/Icons'

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const course = courses.find((c) => c.id === Number(id))

  if (!course) {
    return (
      <div style={s.page}>
        <div style={s.notFound}>
          <SearchIcon size={48} color="#c0c0c0" />
          <p style={s.notFoundText}>课程未找到</p>
          <div style={s.backBtn} onClick={() => nav(-1)}>
            返回
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={s.page}>
      {/* Hero — thumbnail with gradient fallback */}
      <div
        style={{
          height: 180,
          position: 'relative',
          background: course.thumbnail
            ? `url(${course.thumbnail}) center/cover no-repeat, ${course.imageGradient}`
            : course.imageGradient,
        }}
      >
        {/* NavBar */}
        <div style={s.navBar}>
          <div style={s.navBack} onClick={() => nav(-1)}>
            ←
          </div>
          <div style={s.navTitle}>{course.title}</div>
          <div style={s.navPlaceholder} />
        </div>

        {/* Center */}
        <div style={s.heroCenter} />
      </div>

      {/* Info Card */}
      <div style={s.card}>
        {/* Title */}
        <h1 style={s.courseTitle}>{course.title}</h1>

        <div style={{ height: 14 }} />

        {/* Coach Row */}
        <div style={s.coachRow} onClick={() => nav(`/coach/${course.coachId}`)}>
          <div style={s.coachAvatar}>
            {course.coachName.charAt(0)}
          </div>
          <div style={s.coachInfo}>
            <p style={s.coachName}>{course.coachName}</p>
            <div style={s.coachRatingRow}>
              <StarRating value={course.coachRating} size={12} />
              <span style={s.coachRatingNum}>
                {course.coachRating.toFixed(1)}
              </span>
            </div>
          </div>
          <span style={s.coachArrow}>›</span>
        </div>

        <div style={{ height: 16 }} />

        {/* Info Row */}
        <div style={s.infoRow}>
          <div style={s.infoItem}>
            <ClockIcon size={14} color="#6a6a6a" />
            <span style={s.infoValue}>{course.duration}分钟</span>
          </div>
          <div style={s.infoItem}>
            <UserIcon size={14} color="#6a6a6a" />
            <span style={s.infoValue}>1v1私教</span>
          </div>
          <div style={s.infoItem}>
            {course.isHomeService ? (
              <HomeServiceIcon size={14} color="#6a6a6a" />
            ) : (
              <LocationIcon size={14} color="#6a6a6a" />
            )}
            <span style={s.infoValue}>
              {course.isHomeService ? '上门服务' : course.venueName}
            </span>
          </div>
          <div style={s.infoItem}>
            <LocationIcon size={14} color="#6a6a6a" />
            <span style={s.infoValue}>{course.distance}</span>
          </div>
        </div>

        <div style={{ height: 20 }} />

        {/* Course Outline */}
        <p style={s.sectionLabel}>
          <OrdersIcon size={14} color="#E3617B" />
          {' '}课程大纲
        </p>
        <div style={s.outlineList}>
          {course.outline.map((step, idx) => (
            <div key={idx} style={s.outlineItem}>
              <span style={s.outlineNum}>{idx + 1}</span>
              <span style={s.outlineText}>{step}</span>
            </div>
          ))}
        </div>

        <div style={{ height: 18 }} />

        {/* Target Audience */}
        <p style={s.sectionLabel}>
          <UserIcon size={14} color="#E3617B" />
          {' '}适合人群
        </p>
        <div style={s.audienceRow}>
          {course.targetAudience.map((tag, idx) => (
            <span key={idx} style={s.audienceTag}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ height: 18 }} />

        {/* Trust Guarantees */}
        <div style={s.trustBox}>
          <div style={s.trustItem}>
            <CheckIcon size={14} color="#16A34A" />
            <span style={s.trustText}>不满意退款</span>
          </div>
          <div style={s.trustItem}>
            <CheckIcon size={14} color="#16A34A" />
            <span style={s.trustText}>资质已核验</span>
          </div>
          <div style={s.trustItem}>
            <CheckIcon size={14} color="#16A34A" />
            <span style={s.trustText}>资金监管</span>
          </div>
        </div>

        {/* Bottom spacer for fixed bar */}
        <div style={s.bottomSpacer} />
      </div>

      {/* Fixed Bottom Bar */}
      <div style={s.fixedBar}>
        <div style={s.fixedLeft}>
          <p style={s.trustLabel}>
            <CheckIcon size={12} color="#16A34A" />
            {' '}不满意退款 · 资质已核验
          </p>
        </div>
        <div
          style={s.ctaBtn}
          onClick={() => nav(`/booking/${course.id}`)}
        >
          立即预约 ¥{course.price}
        </div>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#fff',
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
  notFoundText: {
    fontSize: 16,
    color: '#222',
    fontWeight: 500,
    margin: 0,
  },
  backBtn: {
    marginTop: 8,
    padding: '10px 28px',
    borderRadius: 24,
    background: '#E3617B',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },

  // Hero
  hero: {
    height: 180,
    background: 'linear-gradient(135deg, #E3617B, #F5D5C8)',
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
    maxWidth: '60%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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

  // Card
  card: {
    background: '#FFFFFF',
    borderRadius: '20px 20px 0 0',
    marginTop: -16,
    padding: '20px 16px 0',
    position: 'relative',
    zIndex: 1,
  },

  // Title
  courseTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#222',
    margin: 0,
    lineHeight: 1.3,
  },

  // Coach Row
  coachRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 14px',
    background: '#fff',
    borderRadius: 12,
    cursor: 'pointer',
  },
  coachAvatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #E3617B, #D44A65)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 700,
    color: '#FFFFFF',
    flexShrink: 0,
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontSize: 13,
    fontWeight: 600,
    color: '#222',
    margin: 0,
    lineHeight: 1.2,
  },
  coachRatingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  coachRatingNum: {
    fontSize: 11,
    color: '#6a6a6a',
  },
  coachArrow: {
    fontSize: 20,
    color: '#6a6a6a',
    fontWeight: 300,
    lineHeight: 1,
  },

  // Info Row
  infoRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px 16px',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  infoValue: {
    fontSize: 12,
    color: '#222',
  },

  // Section
  sectionLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: '#222',
    margin: '0 0 10px',
    lineHeight: 1.3,
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },

  // Outline
  outlineList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  outlineItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
  },
  outlineNum: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: '#fff',
    color: '#E3617B',
    fontSize: 11,
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    lineHeight: 1,
  },
  outlineText: {
    fontSize: 13,
    color: '#222',
    lineHeight: 1.5,
  },

  // Audience
  audienceRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
  },
  audienceTag: {
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: 16,
    fontSize: 12,
    background: '#fff',
    color: '#6a6a6a',
    fontWeight: 500,
  },

  // Trust
  trustBox: {
    background: '#fff',
    borderRadius: 12,
    padding: '12px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  trustText: {
    fontSize: 12,
    color: '#222',
    fontWeight: 500,
  },

  // Bottom
  bottomSpacer: {
    height: 80,
  },

  // Fixed bar
  fixedBar: {
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
    borderTop: '1px solid #ddd',
    boxShadow: '0 -2px 12px rgba(0,0,0,0.04)',
    zIndex: 10,
  },
  fixedLeft: {
    flex: 1,
  },
  trustLabel: {
    fontSize: 11,
    color: '#6a6a6a',
    margin: 0,
    lineHeight: 1.3,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  },
  ctaBtn: {
    padding: '12px 28px',
    borderRadius: 24,
    background: 'linear-gradient(135deg, #E3617B, #D44A65)',
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
}
