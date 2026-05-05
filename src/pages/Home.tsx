import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Popup } from 'antd-mobile'
import SceneCard from '../components/SceneCard'
import CoachCard from '../components/CoachCard'
import CourseCard from '../components/CourseCard'
import SectionHeader from '../components/SectionHeader'
import EventCard from '../components/EventCard'
import { coaches, courses, events, notifications } from '../data/mock'
import {
  LocationIcon, SearchIcon, BuildingIcon, HomeServiceIcon,
  StarFilledIcon, SparkleIcon, FireIcon, CheckIcon,
} from '../components/Icons'

const hotTags = ['普拉提核心床', '产后恢复', '体态矫正', '脊柱健康', '孕期普拉提']

interface City {
  name: string
  districts: string[]
}

const cities: City[] = [
  { name: '上海', districts: ['徐汇区', '静安区', '黄浦区', '长宁区', '浦东新区', '普陀区', '杨浦区', '虹口区', '闵行区'] },
  { name: '北京', districts: ['朝阳区', '海淀区', '东城区', '西城区', '丰台区', '通州区', '大兴区'] },
  { name: '深圳', districts: ['南山区', '福田区', '罗湖区', '宝安区', '龙岗区', '龙华区'] },
  { name: '广州', districts: ['天河区', '越秀区', '海珠区', '白云区', '番禺区'] },
  { name: '杭州', districts: ['西湖区', '上城区', '拱墅区', '滨江区', '余杭区'] },
  { name: '成都', districts: ['锦江区', '武侯区', '高新区', '青羊区', '成华区'] },
  { name: '南京', districts: ['鼓楼区', '玄武区', '秦淮区', '建邺区', '栖霞区'] },
  { name: '武汉', districts: ['武昌区', '江汉区', '洪山区', '江岸区', '汉阳区'] },
]

