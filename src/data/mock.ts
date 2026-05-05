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
  avatar: 'https://picsum.photos/seed/fitflow-0/200/200',
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
    avatar: 'https://picsum.photos/seed/fitflow-1/400/400',
    heroImage: 'https://picsum.photos/seed/fitflow-2/800/400',
    title: '资深普拉提导师',
    years: 9,
    rating: 4.9,
    reviewCount: 326,
    totalClasses: 4200,
    totalStudents: 860,
    retentionRate: 92,
    certifications: ['STOTT PILATES', 'BASI', '运动康复'],
    specialties: ['体态矫正', '产后恢复', '脊柱保养'],
    bio: '9年普拉提教学经验，擅长结合STOTT PILATES体系与运动康复技术，帮助学员从根本上改善体态问题。累计授课超过4200节，学员续课率达92%。',
    courses: [
      { id: 101, name: '核心床私教·体态矫正', duration: 55, venue: '梵音普拉提馆', isHomeService: false, price: 420 },
      { id: 103, name: '上门私教·产后恢复', duration: 60, isHomeService: true, price: 680 },
      { id: 104, name: '小班课·脊柱保养', duration: 60, venue: '梵音普拉提馆', isHomeService: false, price: 350 },
    ],
    partnerVenues: [
      { id: 1, name: '梵音普拉提馆', distance: '1.2km', district: '徐汇区' },
      { id: 3, name: 'ZenSpace', distance: '3.5km', district: '黄浦区' },
      { id: 5, name: '悦动空间', distance: '5.2km', district: '长宁区' },
    ],
    basePrice: 420,
    homeServicePrice: 680,
    hasVideo: true,
  },
  {
    id: 2,
    name: '陈正阳',
    avatar: 'https://picsum.photos/seed/fitflow-3/400/400',
    heroImage: 'https://picsum.photos/seed/fitflow-4/800/400',
    title: '运动康复专家',
    years: 12,
    rating: 4.8,
    reviewCount: 218,
    totalClasses: 5600,
    totalStudents: 720,
    retentionRate: 88,
    certifications: ['BASI', '运动康复', 'NASM-CPT'],
    specialties: ['运动康复', '久坐劳损', '关节养护'],
    bio: '12年运动康复与普拉提教学经验，曾在三甲医院康复科担任顾问。擅长针对久坐人群的腰部护理和姿态矫正，帮助超过500名学员摆脱慢性疼痛。',
    courses: [
      { id: 201, name: '康复私教·腰部护理', duration: 50, venue: 'BodyLab', isHomeService: false, price: 580 },
      { id: 202, name: '上门康复·肩颈调理', duration: 60, isHomeService: true, price: 880 },
      { id: 203, name: '运动康复·膝关节养护', duration: 55, venue: 'BodyLab', isHomeService: false, price: 520 },
    ],
    partnerVenues: [
      { id: 2, name: 'BodyLab', distance: '2.8km', district: '静安区' },
      { id: 1, name: '梵音普拉提馆', distance: '4.1km', district: '徐汇区' },
      { id: 4, name: '云栖普拉提', distance: '6.3km', district: '浦东新区' },
    ],
    basePrice: 580,
    homeServicePrice: 880,
    hasVideo: false,
  },
  {
    id: 3,
    name: '苏曼',
    avatar: 'https://picsum.photos/seed/fitflow-5/400/400',
    heroImage: 'https://picsum.photos/seed/fitflow-6/800/400',
    title: '孕产普拉提导师',
    years: 10,
    rating: 5.0,
    reviewCount: 142,
    totalClasses: 3100,
    totalStudents: 420,
    retentionRate: 95,
    certifications: ['Polestar', 'STOTT', '产后修复'],
    specialties: ['产后恢复', '孕期普拉提', '盆底肌修复'],
    bio: 'Polestar Pilates认证导师，专注于孕产期女性健康管理。从备孕、孕期到产后恢复全周期陪伴，用专业和温柔守护每一位妈妈的健康。',
    courses: [
      { id: 301, name: '孕期私教·舒缓调理', duration: 45, venue: 'ZenSpace', isHomeService: false, price: 680 },
      { id: 302, name: '上门私教·产后修复', duration: 60, isHomeService: true, price: 980 },
      { id: 303, name: '女性健康·盆底肌训练', duration: 50, venue: 'ZenSpace', isHomeService: false, price: 580 },
    ],
    partnerVenues: [
      { id: 3, name: 'ZenSpace', distance: '0.8km', district: '黄浦区' },
      { id: 5, name: '悦动空间', distance: '4.8km', district: '长宁区' },
    ],
    basePrice: 680,
    homeServicePrice: 980,
    hasVideo: true,
  },
  {
    id: 4,
    name: '赵明哲',
    avatar: 'https://picsum.photos/seed/fitflow-7/400/400',
    heroImage: 'https://picsum.photos/seed/fitflow-4/800/400',
    title: '脊柱侧弯矫正专家',
    years: 11,
    rating: 4.9,
    reviewCount: 196,
    totalClasses: 3800,
    totalStudents: 510,
    retentionRate: 91,
    certifications: ['德国Schroth认证', 'STOTT PILATES', '运动康复'],
    specialties: ['脊柱侧弯矫正', '体态矫正', '运动康复'],
    bio: '11年专注脊柱健康领域，拥有德国施罗斯脊柱侧弯矫正体系认证。擅长通过三维呼吸与特定姿势训练，帮助轻中度脊柱侧弯学员实现结构性改善。',
    courses: [
      { id: 401, name: '脊柱侧弯矫正·私教', duration: 60, venue: '梵音普拉提馆', isHomeService: false, price: 720 },
      { id: 402, name: '上门矫正·脊柱侧弯', duration: 75, isHomeService: true, price: 1080 },
      { id: 403, name: '体态评估与矫正', duration: 55, venue: '云栖普拉提', isHomeService: false, price: 480 },
    ],
    partnerVenues: [
      { id: 1, name: '梵音普拉提馆', distance: '3.6km', district: '徐汇区' },
      { id: 4, name: '云栖普拉提', distance: '1.5km', district: '浦东新区' },
    ],
    basePrice: 720,
    homeServicePrice: 1080,
    hasVideo: true,
  },
  {
    id: 5,
    name: '周思琪',
    avatar: 'https://picsum.photos/seed/fitflow-1/400/400',
    heroImage: 'https://picsum.photos/seed/fitflow-2/800/400',
    title: '塑形减脂导师',
    years: 7,
    rating: 4.7,
    reviewCount: 283,
    totalClasses: 2800,
    totalStudents: 650,
    retentionRate: 86,
    certifications: ['BASI', '功能性训练', '营养指导师'],
    specialties: ['塑形减脂', '核心训练', '体态美化'],
    bio: '7年教学经验，擅长将普拉提与功能性力量训练结合，打造紧致优美的身体线条。课程节奏明快、充满活力，帮助数百位学员在轻松氛围中实现塑形目标。',
    courses: [
      { id: 501, name: '塑形私教·全身燃脂', duration: 50, venue: '悦动空间', isHomeService: false, price: 380 },
      { id: 502, name: '核心轰炸·燃脂塑形', duration: 45, venue: '初心瑜伽普拉提', isHomeService: false, price: 320 },
      { id: 503, name: '上门私教·减脂塑形', duration: 60, isHomeService: true, price: 580 },
    ],
    partnerVenues: [
      { id: 5, name: '悦动空间', distance: '2.1km', district: '长宁区' },
      { id: 6, name: '初心瑜伽普拉提', distance: '4.7km', district: '杨浦区' },
    ],
    basePrice: 380,
    homeServicePrice: 580,
    hasVideo: false,
  },
  {
    id: 6,
    name: '王一鸣',
    avatar: 'https://picsum.photos/seed/fitflow-8/400/400',
    heroImage: 'https://picsum.photos/seed/fitflow-9/800/400',
    title: '青少年体态专家',
    years: 8,
    rating: 4.8,
    reviewCount: 164,
    totalClasses: 2600,
    totalStudents: 390,
    retentionRate: 90,
    certifications: ['FMS功能性运动筛查', 'BASI', '青少年体适能认证'],
    specialties: ['青少年体态', '体态矫正', '运动发育'],
    bio: '8年青少年体态矫正经验，持有FMS功能性运动筛查认证。善于与青少年沟通，用科学又有趣的方式引导孩子们建立正确的身体姿态和运动习惯。',
    courses: [
      { id: 601, name: '青少年体态矫正·私教', duration: 55, venue: 'BodyLab', isHomeService: false, price: 480 },
      { id: 602, name: '上门指导·青少年体态', duration: 60, isHomeService: true, price: 720 },
    ],
    partnerVenues: [
      { id: 2, name: 'BodyLab', distance: '3.0km', district: '静安区' },
      { id: 4, name: '云栖普拉提', distance: '2.8km', district: '浦东新区' },
      { id: 6, name: '初心瑜伽普拉提', distance: '5.5km', district: '杨浦区' },
    ],
    basePrice: 480,
    homeServicePrice: 720,
    hasVideo: true,
  },
  {
    id: 7,
    name: '刘凯文',
    avatar: 'https://picsum.photos/seed/fitflow-10/400/400',
    heroImage: 'https://picsum.photos/seed/fitflow-11/800/400',
    title: '筋膜康复与运动表现教练',
    years: 9,
    rating: 4.6,
    reviewCount: 137,
    totalClasses: 3100,
    totalStudents: 480,
    retentionRate: 83,
    certifications: ['NASM-CES', '筋膜刀认证', 'FMS筛查'],
    specialties: ['筋膜放松', '运动表现提升', '运动康复'],
    bio: '9年教练生涯，专注深层筋膜松解与运动表现提升。将手法松解与普拉提训练相结合，帮助运动员和健身爱好者突破瓶颈、预防伤病。',
    courses: [
      { id: 701, name: '筋膜放松·深层松解', duration: 50, venue: 'BodyLab', isHomeService: false, price: 450 },
      { id: 702, name: '运动表现提升·私教', duration: 60, venue: '悦动空间', isHomeService: false, price: 650 },
    ],
    partnerVenues: [
      { id: 2, name: 'BodyLab', distance: '3.2km', district: '静安区' },
      { id: 5, name: '悦动空间', distance: '1.9km', district: '长宁区' },
    ],
    basePrice: 450,
    homeServicePrice: 680,
    hasVideo: false,
  },
  {
    id: 8,
    name: '杨子萱',
    avatar: 'https://picsum.photos/seed/fitflow-5/400/400',
    heroImage: 'https://picsum.photos/seed/fitflow-6/800/400',
    title: '冥想与中老年康复导师',
    years: 13,
    rating: 4.8,
    reviewCount: 185,
    totalClasses: 3600,
    totalStudents: 550,
    retentionRate: 89,
    certifications: ['印度Kaivalyadhama冥想认证', 'STOTT PILATES', '中老年体能训练'],
    specialties: ['冥想与呼吸', '中老年康复', '减压放松'],
    bio: '13年身心整合教学经验，印度Kaivalyadhama瑜伽学院认证冥想导师。坚信真正的健康源自身心合一的练习，用温和平缓的节奏陪伴每一位学员找到内在的宁静与力量。',
    courses: [
      { id: 801, name: '冥想与呼吸·身心平衡', duration: 60, venue: 'ZenSpace', isHomeService: false, price: 380 },
      { id: 802, name: '中老年康复·关节养护', duration: 55, venue: '初心瑜伽普拉提', isHomeService: false, price: 500 },
    ],
    partnerVenues: [
      { id: 3, name: 'ZenSpace', distance: '1.2km', district: '黄浦区' },
      { id: 6, name: '初心瑜伽普拉提', distance: '3.3km', district: '杨浦区' },
    ],
    basePrice: 380,
    homeServicePrice: 560,
    hasVideo: true,
  },
]

