import { useNavigate } from 'react-router-dom'
import SceneCard from '../components/SceneCard'
import CoachCard from '../components/CoachCard'
import CourseCard from '../components/CourseCard'
import SectionHeader from '../components/SectionHeader'
import { coaches, courses } from '../data/mock'

const hotTags = [
  { label: '普拉提核心床', highlighted: false },
  { label: '产后恢复', highlighted: false },
  { label: '体态矫正', highlighted: true },
  { label: '脊柱健康', highlighted: false },
  { label: '孕期普拉提', highlighted: false },
]

export default function Home() {
  const nav = useNavigate()

  return (
    <div style={s.page}>
      {/* Location bar */}
      <div style={s.topBar}>
        <div style={s.locationRow}>
          <span style={s.locationText}>{'📍 上海 · 徐汇区 ▼'}</span>
        </div>
        <div style={s.searchBar} onClick={() => nav('/search')}>
          <span style={s.searchIcon}>🔍</span>
          <span style={s.searchPlaceholder}>搜索课程、教练...</span>
        </div>
      </div>

      {/* Scene Cards */}
      <div style={s.sceneRow}>
        <SceneCard
          icon="🏛️"
          title="场馆课程"
          subtitle="到店体验 · 专业器械"
          count="32家场馆可选"
          gradient="linear-gradient(135deg, #E8B4A2, #D4A08A)"
          onClick={() => nav('/studio')}
        />
        <div style={{ width: 12 }} />
        <SceneCard
          icon="🏠"
          title="上门私教"
          subtitle="在家练 · 专属指导"
          count="48位教练可约"
          gradient="linear-gradient(135deg, #C4A882, #A89070)"
          onClick={() => nav('/homeservice')}
        />
      </div>

      {/* Hot Tags */}
      <div style={s.tagSection}>
        <div style={s.tagRow}>
          {hotTags.map((tag) => (
            <span
              key={tag.label}
              style={{
                ...s.tag,
                ...(tag.highlighted ? s.tagHighlighted : {}),
              }}
            >
              {tag.highlighted ? '🔥 ' : ''}
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      {/* Featured Coaches */}
      <div style={s.section}>
        <SectionHeader title="⭐ 精选教练" />
        <div style={s.scrollRow}>
          {coaches.map((coach) => (
            <CoachCard
              key={coach.id}
              name={coach.name}
              title={coach.title}
              certification={coach.certifications[0]}
              rating={coach.rating}
              classCount={coach.totalStudents}
              price={coach.basePrice}
              gradient={coachGradients[coach.id] || 'linear-gradient(135deg, #E8B4A2, #F5D5C8)'}
              imageUrl={coach.avatar}
              onClick={() => nav(`/coach/${coach.id}`)}
            />
          ))}
        </div>
      </div>

      {/* Recommended Courses */}
      <div style={s.section}>
        <SectionHeader title="📌 为你推荐" />
        <div style={s.courseList}>
          {courses.map((course) => (
            <div key={course.id} style={{ marginBottom: 12 }}>
              <CourseCard
                title={course.title}
                coachName={course.coachName}
                venueName={course.venueName}
                distance={course.distance}
                duration={`${course.duration} min`}
                price={course.price}
                time={course.time}
                imageGradient={course.imageGradient}
                isHomeService={course.isHomeService}
                thumbnail={course.thumbnail}
                onClick={() => nav(`/course/${course.id}`)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom spacer for TabBar */}
      <div style={s.bottomSpacer} />
    </div>
  )
}

const coachGradients: Record<number, string> = {
  1: 'linear-gradient(135deg, #E8B4A2, #F5D5C8)',
  2: 'linear-gradient(135deg, #C4A882, #E8D5C0)',
  3: 'linear-gradient(135deg, #D4A08A, #F0D8D0)',
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#FFF5F0',
    padding: '0 16px',
    paddingTop: 12,
  },
  topBar: {
    padding: '8px 4px 12px',
  },
  locationRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 14,
    fontWeight: 500,
    color: '#4A3B3C',
    cursor: 'pointer',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#FFFFFF',
    borderRadius: 24,
    padding: '10px 16px',
    cursor: 'pointer',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  searchIcon: {
    fontSize: 14,
    lineHeight: 1,
  },
  searchPlaceholder: {
    fontSize: 13,
    color: '#8B7E74',
  },
  sceneRow: {
    display: 'flex',
    gap: 0,
    marginBottom: 16,
  },
  tagSection: {
    marginBottom: 20,
  },
  tagRow: {
    display: 'flex',
    gap: 8,
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    paddingBottom: 4,
  },
  tag: {
    display: 'inline-block',
    padding: '6px 14px',
    borderRadius: 16,
    fontSize: 12,
    color: '#8B7E74',
    background: '#FFFFFF',
    border: '1px solid #F0E8E0',
    cursor: 'pointer',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  tagHighlighted: {
    color: '#E8B4A2',
    borderColor: '#E8B4A2',
    background: 'rgba(232,180,162,0.08)',
  },
  section: {
    marginBottom: 20,
  },
  scrollRow: {
    display: 'flex',
    gap: 10,
    overflowX: 'auto',
    paddingBottom: 4,
  },
  courseList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
  },
  bottomSpacer: {
    height: 70,
  },
}
