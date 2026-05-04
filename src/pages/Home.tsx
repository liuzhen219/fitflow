import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Popup } from 'antd-mobile'
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
  CheckIcon,
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

  const currentCity = cities[cityIndex]
  const currentDistrict = currentCity.districts[districtIndex]

  return (
    <div style={{ minHeight: '100vh', background: '#fff', paddingBottom: 32 }}>
      {/* Location + Search Pill */}
      <div style={{ padding: '16px 16px 12px' }}>
        {/* Location chip — tappable */}
        <div
          onClick={() => setLocationVisible(true)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 10,
            padding: '8px 14px', borderRadius: 24, border: '1px solid #ddd',
            cursor: 'pointer', userSelect: 'none', background: '#fff',
            transition: 'box-shadow 0.15s',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'rgba(0,0,0,0.06) 0 2px 8px 0' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
        >
          <LocationIcon size={15} color="#E3617B" />
          <span style={{ fontSize: 14, fontWeight: 600, color: '#222' }}>{currentCity.name} · {currentDistrict}</span>
          <span style={{ fontSize: 12, color: '#6a6a6a', transform: 'rotate(90deg)', display: 'inline-flex' }}>›</span>
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