/* ---------- Venues ---------- */

export const venues: Venue[] = [
  {
    id: 1,
    name: '梵音普拉提馆',
    images: [],
    heroImage: 'https://picsum.photos/seed/fitflow-12/800/400',
    address: '上海市徐汇区衡山路8号3楼',
    district: '徐汇区',
    distance: '1.2km',
    rating: 4.7,
    reviewCount: 512,
    facilities: ['核心床', '凯迪拉克床', '梯桶', '脊柱矫正器', '更衣室', '淋浴间'],
    services: ['私教课程', '小班课', '体态评估'],
    openHours: '08:00 - 21:00',
    description: '坐落于衡山路梧桐树荫中的高端普拉提馆，配备全套Balanced Body器械。环境优雅静谧，教练团队均持国际认证，为学员提供专业、私密的训练体验。',
    coachIds: [1, 2, 4],
    scheduleLabel: '本周可约: 10个时段',
    verified: true,
  },
  {
    id: 2,
    name: 'BodyLab',
    images: [],
    heroImage: 'https://picsum.photos/seed/fitflow-9/800/400',
    address: '上海市静安区南京西路1515号B1',
    district: '静安区',
    distance: '2.8km',
    rating: 4.6,
    reviewCount: 387,
    facilities: ['核心床', '凯迪拉克床', '稳踏椅', '垫上区域', '更衣室', '体测仪'],
    services: ['私教课程', '运动康复', '体态评估', '筋膜放松'],
    openHours: '09:00 - 22:00',
    description: 'BodyLab是一家将普拉提与运动康复深度结合的专业工作室，拥有国际先进的康复评估设备。以科学运动为核心，为每一位学员定制专属康复方案。',
    coachIds: [2, 6, 7],
    scheduleLabel: '本周可约: 7个时段',
    verified: true,
  },
  {
    id: 3,
    name: 'ZenSpace',
    images: [],
    heroImage: 'https://picsum.photos/seed/fitflow-11/800/400',
    address: '上海市黄浦区建国中路10号2层',
    district: '黄浦区',
    distance: '3.5km',
    rating: 4.9,
    reviewCount: 268,
    facilities: ['核心床', '梯桶', '垫上区域', '冥想室', '更衣室', '休息区'],
    services: ['私教课程', '小班课', '孕产普拉提', '冥想'],
    openHours: '08:30 - 20:30',
    description: 'ZenSpace以「身心合一」为理念，打造城市中的宁静绿洲。专注于女性健康管理，在轻柔的音乐与香氛中，感受身体与心灵的深度对话。',
    coachIds: [1, 3, 8],
    scheduleLabel: '本周可约: 8个时段',
    verified: true,
  },
  {
    id: 4,
    name: '云栖普拉提',
    images: [],
    heroImage: 'https://picsum.photos/seed/fitflow-13/800/400',
    address: '上海市浦东新区世纪大道1210号3层',
    district: '浦东新区',
    distance: '5.8km',
    rating: 4.8,
    reviewCount: 195,
    facilities: ['核心床', '凯迪拉克床', '脊柱矫正器', '梯桶', '更衣室', '淋浴间', '停车位'],
    services: ['私教课程', '小班课', '体态评估', '脊柱侧弯矫正'],
    openHours: '08:00 - 21:30',
    description: '云栖普拉提位于浦东核心区域世纪大道旁，拥有三百平米开阔空间，全部采用Balanced Body器械。特别设立脊柱健康评估中心，为每位学员提供一对一体态筛查。',
    coachIds: [2, 4, 6],
    scheduleLabel: '本周可约: 9个时段',
    verified: true,
  },
  {
    id: 5,
    name: '悦动空间',
    images: [],
    heroImage: 'https://picsum.photos/seed/fitflow-12/800/400',
    address: '上海市长宁区虹桥路1688号B栋1楼',
    district: '长宁区',
    distance: '4.5km',
    rating: 4.5,
    reviewCount: 320,
    facilities: ['核心床', '稳踏椅', '垫上区域', '有氧区', '更衣室', '淋浴间'],
    services: ['私教课程', '小班课', '塑形训练', '筋膜放松'],
    openHours: '07:30 - 22:00',
    description: '悦动空间是一家充满活力的综合健身普拉提馆，器材齐全、营业时间长，特别适合白领下班后过来训练。主打高效塑形课程，让每一次流汗都看得到变化。',
    coachIds: [1, 3, 5, 7],
    scheduleLabel: '本周可约: 12个时段',
    verified: true,
  },
  {
    id: 6,
    name: '初心瑜伽普拉提',
    images: [],
    heroImage: 'https://picsum.photos/seed/fitflow-2/800/400',
    address: '上海市杨浦区五角场国定东路233号2层',
    district: '杨浦区',
    distance: '6.2km',
    rating: 4.6,
    reviewCount: 178,
    facilities: ['核心床', '垫上区域', '冥想室', '休息区', '更衣室'],
    services: ['私教课程', '小班课', '中老年康复', '冥想', '青少年体态'],
    openHours: '09:00 - 20:30',
    description: '初心瑜伽普拉提坐落在五角场商圈，以「安全、温和、持久」为教学理念。特别关注中老年人群和青少年的体态健康，用最温和的方式带来最持久的改善。',
    coachIds: [5, 6, 8],
    scheduleLabel: '本周可约: 6个时段',
    verified: true,
  },
]