export default function Home() {
  const nav = useNavigate()
  const [locationVisible, setLocationVisible] = useState(false)
  const [cityIndex, setCityIndex] = useState(0)
  const [districtIndex, setDistrictIndex] = useState(0)
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const currentCity = cities[cityIndex]
  const currentDistrict = currentCity.districts[districtIndex]

  // Filter courses by active tag
  const filteredCourses = activeTag
    ? courses.filter(c => {
        const searchText = c.title + ' ' + (c.targetAudience || []).join(' ')
        const kw = activeTag
        if (kw === '普拉提核心床') return searchText.includes('核心床')
        if (kw === '产后恢复') return searchText.includes('产后')
        if (kw === '体态矫正') return searchText.includes('体态') || searchText.includes('矫正')
        if (kw === '脊柱健康') return searchText.includes('脊柱')
        if (kw === '孕期普拉提') return searchText.includes('孕期')
        return searchText.includes(kw)
      })
    : courses

  return (
    <div style={{ minHeight: '100vh', background: '#fff', paddingBottom: 32 }}>
      {/* Location + Search Pill */}
      <div style={{ padding: '16px 16px 12px' }}>
        {/* Location row with bell */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          {/* Location chip */}
          <div
            onClick={() => setLocationVisible(true)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '8px 14px', borderRadius: 24, border: '1px solid #ddd',
              cursor: 'pointer', userSelect: 'none', background: '#fff',
              transition: 'box-shadow 0.15s',
            }}
          >
            <LocationIcon size={15} color="#E3617B" />
            <span style={{ fontSize: 14, fontWeight: 600, color: '#222' }}>{currentCity.name} · {currentDistrict}</span>
            <span style={{ fontSize: 12, color: '#6a6a6a', transform: 'rotate(90deg)', display: 'inline-flex' }}>›</span>
          </div>

          {/* Notification bell */}
          <div onClick={() => nav('/notifications')} style={{ position: 'relative', cursor: 'pointer' }}>
            <span style={{ fontSize: 22 }}>🔔</span>
            {notifications.filter(n => !n.read).length > 0 && (
              <span style={{
                position: 'absolute', top: -2, right: -4,
                width: 8, height: 8, borderRadius: '50%', background: '#E3617B',
                border: '1.5px solid #fff',
              }} />
            )}
          </div>
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
          icon={<BuildingIcon size={28} color="#fff" />}
          title="场馆课程"
          subtitle="到店体验 · 专业器械"
          count="6家场馆可选"
          gradient="linear-gradient(145deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))"
          imageUrl="https://picsum.photos/seed/Home-0/600/400"
          onClick={() => nav('/studio')}
        />
        <SceneCard
          icon={<HomeServiceIcon size={28} color="#fff" />}
          title="上门私教"
          subtitle="在家练 · 专属指导"
          count="8位教练可约"
          gradient="linear-gradient(145deg, rgba(0,0,0,0.4), rgba(0,0,0,0.2))"
          imageUrl="https://picsum.photos/seed/Home-1/600/400"
          onClick={() => nav('/homeservice')}
        />
      </div>

      {/* Hot Tags — tappable & scrollable */}
      <div
        style={{
          padding: '0 16px 20px',
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
        }}
      >
        {hotTags.map((tag, i) => {
          const isActive = activeTag === tag
          return (
            <span
              key={tag}
              onClick={() => setActiveTag(isActive ? null : tag)}
              style={{
                background: isActive ? '#E3617B' : '#fff',
                color: isActive ? '#fff' : '#222',
                padding: '8px 16px',
                borderRadius: 32,
                fontSize: 13,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                border: isActive ? '1px solid #E3617B' : '1px solid #ddd',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                flexShrink: 0,
                transition: 'all 0.15s ease',
                userSelect: 'none',
              }}
            >
              {isActive && <FireIcon size={14} color="#fff" />}
              {tag}
            </span>
          )
        })}
      </div>

      {/* Offline Events */}
      <div style={{ padding: '0 0 24px' }}>
        <div style={{ padding: '0 16px' }}>
          <SectionHeader
            title="线下活动"
            icon={<SparkleIcon size={16} color="#E3617B" />}
            moreText="全部活动"
            onMore={() => nav('/events')}
          />
        </div>
        <div style={{ display: 'flex', gap: 14, overflowX: 'auto', padding: '0 16px' }}>
          {events.map((ev) => (
            <EventCard
              key={ev.id}
              title={ev.title}
              type={ev.type}
              date={ev.date}
              time={ev.time}
              venue={ev.venue}
              image={ev.image}
              price={ev.price}
              totalSpots={ev.totalSpots}
              filledSpots={ev.filledSpots}
              tags={ev.tags}
              onClick={() => nav(`/event/${ev.id}`)}
            />
          ))}
        </div>
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
            title={activeTag ? `「${activeTag}」相关课程` : '为你推荐'}
            icon={<SparkleIcon size={16} color="#E3617B" />}
            onMore={() => nav('/studio')}
          />
          {activeTag && (
            <div
              onClick={() => setActiveTag(null)}
              style={{
                fontSize: 13, fontWeight: 500, color: '#E3617B', cursor: 'pointer',
                marginBottom: 12, marginTop: -8, display: 'inline-block',
              }}
            >
              ← 清除筛选，查看全部
            </div>
          )}
        </div>
        <div style={{ padding: '0 16px' }}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((c) => (
              <CourseCard
                key={c.id}
                title={c.title}
                coachName={c.coachName}
              coachRating={c.coachRating}
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
            ))
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#6a6a6a', fontSize: 14 }}>
              暂无「{activeTag}」相关课程，尝试其他标签
            </div>
          )}
        </div>
      </div>

      {/* Location Picker Popup */}
      <Popup
        visible={locationVisible}
        onMaskClick={() => setLocationVisible(false)}
        onClose={() => setLocationVisible(false)}
        bodyStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          maxHeight: '70vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid #ddd' }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#222', textAlign: 'center', marginBottom: 4 }}>
            选择城市
          </div>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#6a6a6a', textAlign: 'center' }}>
            定位到你所在的城市，获取附近的场馆和教练推荐
          </div>
        </div>

        {/* City Tabs — horizontal scroll */}
        <div style={{
          display: 'flex', gap: 0, overflowX: 'auto', flexShrink: 0,
          padding: '12px 16px', borderBottom: '1px solid #f0f0f0',
        }}>
          {cities.map((city, i) => (
            <div
              key={city.name}
              onClick={() => { setCityIndex(i); setDistrictIndex(0) }}
              style={{
                padding: '8px 20px', borderRadius: 32, fontSize: 14, fontWeight: 500,
                cursor: 'pointer', flexShrink: 0, transition: 'all 0.15s',
                background: i === cityIndex ? '#222' : '#f7f7f7',
                color: i === cityIndex ? '#fff' : '#6a6a6a',
              }}
            >
              {city.name}
            </div>
          ))}
        </div>

        {/* District Grid */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '16px',
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10,
        }}>
          {currentCity.districts.map((district, i) => (
            <div
              key={district}
              onClick={() => { setDistrictIndex(i); setLocationVisible(false) }}
              style={{
                padding: '14px 8px', borderRadius: 12, textAlign: 'center',
                fontSize: 14, fontWeight: 500, cursor: 'pointer',
                transition: 'all 0.15s',
                background: i === districtIndex ? '#FFF0EE' : '#f7f7f7',
                color: i === districtIndex ? '#E3617B' : '#222',
                border: i === districtIndex ? '1.5px solid #E3617B' : '1.5px solid transparent',
                position: 'relative',
              }}
            >
              {district}
              {i === districtIndex && (
                <span style={{ position: 'absolute', top: 6, right: 8 }}>
                  <CheckIcon size={14} color="#E3617B" />
                </span>
              )}
            </div>
          ))}
        </div>
      </Popup>
    </div>
  )
}
