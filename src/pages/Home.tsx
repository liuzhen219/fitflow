import { useNavigate } from 'react-router-dom'
import SceneCard from '../components/SceneCard'
import CoachCard from '../components/CoachCard'
import CourseCard from '../components/CourseCard'
import SectionHeader from '../components/SectionHeader'
import { coaches, courses } from '../data/mock'
import {
  LocationIcon,
  SearchIcon,
  BuildingIcon,
  HomeServiceIcon,
  StarFilledIcon,
  SparkleIcon,
  FireIcon,
} from '../components/Icons'

const hotTags = ['普拉提核心床', '产后恢复', '体态矫正', '脊柱健康', '孕期普拉提']

export default function Home() {
  const nav = useNavigate()
  return (
    <div style={{ minHeight: '100vh', background: '#fff', paddingBottom: 32 }}>
      {/* Location + Search Pill */}
      <div style={{ padding: '16px 16px 12px' }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#222', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4 }}>
          <LocationIcon size={16} color="#222" />
          上海 · 徐汇区
          <span style={{ fontSize: 10 }}>▼</span>
        </div>
        <div
          onClick={() => nav('/search')}
          style={{
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: 32,
            padding: '14px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            boxShadow: 'rgba(0,0,0,0.04) 0 2px 6px 0',
          }}
        >
          <SearchIcon size={16} color="#6a6a6a" />
          <span style={{ fontSize: 15, fontWeight: 500, color: '#6a6a6a' }}>
            搜索教练、场馆、课程...
          </span>
        </div>
      </div>

      {/* Scene Cards */}
      <div style={{ padding: '0 16px 16px', display: 'flex', gap: 12 }}>
        <SceneCard
          icon={<BuildingIcon size={32} color="#fff" />}
          title="场馆课程"
          subtitle="到店体验 · 专业器械"
          count="32家场馆可选"
          gradient="linear-gradient(145deg, #E3617B, #D44A65)"
          onClick={() => nav('/studio')}
        />
        <SceneCard
          icon={<HomeServiceIcon size={32} color="#fff" />}
          title="上门私教"
          subtitle="在家练 · 专属指导"
          count="48位教练可约"
          gradient="linear-gradient(145deg, #222, #444)"
          onClick={() => nav('/homeservice')}
        />
      </div>

      {/* Hot Tags */}
      <div
        style={{
          padding: '0 16px 20px',
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
        }}
      >
        {hotTags.map((tag, i) => (
          <span
            key={tag}
            style={{
              background: i === 2 ? '#222' : '#fff',
              color: i === 2 ? '#fff' : '#222',
              padding: '8px 16px',
              borderRadius: 32,
              fontSize: 13,
              fontWeight: 500,
              whiteSpace: 'nowrap',
              border: i === 2 ? 'none' : '1px solid #ddd',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            {i === 2 && <FireIcon size={14} color="#fff" />}
            {tag}
          </span>
        ))}
      </div>

      {/* Featured Coaches */}
      <div style={{ padding: '0 0 24px' }}>
        <div style={{ padding: '0 16px' }}>
          <SectionHeader
            title="精选教练"
            icon={<StarFilledIcon size={16} color="#E3617B" />}
            onMore={() => nav('/homeservice')}
          />
        </div>
        <div
          style={{
            display: 'flex',
            gap: 16,
            overflowX: 'auto',
            padding: '0 16px',
          }}
        >
          {coaches.map((c) => (
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
          ))}
        </div>
      </div>

      {/* Recommended Courses */}
      <div>
        <div style={{ padding: '0 16px', marginBottom: 0 }}>
          <SectionHeader
            title="为你推荐"
            icon={<SparkleIcon size={16} color="#E3617B" />}
            onMore={() => nav('/studio')}
          />
        </div>
        <div style={{ padding: '0 16px' }}>
          {courses.map((c) => (
            <CourseCard
              key={c.id}
              title={c.title}
              coachName={c.coachName}
              venueName={c.venueName}
              distance={c.distance}
              duration={c.duration}
              price={c.price}
              time={c.time}
              imageGradient={c.imageGradient}
              thumbnail={c.thumbnail}
              isHomeService={c.isHomeService}
              onClick={() => nav(`/course/${c.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