/* ---------- Courses ---------- */

export const courses: CourseItem[] = [
  // ---- 林悦然 (Coach 1) ----
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
    thumbnail: 'https://picsum.photos/seed/fitflow-14/400/300',
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
    thumbnail: 'https://picsum.photos/seed/fitflow-15/400/300',
    time: '提前一天预约',
    targetAudience: ['产后6周以上妈妈', '腹直肌分离人群', '盆底肌修复需求者', '希望在家训练的新手妈妈'],
    outline: ['产后身体评估', '腹直肌分离修复训练', '盆底肌激活与强化', '核心力量重建', '体态与骨盆恢复', '温和有氧调理', '居家日常训练方案'],
  },
  {
    id: 104,
    title: '小班课·脊柱保养',
    coachName: '林悦然',
    coachId: 1,
    coachRating: 4.9,
    venueName: '梵音普拉提馆',
    venueId: 1,
    distance: '1.2km',
    duration: 60,
    price: 350,
    isHomeService: false,
    imageGradient: 'linear-gradient(135deg, #f2ece4, #e0d6c8)',
    thumbnail: 'https://picsum.photos/seed/fitflow-16/400/300',
    time: '每周三、周五 18:30，周日 10:00',
    targetAudience: ['办公室久坐族', '脊柱僵硬人群', '轻度腰背不适者', '想改善驼背的上班族'],
    outline: ['脊柱热身与唤醒', '核心床团体训练', '脊椎逐节活动练习', '骨盆稳定性训练', '舒缓拉伸与放松', '日常护脊小技巧分享'],
  },

  // ---- 陈正阳 (Coach 2) ----
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
    thumbnail: 'https://picsum.photos/seed/fitflow-17/400/300',
    time: '每周一至周日 可约',
    targetAudience: ['腰椎间盘突出康复期', '慢性腰痛困扰者', '久坐办公人群', '运动损伤恢复期'],
    outline: ['腰部功能评估与筛查', '核心稳定肌群激活', '脊柱分段控制训练', '髋关节灵活性训练', '腰部力学模式重建', '功能性力量恢复', '日常护腰指导'],
  },
  {
    id: 202,
    title: '上门康复·肩颈调理',
    coachName: '陈正阳',
    coachId: 2,
    coachRating: 4.8,
    venueName: '',
    venueId: 0,
    distance: '上门服务',
    duration: 60,
    price: 880,
    isHomeService: true,
    imageGradient: 'linear-gradient(135deg, #c8d8e8, #b8c8d8)',
    thumbnail: 'https://picsum.photos/seed/fitflow-15/400/300',
    time: '提前一天预约',
    targetAudience: ['颈椎不适人群', '肩周炎康复期', '偏头痛关联肩颈紧张者', '居家办公疲劳人群'],
    outline: ['肩颈功能评估', '筋膜松解手法指导', '颈椎稳定训练', '肩胛带活动度恢复', '深层颈屈肌激活', '日常工位拉伸方案', '枕高与睡眠姿态建议'],
  },
  {
    id: 203,
    title: '运动康复·膝关节养护',
    coachName: '陈正阳',
    coachId: 2,
    coachRating: 4.8,
    venueName: 'BodyLab',
    venueId: 2,
    distance: '2.8km',
    duration: 55,
    price: 520,
    isHomeService: false,
    imageGradient: 'linear-gradient(135deg, #d0dde8, #c0cdd8)',
    thumbnail: 'https://picsum.photos/seed/fitflow-17/400/300',
    time: '每周二、周四、周六 可约',
    targetAudience: ['膝关节术后康复期', '跑步膝困扰者', '膝关节炎轻度患者', '运动爱好者'],
    outline: ['膝关节力学评估', '股四头肌与腘绳肌平衡训练', '髌骨活动度改善', '膝关节稳定性强化', '落地缓冲模式重建', '日常护膝动作指导'],
  },

  // ---- 苏曼 (Coach 3) ----
  {
    id: 301,
    title: '孕期私教·舒缓调理',
    coachName: '苏曼',
    coachId: 3,
    coachRating: 5.0,
    venueName: 'ZenSpace',
    venueId: 3,
    distance: '0.8km',
    duration: 45,
    price: 680,
    isHomeService: false,
    imageGradient: 'linear-gradient(135deg, #f0e0d8, #e8ccc0)',
    thumbnail: 'https://picsum.photos/seed/fitflow-14/400/300',
    time: '每周一至周五 可约',
    targetAudience: ['孕期13周以上准妈妈', '孕期腰背不适者', '希望顺产准备者', '孕期水肿困扰者'],
    outline: ['孕期身体状况评估', '盆底肌预备训练', '呼吸与放松技巧', '脊柱减压练习', '下肢循环促进', '分娩预备体位练习', '孕期情绪舒缓'],
  },
  {
    id: 302,
    title: '上门私教·产后修复',
    coachName: '苏曼',
    coachId: 3,
    coachRating: 5.0,
    venueName: '',
    venueId: 0,
    distance: '上门服务',
    duration: 60,
    price: 980,
    isHomeService: true,
    imageGradient: 'linear-gradient(135deg, #e8d8cc, #dcc8b8)',
    thumbnail: 'https://picsum.photos/seed/fitflow-15/400/300',
    time: '提前一天预约',
    targetAudience: ['产后6周至2年妈妈', '腹直肌分离中度以上', '产后漏尿困扰者', '希望全面恢复身材的妈妈'],
    outline: ['产后全面身体评估', '腹直肌分离闭合训练', '盆底肌群精准激活', '核心与骨盆带重建', '产后体态矫正', '全身力量渐进恢复', '居家巩固训练计划'],
  },
  {
    id: 303,
    title: '女性健康·盆底肌训练',
    coachName: '苏曼',
    coachId: 3,
    coachRating: 5.0,
    venueName: 'ZenSpace',
    venueId: 3,
    distance: '0.8km',
    duration: 50,
    price: 580,
    isHomeService: false,
    imageGradient: 'linear-gradient(135deg, #e8d0d8, #d8c0c8)',
    thumbnail: 'https://picsum.photos/seed/fitflow-16/400/300',
    time: '每周二、周四、周六 可约',
    targetAudience: ['产后妈妈', '更年期女性', '轻度压力性尿失禁人群', '关注女性健康的各年龄段女性'],
    outline: ['盆底肌功能评估', '盆底肌精准感知训练', '快肌与慢肌纤维训练', '盆底与呼吸协调', '核心整合训练', '日常生活盆底保护指导'],
  },

  // ---- 赵明哲 (Coach 4) ----
  {
    id: 401,
    title: '脊柱侧弯矫正·私教',
    coachName: '赵明哲',
    coachId: 4,
    coachRating: 4.9,
    venueName: '梵音普拉提馆',
    venueId: 1,
    distance: '3.6km',
    duration: 60,
    price: 720,
    isHomeService: false,
    imageGradient: 'linear-gradient(135deg, #d4dde8, #c4cdd8)',
    thumbnail: 'https://picsum.photos/seed/fitflow-17/400/300',
    time: '每周一、三、五、日 可约',
    targetAudience: ['Cobb角10-30度脊柱侧弯患者', '青少年特发性脊柱侧弯', '成年退行性脊柱侧弯', '术后康复期'],
    outline: ['全脊柱X光片分析评估', '施罗斯三维呼吸训练', '特定姿势矫正训练', '凹侧肌群激活强化', '凸侧肌群松解与拉伸', '日常姿态纠正策略', '家庭训练方案定制'],
  },
  {
    id: 402,
    title: '上门矫正·脊柱侧弯',
    coachName: '赵明哲',
    coachId: 4,
    coachRating: 4.9,
    venueName: '',
    venueId: 0,
    distance: '上门服务',
    duration: 75,
    price: 1080,
    isHomeService: true,
    imageGradient: 'linear-gradient(135deg, #c0cde0, #b0bdd0)',
    thumbnail: 'https://picsum.photos/seed/fitflow-15/400/300',
    time: '提前两天预约',
    targetAudience: ['不便出门的脊柱侧弯患者', '需要家庭环境评估者', '术后居家康复期', '外地来沪不便者'],
    outline: ['居家环境与坐卧姿态评估', '床边矫正训练', '日常活动姿态指导', '家庭训练器械使用教学', '矫正体操跟练', '远程定期复查安排'],
  },
  {
    id: 403,
    title: '体态评估与矫正',
    coachName: '赵明哲',
    coachId: 4,
    coachRating: 4.9,
    venueName: '云栖普拉提',
    venueId: 4,
    distance: '5.8km',
    duration: 55,
    price: 480,
    isHomeService: false,
    imageGradient: 'linear-gradient(135deg, #d8dce8, #c8ccd8)',
    thumbnail: 'https://picsum.photos/seed/fitflow-14/400/300',
    time: '每周二、四、六 可约',
    targetAudience: ['体态不良人群', '高低肩、骨盆倾斜者', '圆肩驼背上班族', '运动前体态筛查需求者'],
    outline: ['全身静态与动态体态评估', '生物力学分析报告', '个性化矫正方案', '针对性肌肉激活训练', '错误动作模式纠正', '阶段性复评与方案调整'],
  },

  // ---- 周思琪 (Coach 5) ----
  {
    id: 501,
    title: '塑形私教·全身燃脂',
    coachName: '周思琪',
    coachId: 5,
    coachRating: 4.7,
    venueName: '悦动空间',
    venueId: 5,
    distance: '4.5km',
    duration: 50,
    price: 380,
    isHomeService: false,
    imageGradient: 'linear-gradient(135deg, #f8e0c0, #f0d0a8)',
    thumbnail: 'https://picsum.photos/seed/fitflow-18/400/300',
    time: '每周一至周日 可约',
    targetAudience: ['减脂塑形人群', '久坐导致腰腹松弛者', '产后身材恢复期', '希望提升基础代谢者'],
    outline: ['身体成分分析', '高强度间歇普拉提', '大肌群复合训练', '核心精准塑形', '有氧与力量结合', '饮食建议与生活指导'],
  },
  {
    id: 502,
    title: '核心轰炸·燃脂塑形',
    coachName: '周思琪',
    coachId: 5,
    coachRating: 4.7,
    venueName: '初心瑜伽普拉提',
    venueId: 6,
    distance: '6.2km',
    duration: 45,
    price: 320,
    isHomeService: false,
    imageGradient: 'linear-gradient(135deg, #f0d8b8, #e8c8a0)',
    thumbnail: 'https://picsum.photos/seed/fitflow-19/400/300',
    time: '每周一、三、五 12:00，周六 09:00',
    targetAudience: ['想快速燃脂的健身爱好者', '追求马甲线人群', '小班课爱好者', '核心力量薄弱者'],
    outline: ['核心激活热身', '多平面核心训练', '抗旋转与抗侧屈练习', '动态平衡挑战', '高强度循环组', '深层核心放松'],
  },
  {
    id: 503,
    title: '上门私教·减脂塑形',
    coachName: '周思琪',
    coachId: 5,
    coachRating: 4.7,
    venueName: '',
    venueId: 0,
    distance: '上门服务',
    duration: 60,
    price: 580,
    isHomeService: true,
    imageGradient: 'linear-gradient(135deg, #f0d0c0, #e8c0a8)',
    thumbnail: 'https://picsum.photos/seed/fitflow-15/400/300',
    time: '提前一天预约',
    targetAudience: ['不便到店的减脂人群', '需要居家训练方案者', '带娃妈妈', '对健身房有顾虑的初学者'],
    outline: ['居家环境适应性评估', '无器械自重训练', '弹力带抗阻塑形', '高强度间歇循环', '日常活动消耗提升策略', '远程饮食打卡督导'],
  },

  // ---- 王一鸣 (Coach 6) ----
  {
    id: 601,
    title: '青少年体态矫正·私教',
    coachName: '王一鸣',
    coachId: 6,
    coachRating: 4.8,
    venueName: 'BodyLab',
    venueId: 2,
    distance: '3.0km',
    duration: 55,
    price: 480,
    isHomeService: false,
    imageGradient: 'linear-gradient(135deg, #d8e8d0, #c8d8c0)',
    thumbnail: 'https://picsum.photos/seed/fitflow-18/400/300',
    time: '每周一至周五 15:00-19:00，周末全天',
    targetAudience: ['8-18岁青少年', '脊柱侧弯筛查异常者', '驼背、高低肩学生', '书包过重导致体态问题者'],
    outline: ['青少年体态全面评估', 'FMS功能性运动筛查', '趣味核心力量训练', '书包背负姿态纠正', '坐姿与写姿生物力学指导', '家庭日常体态管理方案', '生长发育期跟踪管理'],
  },
  {
    id: 602,
    title: '上门指导·青少年体态',
    coachName: '王一鸣',
    coachId: 6,
    coachRating: 4.8,
    venueName: '',
    venueId: 0,
    distance: '上门服务',
    duration: 60,
    price: 720,
    isHomeService: true,
    imageGradient: 'linear-gradient(135deg, #c0d8c0, #b0c8b0)',
    thumbnail: 'https://picsum.photos/seed/fitflow-15/400/300',
    time: '提前两天预约，周末优先',
    targetAudience: ['课业繁忙的初高中生', '家长不便接送的青少年', '需要书桌与睡姿评估者', '性格内向不愿去场馆的孩子'],
    outline: ['居家学习环境评估', '书桌椅高度调整建议', '写作业正确姿势指导', '睡前体态放松训练', '简易居家矫正练习', '家长配合指导方案'],
  },

  // ---- 刘凯文 (Coach 7) ----
  {
    id: 701,
    title: '筋膜放松·深层松解',
    coachName: '刘凯文',
    coachId: 7,
    coachRating: 4.6,
    venueName: 'BodyLab',
    venueId: 2,
    distance: '3.2km',
    duration: 50,
    price: 450,
    isHomeService: false,
    imageGradient: 'linear-gradient(135deg, #d0d0e0, #c0c0d0)',
    thumbnail: 'https://picsum.photos/seed/fitflow-17/400/300',
    time: '每周一至周六 可约',
    targetAudience: ['肌肉慢性紧张者', '运动后恢复需求者', '筋膜炎困扰人群', '久坐导致筋膜粘连者'],
    outline: ['全身筋膜链评估', '筋膜刀松解技术', '泡沫轴精准放松指导', '扳机点释放手法', '筋膜拉伸训练', '居家自我松解方案'],
  },
  {
    id: 702,
    title: '运动表现提升·私教',
    coachName: '刘凯文',
    coachId: 7,
    coachRating: 4.6,
    venueName: '悦动空间',
    venueId: 5,
    distance: '4.5km',
    duration: 60,
    price: 650,
    isHomeService: false,
    imageGradient: 'linear-gradient(135deg, #c0c8e0, #b0b8d0)',
    thumbnail: 'https://picsum.photos/seed/fitflow-18/400/300',
    time: '每周一至周五 可约',
    targetAudience: ['马拉松跑者', 'CrossFit爱好者', '球类运动爱好者', '希望突破运动瓶颈者'],
    outline: ['功能性动作筛查FMS', '动力链优化训练', '爆发力与稳定性结合', '多平面敏捷性训练', '专项运动动作模式纠正', '恢复策略与周期化训练方案'],
  },

  // ---- 杨子萱 (Coach 8) ----
  {
    id: 801,
    title: '冥想与呼吸·身心平衡',
    coachName: '杨子萱',
    coachId: 8,
    coachRating: 4.8,
    venueName: 'ZenSpace',
    venueId: 3,
    distance: '3.5km',
    duration: 60,
    price: 380,
    isHomeService: false,
    imageGradient: 'linear-gradient(135deg, #e8e0d8, #d8d0c8)',
    thumbnail: 'https://picsum.photos/seed/fitflow-19/400/300',
    time: '每周一至周日 可约',
    targetAudience: ['压力大的职场人士', '睡眠质量不佳者', '焦虑情绪困扰者', '寻求身心平衡的人群'],
    outline: ['呼吸模式评估与重建', '横膈膜呼吸训练', '引导式身体扫描冥想', '正念减压练习', '颂钵音疗体验', '日常情绪管理技巧'],
  },
  {
    id: 802,
    title: '中老年康复·关节养护',
    coachName: '杨子萱',
    coachId: 8,
    coachRating: 4.8,
    venueName: '初心瑜伽普拉提',
    venueId: 6,
    distance: '6.2km',
    duration: 55,
    price: 500,
    isHomeService: false,
    imageGradient: 'linear-gradient(135deg, #d8d0c8, #c8c0b8)',
    thumbnail: 'https://picsum.photos/seed/fitflow-16/400/300',
    time: '每周一、三、五 09:00-12:00',
    targetAudience: ['50岁以上中老年人', '膝关节炎困扰者', '肩周炎恢复期', '骨质疏松预防人群'],
    outline: ['关节活动度安全评估', '温和关节滑液激活', '低冲击力量训练', '平衡防跌倒训练', '步态优化练习', '日常起居关节保护指导'],
  },
]

