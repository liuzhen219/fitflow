/* ==================== FitFlow Mock Data ==================== */

/* ---------- Interfaces ---------- */

export interface CourseBrief {
  id: number
  name: string
  duration: number
  venue?: string
  isHomeService: boolean
  price: number
}

export interface VenueBrief {
  id: number
  name: string
  distance: string
  district: string
}

export interface Coach {
  id: number
  name: string
  avatar: string
  heroImage: string
  title: string
  years: number
  rating: number
  reviewCount: number
  totalClasses: number
  totalStudents: number
  retentionRate: number
  certifications: string[]
  specialties: string[]
  bio: string
  courses: CourseBrief[]
  partnerVenues: VenueBrief[]
  basePrice: number
  homeServicePrice: number
  hasVideo: boolean
}

export interface Venue {
  id: number
  name: string
  images: string[]
  heroImage: string
  address: string
  district: string
  distance: string
  rating: number
  reviewCount: number
  facilities: string[]
  services: string[]
  openHours: string
  description: string
  coachIds: number[]
  scheduleLabel: string
  verified: boolean
}

export interface CourseItem {
  id: number
  title: string
  coachName: string
  coachId: number
  coachRating: number
  venueName: string
  venueId: number
  distance: string
  duration: number
  price: number
  isHomeService: boolean
  imageGradient: string
  thumbnail: string
  time: string
  targetAudience: string[]
  outline: string[]
}

export interface Review {
  id: number
  userName: string
  userAvatar: string
  rating: number
  tags: string[]
  content: string
  images: string[]
  courseLabel: string
  classCount: number
  date: string
}

export interface ScheduleItem {
  id: number
  courseName: string
  coachName: string
  venueName: string
  isHomeService: boolean
  date: string
  time: string
  status: 'upcoming' | 'confirmed' | 'completed' | 'cancelled'
  hasCheckIn: boolean
}

export const userProfile = {
  name: '李女士',
  phone: '138****6789',
  membership: '普通会员',
  stats: {
    totalClasses: 38,
    totalMinutes: 1860,
    followedCoaches: 5,
  },
  coupons: 3,
  balance: 0,
}

/* ---------- Coaches ---------- */

export const coaches: Coach[] = [
  {
    id: 1,
    name: '林悦然',
    avatar: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&h=400&fit=crop&crop=face',
    heroImage: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=400&fit=crop',
    title: '资深普拉提导师',
    years: 9,
    rating: 4.9,
    reviewCount: 326,
    totalClasses: 4200,
    totalStudents: 860,
    retentionRate: 92,
    certifications: ['STOTT PILATES', 'BASI', '运动康复'],
    specialties: ['体态矫正', '产后恢复'],
    bio: '9年普拉提教学经验，擅长结合STOTT PILATES体系与运动康复技术，帮助学员从根本上改善体态问题。累计授课超过4200节，学员续课率达92%。',
    courses: [
      { id: 101, name: '核心床私教·体态矫正', duration: 55, venue: '梵音普拉提馆', isHomeService: false, price: 420 },
      { id: 103, name: '上门私教·产后恢复', duration: 60, isHomeService: true, price: 680 },
    ],
    partnerVenues: [
      { id: 1, name: '梵音普拉提馆', distance: '1.2km', district: '徐汇区' },
      { id: 3, name: 'ZenSpace', distance: '3.5km', district: '黄浦区' },
    ],
    basePrice: 420,
    homeServicePrice: 680,
    hasVideo: true,
  },
  {
    id: 2,
    name: '陈正阳',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop&crop=face',
    heroImage: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=400&fit=crop',
    title: '运动康复专家',
    years: 12,
    rating: 4.8,
    reviewCount: 218,
    totalClasses: 5600,
    totalStudents: 720,
    retentionRate: 88,
    certifications: ['BASI', '运动康复', 'NASM-CPT'],
    specialties: ['运动康复', '久坐劳损'],
    bio: '12年运动康复与普拉提教学经验，曾在三甲医院康复科担任顾问。擅长针对久坐人群的腰部护理和姿态矫正，帮助超过500名学员摆脱慢性疼痛。',
    courses: [
      { id: 201, name: '康复私教·腰部护理', duration: 50, venue: 'BodyLab', isHomeService: false, price: 580 },
      { id: 202, name: '上门康复·肩颈调理', duration: 60, isHomeService: true, price: 880 },
    ],
    partnerVenues: [
      { id: 2, name: 'BodyLab', distance: '2.8km', district: '静安区' },
      { id: 1, name: '梵音普拉提馆', distance: '4.1km', district: '徐汇区' },
    ],
    basePrice: 580,
    homeServicePrice: 880,
    hasVideo: false,
  },
  {
    id: 3,
    name: '苏曼',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    heroImage: 'https://images.unsplash.com/photo-1518611012118-6960729ce99a?w=800&h=400&fit=crop',
    title: '孕产普拉提导师',
    years: 10,
    rating: 5.0,
    reviewCount: 142,
    totalClasses: 3100,
    totalStudents: 420,
    retentionRate: 95,
    certifications: ['Polestar', 'STOTT', '产后修复'],
    specialties: ['产后恢复', '孕期普拉提'],
    bio: 'Polestar Pilates认证导师，专注于孕产期女性健康管理。从备孕、孕期到产后恢复全周期陪伴，用专业和温柔守护每一位妈妈的健康。',
    courses: [
      { id: 301, name: '孕期私教·舒缓调理', duration: 45, venue: 'ZenSpace', isHomeService: false, price: 680 },
      { id: 302, name: '上门私教·产后修复', duration: 60, isHomeService: true, price: 980 },
    ],
    partnerVenues: [
      { id: 3, name: 'ZenSpace', distance: '0.8km', district: '黄浦区' },
    ],
    basePrice: 680,
    homeServicePrice: 980,
    hasVideo: true,
  },
]

/* ---------- Venues ---------- */

export const venues: Venue[] = [
  {
    id: 1,
    name: '梵音普拉提馆',
    images: [],
    heroImage: 'https://images.unsplash.com/photo-1599901868904-6f95f09e0a1c?w=800&h=400&fit=crop',
    address: '上海市徐汇区衡山路8号3楼',
    district: '徐汇区',
    distance: '1.2km',
    rating: 4.7,
    reviewCount: 512,
    facilities: ['核心床', '凯迪拉克床', '梯桶', '脊柱矫正器', '更衣室', '淋浴间'],
    services: ['私教课程', '小班课', '体态评估'],
    openHours: '08:00 - 21:00',
    description: '坐落于衡山路梧桐树荫中的高端普拉提馆，配备全套Balanced Body器械。环境优雅静谧，教练团队均持国际认证，为学员提供专业、私密的训练体验。',
    coachIds: [1, 2],
    scheduleLabel: '本周可约: 8个时段',
    verified: true,
  },
  {
    id: 2,
    name: 'BodyLab',
    images: [],
    heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=400&fit=crop',
    address: '上海市静安区南京西路1515号B1',
    district: '静安区',
    distance: '2.8km',
    rating: 4.6,
    reviewCount: 387,
    facilities: ['核心床', '凯迪拉克床', '稳踏椅', '垫上区域', '更衣室', '体测仪'],
    services: ['私教课程', '运动康复', '体态评估', '筋膜放松'],
    openHours: '09:00 - 22:00',
    description: 'BodyLab是一家将普拉提与运动康复深度结合的专业工作室，拥有国际先进的康复评估设备。以科学运动为核心，为每一位学员定制专属康复方案。',
    coachIds: [2],
    scheduleLabel: '本周可约: 5个时段',
    verified: true,
  },
  {
    id: 3,
    name: 'ZenSpace',
    images: [],
    heroImage: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=400&fit=crop',
    address: '上海市黄浦区建国中路10号2层',
    district: '黄浦区',
    distance: '3.5km',
    rating: 4.9,
    reviewCount: 268,
    facilities: ['核心床', '梯桶', '垫上区域', '冥想室', '更衣室', '休息区'],
    services: ['私教课程', '小班课', '孕产普拉提', '冥想'],
    openHours: '08:30 - 20:30',
    description: 'ZenSpace以「身心合一」为理念，打造城市中的宁静绿洲。专注于女性健康管理，在轻柔的音乐与香氛中，感受身体与心灵的深度对话。',
    coachIds: [1, 3],
    scheduleLabel: '本周可约: 6个时段',
    verified: true,
  },
]

/* ---------- Courses ---------- */