/* ---------- Reviews ---------- */

export const reviews: Review[] = [
  {
    id: 1,
    userName: '小美妈妈',
    userAvatar: 'https://picsum.photos/seed/fitflow-20/100/100',
    rating: 5,
    tags: ['耐心细致', '体态明显改善', '专业负责'],
    content: '跟林老师上了三个月的体态矫正课，圆肩和头前伸的问题改善特别明显。林老师很耐心，每次上课都会讲解动作原理，不只是带着做动作。工作室环境也很好，推荐！',
    images: ['https://picsum.photos/seed/fitflow-21/200/200'],
    courseLabel: '核心床私教·体态矫正',
    classCount: 24,
    date: '2026-04-28',
  },
  {
    id: 2,
    userName: 'AndyChen',
    userAvatar: 'https://picsum.photos/seed/fitflow-22/100/100',
    rating: 5,
    tags: ['康复效果显著', '专业度高', '认真负责'],
    content: '因为长期加班导致腰部不适，经朋友推荐找到陈教练。上了10节课后腰部疼痛明显缓解，陈教练还给了一套日常训练方案，在家也能练。非常专业的康复型教练！',
    images: ['https://picsum.photos/seed/fitflow-23/200/200'],
    courseLabel: '康复私教·腰部护理',
    classCount: 10,
    date: '2026-04-25',
  },
  {
    id: 3,
    userName: '静静',
    userAvatar: 'https://picsum.photos/seed/fitflow-24/100/100',
    rating: 5,
    tags: ['温柔体贴', '产后恢复快', '像朋友一样'],
    content: '产后42天开始跟苏老师上课，现在产后半年，腹直肌分离从3指恢复到不到1指，肚子也平了很多！苏老师真的很懂妈妈的需求，每次上课都很放松和舒服。',
    images: ['https://picsum.photos/seed/fitflow-25/200/200'],
    courseLabel: '上门私教·产后修复',
    classCount: 20,
    date: '2026-04-20',
  },
  {
    id: 4,
    userName: '晨晨爸爸',
    userAvatar: 'https://picsum.photos/seed/fitflow-26/100/100',
    rating: 5,
    tags: ['脊柱侧弯明显改善', '细致专业', '孩子很喜欢'],
    content: '女儿今年14岁，体检发现有20度的脊柱侧弯，经朋友介绍找到了赵教练。上了半年课，最近复查度数降到了14度，体态肉眼可见地变好了。赵教练对青少年非常有耐心，女儿每次上课都很积极。',
    images: ['https://picsum.photos/seed/fitflow-27/200/200'],
    courseLabel: '脊柱侧弯矫正·私教',
    classCount: 36,
    date: '2026-04-30',
  },
  {
    id: 5,
    userName: '王芳',
    userAvatar: 'https://picsum.photos/seed/fitflow-28/100/100',
    rating: 4,
    tags: ['小班课氛围好', '学到很多', '性价比高'],
    content: '小班课氛围比较轻松，每次大概四五个人，林老师也能照顾到每个人。学了不少日常护脊的小技巧，上班坐着的时候会有意识地注意坐姿了。如果能再多开一些周末班就更好了。',
    images: [],
    courseLabel: '小班课·脊柱保养',
    classCount: 8,
    date: '2026-04-22',
  },
  {
    id: 6,
    userName: 'DavidZhang',
    userAvatar: 'https://picsum.photos/seed/fitflow-29/100/100',
    rating: 4,
    tags: ['上门方便', '肩颈舒服多了', '认真负责'],
    content: '程序员一枚，肩颈问题困扰多年，严重的时候还会引发偏头痛。陈教练上门服务很方便，省去了下班后再跑场馆的麻烦。六节课下来肩颈松弛了不止一个等级，而且教练还专门帮我调了显示器和座椅高度。',
    images: ['https://picsum.photos/seed/fitflow-23/200/200'],
    courseLabel: '上门康复·肩颈调理',
    classCount: 6,
    date: '2026-04-18',
  },
  {
    id: 7,
    userName: '小雨',
    userAvatar: 'https://picsum.photos/seed/fitflow-20/100/100',
    rating: 5,
    tags: ['燃脂效果好', '教练超有活力', '瘦了5斤'],
    content: '被周老师的活力感染了！上课节奏很快但很嗨，一节课下来满头大汗，两个月瘦了5斤，腰围小了6厘米。特别是那个核心轰炸课，每次上完都觉得自己腹肌在燃烧哈哈。推荐给想瘦的姐妹们。',
    images: ['https://picsum.photos/seed/fitflow-30/200/200'],
    courseLabel: '塑形私教·全身燃脂',
    classCount: 16,
    date: '2026-04-26',
  },
  {
    id: 8,
    userName: '孕妈小雪',
    userAvatar: 'https://picsum.photos/seed/fitflow-24/100/100',
    rating: 5,
    tags: ['孕期非常安心', '专业安全', '生得很顺利'],
    content: '孕期26周开始跟苏老师上课，最开始还担心孕期运动会不安全，但苏老师每个动作都讲得很清楚，力度把控得非常好。整个孕期状态都很好，顺产也很顺利。宝妈们放心选苏老师！',
    images: [],
    courseLabel: '孕期私教·舒缓调理',
    classCount: 12,
    date: '2026-04-15',
  },
  {
    id: 9,
    userName: 'Linda陈',
    userAvatar: 'https://picsum.photos/seed/fitflow-28/100/100',
    rating: 3,
    tags: ['效果尚可', '预约不太方便', '价格偏贵'],
    content: '膝关节训练的效果还是有一些的，上了五六节课上下楼梯明显没那么疼了。但是陈教练的课太难约了，好几次想约周末都满了，而且550一节课确实不便宜……希望平台能多给点优惠吧。',
    images: [],
    courseLabel: '运动康复·膝关节养护',
    classCount: 6,
    date: '2026-04-12',
  },
  {
    id: 10,
    userName: '嘉豪爸爸',
    userAvatar: 'https://picsum.photos/seed/fitflow-22/100/100',
    rating: 5,
    tags: ['孩子体态明显变好', '教练很会教孩子', '效果满意'],
    content: '儿子上初二，从小有点驼背，加上天天背个十几斤的书包，体态问题越来越严重。王教练特别会跟孩子沟通，用游戏化的方式引导训练，完全不枯燥。三个月下来驼背改善特别明显，人也挺拔了很多。',
    images: ['https://picsum.photos/seed/fitflow-21/200/200'],
    courseLabel: '青少年体态矫正·私教',
    classCount: 20,
    date: '2026-04-19',
  },
  {
    id: 11,
    userName: '跑者阿杰',
    userAvatar: 'https://picsum.photos/seed/fitflow-29/100/100',
    rating: 4,
    tags: ['筋膜松解透彻', '跑后恢复快', '专业到位'],
    content: '跑马拉松的，备赛期肌肉经常紧绷。刘教练的筋膜刀手法真的很到位，每次做完松解整个腿都轻了，第二天恢复明显变快。建议跑友们定期做一次筋膜维护，比光拉伸有效太多了。',
    images: [],
    courseLabel: '筋膜放松·深层松解',
    classCount: 8,
    date: '2026-04-23',
  },
  {
    id: 12,
    userName: '小鹿',
    userAvatar: 'https://picsum.photos/seed/fitflow-20/100/100',
    rating: 5,
    tags: ['内心平静很多', '睡眠改善了', '老师声音很治愈'],
    content: '工作压力大的时候就来上一节冥想课，一个小时后整个人像被重置了一样。杨老师的声音特别治愈，引导你一步步放松。以前经常失眠，现在睡前做老师教的呼吸练习，入睡快了很多。已经安利给好几个朋友了。',
    images: ['https://picsum.photos/seed/fitflow-25/200/200'],
    courseLabel: '冥想与呼吸·身心平衡',
    classCount: 14,
    date: '2026-04-29',
  },
  {
    id: 13,
    userName: '老周',
    userAvatar: 'https://picsum.photos/seed/fitflow-26/100/100',
    rating: 4,
    tags: ['适合老年人', '关节不那么疼了', '教练很温和'],
    content: '退休后开始关注身体健康，膝关节老毛病多年了。在杨老师这里练了两个月，上下楼梯膝盖不那么疼了，走路也比以前轻快。动作节奏很舒缓，完全不用担心跟不上。中老年人的福音。',
    images: [],
    courseLabel: '中老年康复·关节养护',
    classCount: 16,
    date: '2026-04-24',
  },
  {
    id: 14,
    userName: '晓雯',
    userAvatar: 'https://picsum.photos/seed/fitflow-24/100/100',
    rating: 5,
    tags: ['二胎恢复神速', '服务周到', '妈妈值得拥有'],
    content: '二胎产后三个月开始跟苏老师上门训练，比一胎时自己瞎练效果好太多！盆底肌恢复、腹直肌闭合都比一胎快，而且在家上课太方便了，喂完奶直接开练。苏老师还分享了好多产后营养和情绪调节的小经验。',
    images: ['https://picsum.photos/seed/fitflow-21/200/200'],
    courseLabel: '上门私教·产后修复',
    classCount: 18,
    date: '2026-04-27',
  },
  {
    id: 15,
    userName: '思远',
    userAvatar: 'https://picsum.photos/seed/fitflow-22/100/100',
    rating: 5,
    tags: ['练完超爽', '价格实惠', '教练热情'],
    content: '被朋友安利来的，说这个核心轰炸课性价比巨高。45分钟的课排得特别紧凑，一个接一个动作根本停不下来，练完衬衫能拧出水。才320一节课，在上海算很良心了。周老师还会拉群监督打卡，特别负责！',
    images: [],
    courseLabel: '核心轰炸·燃脂塑形',
    classCount: 22,
    date: '2026-05-01',
  },
]