export const courses: CourseItem[] = [
  {
    id: 101,
    title: '核心床私教·体态矫正',
    coachName: '林悦然',
    coachId: 1,
    coachRating: 4.9,
    venueName: '梵音普拉提馆',
    venueId: 1,
    distance: '1.2km',
    duration: 55,
    price: 420,
    isHomeService: false,
    imageGradient: 'linear-gradient(135deg, #f5e0d8, #e8d4c8)',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-6960729ce99a?w=400&h=300&fit=crop',
    time: '每周一至周六 可约',
    targetAudience: ['驼背圆肩人群', '脊柱侧弯轻度患者', '长期伏案工作者', '追求体态美的人群'],
    outline: ['体态评估与问题分析', '呼吸模式重建', '核心肌群激活训练', '脊柱灵活性与稳定性练习', '肩带稳定性强化', '骨盆正位调整', '日常体态习惯指导'],
  },
  {
    id: 103,
    title: '上门私教·产后恢复',
    coachName: '林悦然',
    coachId: 1,
    coachRating: 4.9,
    venueName: '',
    venueId: 0,
    distance: '上门服务',
    duration: 60,
    price: 680,
    isHomeService: true,
    imageGradient: 'linear-gradient(135deg, #e8d4c8, #d4c0b0)',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    time: '提前一天预约',
    targetAudience: ['产后6周以上妈妈', '腹直肌分离人群', '盆底肌修复需求者', '希望在家训练的新手妈妈'],
    outline: ['产后身体评估', '腹直肌分离修复训练', '盆底肌激活与强化', '核心力量重建', '体态与骨盆恢复', '温和有氧调理', '居家日常训练方案'],
  },
  {
    id: 201,
    title: '康复私教·腰部护理',
    coachName: '陈正阳',
    coachId: 2,
    coachRating: 4.8,
    venueName: 'BodyLab',
    venueId: 2,
    distance: '2.8km',
    duration: 50,
    price: 580,
    isHomeService: false,
    imageGradient: 'linear-gradient(135deg, #d4c0b0, #f0ddd4)',
    thumbnail: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop',
    time: '每周一至周日 可约',
    targetAudience: ['腰椎间盘突出康复期', '慢性腰痛困扰者', '久坐办公人群', '运动损伤恢复期'],
    outline: ['腰部功能评估与筛查', '核心稳定肌群激活', '脊柱分段控制训练', '髋关节灵活性训练', '腰部力学模式重建', '功能性力量恢复', '日常护腰指导'],
  },
]

/* ---------- Reviews ---------- */

export const reviews: Review[] = [
  {
    id: 1,
    userName: '小美妈妈',
    userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    tags: ['耐心细致', '体态明显改善', '专业负责'],
    content: '跟林老师上了三个月的体态矫正课，圆肩和头前伸的问题改善特别明显。林老师很耐心，每次上课都会讲解动作原理，不只是带着做动作。工作室环境也很好，推荐！',
    images: ['https://images.unsplash.com/photo-1575057913256-f0c15f37d64e?w=200&h=200&fit=crop'],
    courseLabel: '核心床私教·体态矫正',
    classCount: 24,
    date: '2026-04-28',
  },
  {
    id: 2,
    userName: 'AndyChen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    tags: ['康复效果显著', '专业度高', '认真负责'],
    content: '因为长期加班导致腰部不适，经朋友推荐找到陈教练。上了10节课后腰部疼痛明显缓解，陈教练还给了一套日常训练方案，在家也能练。非常专业的康复型教练！',
    images: ['https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=200&fit=crop'],
    courseLabel: '康复私教·腰部护理',
    classCount: 10,
    date: '2026-04-25',
  },
  {
    id: 3,
    userName: '静静',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    tags: ['温柔体贴', '产后恢复快', '像朋友一样'],
    content: '产后42天开始跟苏老师上课，现在产后半年，腹直肌分离从3指恢复到不到1指，肚子也平了很多！苏老师真的很懂妈妈的需求，每次上课都很放松和舒服。',
    images: ['https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=200&h=200&fit=crop'],
    courseLabel: '上门私教·产后恢复',
    classCount: 20,
    date: '2026-04-20',
  },
]

/* ---------- Schedule Items ---------- */

export const scheduleItems: ScheduleItem[] = [
  {
    id: 1,
    courseName: '核心床私教·体态矫正',
    coachName: '林悦然',
    venueName: '梵音普拉提馆',
    isHomeService: false,
    date: '2026-05-05',
    time: '10:00 - 10:55',
    status: 'upcoming',
    hasCheckIn: false,
  },
  {
    id: 2,
    courseName: '上门私教·产后恢复',
    coachName: '林悦然',
    venueName: '',
    isHomeService: true,
    date: '2026-05-03',
    time: '14:00 - 15:00',
    status: 'completed',
    hasCheckIn: false,
  },
  {
    id: 3,
    courseName: '康复私教·腰部护理',
    coachName: '陈正阳',
    venueName: 'BodyLab',
    isHomeService: false,
    date: '2026-05-08',
    time: '16:00 - 16:50',
    status: 'confirmed',
    hasCheckIn: false,
  },
]