/* ---------- Schedule Items ---------- */

export interface Event {
  id: number
  title: string
  type: string
  date: string
  time: string
  venue: string
  image: string
  price: string
  totalSpots: number
  filledSpots: number
  tags: string[]
}

export const events: Event[] = [
  {
    id: 1, title: '春日垫上普拉提 · 公园晨练', type: '户外',
    date: '2026-05-17', time: '08:00 - 09:30',
    venue: '徐汇滨江公园', image: 'https://picsum.photos/seed/event-outdoor/400/240',
    price: '免费', totalSpots: 30, filledSpots: 18,
    tags: ['户外', '垫上', '新手友好'],
  },
  {
    id: 2, title: '产后恢复专题工作坊', type: '工作坊',
    date: '2026-05-24', time: '14:00 - 16:30',
    venue: '梵音普拉提馆', image: 'https://picsum.photos/seed/event-workshop/400/240',
    price: '¥128', totalSpots: 20, filledSpots: 12,
    tags: ['工作坊', '产后恢复', '限20人'],
  },
  {
    id: 3, title: '普拉提社交之夜 · 教练面对面', type: '社交',
    date: '2026-05-31', time: '19:00 - 21:00',
    venue: 'ZenSpace', image: 'https://picsum.photos/seed/event-social/400/240',
    price: '免费', totalSpots: 50, filledSpots: 35,
    tags: ['社交', '教练交流', '轻食'],
  },
  {
    id: 4, title: '核心床进阶技术分享', type: '工作坊',
    date: '2026-06-07', time: '10:00 - 12:00',
    venue: '悦动空间', image: 'https://picsum.photos/seed/event-tech/400/240',
    price: '¥198', totalSpots: 15, filledSpots: 8,
    tags: ['工作坊', '核心床', '进阶'],
  },
]

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
  {
    id: 4,
    courseName: '孕期私教·舒缓调理',
    coachName: '苏曼',
    venueName: 'ZenSpace',
    isHomeService: false,
    date: '2026-05-11',
    time: '09:00 - 09:45',
    status: 'upcoming',
    hasCheckIn: false,
  },
  {
    id: 5,
    courseName: '脊柱侧弯矫正·私教',
    coachName: '赵明哲',
    venueName: '梵音普拉提馆',
    isHomeService: false,
    date: '2026-05-18',
    time: '15:30 - 16:30',
    status: 'upcoming',
    hasCheckIn: false,
  },
  {
    id: 6,
    courseName: '塑形私教·全身燃脂',
    coachName: '周思琪',
    venueName: '悦动空间',
    isHomeService: false,
    date: '2026-05-23',
    time: '11:00 - 11:50',
    status: 'upcoming',
    hasCheckIn: false,
  },
  {
    id: 7,
    courseName: '小班课·脊柱保养',
    coachName: '林悦然',
    venueName: '梵音普拉提馆',
    isHomeService: false,
    date: '2026-05-15',
    time: '13:00 - 14:00',
    status: 'confirmed',
    hasCheckIn: false,
  },
  {
    id: 8,
    courseName: '青少年体态矫正·私教',
    coachName: '王一鸣',
    venueName: 'BodyLab',
    isHomeService: false,
    date: '2026-05-20',
    time: '17:00 - 17:55',
    status: 'confirmed',
    hasCheckIn: false,
  },
  {
    id: 9,
    courseName: '上门康复·肩颈调理',
    coachName: '陈正阳',
    venueName: '',
    isHomeService: true,
    date: '2026-05-04',
    time: '10:00 - 11:00',
    status: 'completed',
    hasCheckIn: false,
  },
  {
    id: 10,
    courseName: '女性健康·盆底肌训练',
    coachName: '苏曼',
    venueName: 'ZenSpace',
    isHomeService: false,
    date: '2026-05-06',
    time: '10:30 - 11:20',
    status: 'completed',
    hasCheckIn: false,
  },
  {
    id: 11,
    courseName: '筋膜放松·深层松解',
    coachName: '刘凯文',
    venueName: 'BodyLab',
    isHomeService: false,
    date: '2026-05-09',
    time: '14:00 - 14:50',
    status: 'completed',
    hasCheckIn: false,
  },
  {
    id: 12,
    courseName: '冥想与呼吸·身心平衡',
    coachName: '杨子萱',
    venueName: '初心瑜伽普拉提',
    isHomeService: false,
    date: '2026-05-13',
    time: '16:00 - 17:00',
    status: 'cancelled',
    hasCheckIn: false,
  },
]
