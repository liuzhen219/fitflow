import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react'
import {
  scheduleItems as initialScheduleItems,
  feedPosts as initialFeedPosts,
  notifications as initialNotifications,
  userProfile,
  type ScheduleItem,
  type CourseItem,
  type FeedPost,
  type Comment,
  type Notification,
  type Review,
  reviews as initialReviews,
} from '../data/mock'

interface BookingInput {
  course: CourseItem
  date: string
  timeSlot: string
}

export interface Address {
  id: number
  tag: string
  name: string
  phone: string
  full: string
  isDefault: boolean
}

export interface Coupon {
  id: number
  name: string
  value: number
  desc: string
  minOrder: number
  expireDate: string
  status: 'active' | 'used' | 'expired'
  color: string
}

const initialCoupons: Coupon[] = [
  { id: 1, name: '新人专享券', value: 30, desc: '满 ¥300 可用', minOrder: 300, expireDate: '2026-06-30', status: 'active', color: '#E3617B' },
  { id: 2, name: '季卡专属券', value: 50, desc: '季卡续费可用', minOrder: 0, expireDate: '2026-07-15', status: 'active', color: '#2C8A9E' },
  { id: 3, name: '好友推荐券', value: 20, desc: '无门槛', minOrder: 0, expireDate: '2026-05-20', status: 'active', color: '#16A34A' },
  { id: 4, name: '春节活动券', value: 100, desc: '满 ¥800 可用', minOrder: 800, expireDate: '2026-02-28', status: 'expired', color: '#6a6a6a' },
  { id: 5, name: '双十一特惠券', value: 80, desc: '满 ¥500 可用', minOrder: 500, expireDate: '2025-12-31', status: 'expired', color: '#6a6a6a' },
]

const initialAddresses: Address[] = [
  { id: 1, tag: '家', name: '李女士', phone: '138****6789', full: '上海市徐汇区衡山路8弄3号1201室', isDefault: true },
  { id: 2, tag: '公司', name: '李女士', phone: '138****6789', full: '上海市静安区南京西路1515号静安嘉里中心18F', isDefault: false },
  { id: 3, tag: '父母家', name: '李建国', phone: '139****1234', full: '上海市浦东新区张杨路500号华润时代广场对面小区2号楼301', isDefault: false },
]

export interface PaymentRecord {
  id: number
  type: 'recharge' | 'pay' | 'refund'
  label: string
  time: string
  amount: number
}

const initialPayments: PaymentRecord[] = [
  { id: 1, type: 'recharge', label: '余额充值', time: '2026-04-15 14:30', amount: 200 },
  { id: 2, type: 'refund', label: '课程取消退款', time: '2026-04-20 09:15', amount: 380 },
  { id: 3, type: 'pay', label: '核心床私教·体态矫正', time: '2026-04-28 16:00', amount: -420 },
  { id: 4, type: 'pay', label: '冥想与呼吸·身心平衡', time: '2026-05-03 10:00', amount: -380 },
]

export interface MembershipCard {
  id: number
  type: string
  name: string
  total: number
  used: number
  unit: string
  issueDate: string
  expiryDate: string
  color: string
  status: 'active' | 'expired'
}

const initialMembershipCards: MembershipCard[] = [
  { id: 1, type: '年卡', name: 'FitFlow 年度畅练卡', total: 120, used: 38, unit: '次', issueDate: '2026-01-15', expiryDate: '2027-01-14', color: 'linear-gradient(135deg, #E3617B, #D44A65)', status: 'active' },
  { id: 2, type: '季卡', name: 'FitFlow 季度体验卡', total: 30, used: 12, unit: '次', issueDate: '2026-04-01', expiryDate: '2026-06-30', color: 'linear-gradient(135deg, #219EA5, #177D85)', status: 'active' },
  { id: 3, type: '次卡', name: 'FitFlow 十次体验卡', total: 10, used: 10, unit: '次', issueDate: '2025-10-20', expiryDate: '2026-04-20', color: 'linear-gradient(135deg, #6a6a6a, #444)', status: 'expired' },
]

const availablePlans = [
  { id: 'plan-10', name: '十次体验卡', total: 10, price: 880, desc: '适合初次体验普拉提' },
  { id: 'plan-30', name: '季度畅练卡', total: 30, price: 2280, desc: '每周2-3次，稳步提升' },
  { id: 'plan-120', name: '年度畅练卡', total: 120, price: 6880, desc: '全年无限可能，每节仅¥57' },
]

export interface PointsRecord {
  id: number
  type: 'earn' | 'spend'
  reason: string
  amount: number
  time: string
}

const initialPointsRecords: PointsRecord[] = [
  { id: 1, type: 'earn', reason: '邀请好友注册', amount: 50, time: '2026-04-20 10:30' },
  { id: 2, type: 'earn', reason: '分享优质内容', amount: 10, time: '2026-04-22 15:00' },
  { id: 3, type: 'spend', reason: '兑换按摩球一对', amount: -80, time: '2026-04-25 09:00' },
  { id: 4, type: 'earn', reason: '邀请好友注册', amount: 50, time: '2026-05-01 14:00' },
]

interface PublishInput {
  content: string
  courseLabel: string
  coachName: string
  images?: string[]
}

interface AppState {
  scheduleItems: ScheduleItem[]
  addBooking: (input: BookingInput) => ScheduleItem
  cancelBooking: (id: number) => void
  checkInBooking: (id: number) => void
  feedPosts: FeedPost[]
  toggleLike: (postId: number) => void
  addComment: (postId: number, content: string) => void
  publishPost: (input: PublishInput) => void
  addresses: Address[]
  addAddress: (addr: Omit<Address, 'id' | 'isDefault'>) => void
  updateAddress: (id: number, addr: Omit<Address, 'id' | 'isDefault'>) => void
  removeAddress: (id: number) => void
  setDefaultAddress: (id: number) => void
  coupons: Coupon[]
  balance: number
  paymentRecords: PaymentRecord[]
  useCoupon: (id: number) => void
  recharge: (amount: number) => void
  payWithBalance: (amount: number, label: string) => boolean
  points: number
  pointsRecords: PointsRecord[]
  earnPoints: (amount: number, reason: string) => void
  spendPoints: (amount: number, item: string) => boolean
  gender: 'female' | 'male'
  setGender: (g: 'female' | 'male') => void
  registeredEventIds: number[]
  registerForEvent: (eventId: number, eventTitle: string) => boolean
  membershipCards: MembershipCard[]
  purchaseMembership: (planId: string) => boolean
  userReviews: Review[]
  addReview: (review: Omit<Review, 'id'>) => void
  notifications: Notification[]
  markNotificationRead: (id: number) => void
  markAllNotificationsRead: () => void
}

function computeEndTime(startTime: string, durationMinutes: number): string {
  const [h, m] = startTime.split(':').map(Number)
  const total = h * 60 + m + durationMinutes
  const eh = Math.floor(total / 60) % 24
  const em = total % 60
  return `${String(eh).padStart(2, '0')}:${String(em).padStart(2, '0')}`
}

const AppContext = createContext<AppState | null>(null)

function loadPersisted<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`fitflow_${key}`)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}

function persist(key: string, value: unknown) {
  try { localStorage.setItem(`fitflow_${key}`, JSON.stringify(value)) } catch { /* quota exceeded */ }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>(() => loadPersisted('scheduleItems', initialScheduleItems))
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(() => loadPersisted('feedPosts', initialFeedPosts))
  const [addresses, setAddresses] = useState<Address[]>(() => loadPersisted('addresses', initialAddresses))
  const [coupons, setCoupons] = useState<Coupon[]>(() => loadPersisted('coupons', initialCoupons))
  const [balance, setBalance] = useState(() => loadPersisted('balance', 200))
  const [paymentRecords, setPaymentRecords] = useState<PaymentRecord[]>(() => loadPersisted('paymentRecords', initialPayments))
  const [notifications, setNotifications] = useState<Notification[]>(() => loadPersisted('notifications', initialNotifications))
  const [points, setPoints] = useState(() => loadPersisted('points', 120))
  const [pointsRecords, setPointsRecords] = useState<PointsRecord[]>(() => loadPersisted('pointsRecords', initialPointsRecords))
  const [gender, setGenderState] = useState<'female' | 'male'>(() => {
    const stored = localStorage.getItem('fitflow_theme')
    return stored === 'male' ? 'male' : 'female'
  })
  const [registeredEventIds, setRegisteredEventIds] = useState<number[]>(() => loadPersisted('registeredEventIds', []))
  const [membershipCards, setMembershipCards] = useState<MembershipCard[]>(() => loadPersisted('membershipCards', initialMembershipCards))
  const [userReviews, setUserReviews] = useState<Review[]>(() => loadPersisted('userReviews', initialReviews))

  // Persist key state to localStorage
  useEffect(() => { persist('scheduleItems', scheduleItems) }, [scheduleItems])
  useEffect(() => { persist('feedPosts', feedPosts) }, [feedPosts])
  useEffect(() => { persist('addresses', addresses) }, [addresses])
  useEffect(() => { persist('coupons', coupons) }, [coupons])
  useEffect(() => { persist('balance', balance) }, [balance])
  useEffect(() => { persist('paymentRecords', paymentRecords) }, [paymentRecords])
  useEffect(() => { persist('notifications', notifications) }, [notifications])
  useEffect(() => { persist('points', points) }, [points])
  useEffect(() => { persist('pointsRecords', pointsRecords) }, [pointsRecords])
  useEffect(() => { persist('registeredEventIds', registeredEventIds) }, [registeredEventIds])
  useEffect(() => { persist('membershipCards', membershipCards) }, [membershipCards])
  useEffect(() => { persist('userReviews', userReviews) }, [userReviews])

  const addBooking = useCallback(({ course, date, timeSlot }: BookingInput): ScheduleItem => {
    const endTime = computeEndTime(timeSlot, course.duration)
    const newItem: ScheduleItem = {
      id: Date.now(),
      courseName: course.title,
      coachId: course.coachId,
      coachName: course.coachName,
      venueName: course.isHomeService ? '' : course.venueName,
      isHomeService: course.isHomeService,
      date,
      time: `${timeSlot} - ${endTime}`,
      status: 'upcoming',
      hasCheckIn: false,
    }
    setScheduleItems(prev => [newItem, ...prev])
    setNotifications(prev => [{
      id: Date.now() + 1,
      type: 'course',
      title: '预约成功',
      content: `你已成功预约「${course.title}」· ${course.coachName} · ${date} ${timeSlot}`,
      time: '刚刚',
      read: false,
      link: '/schedule',
    }, ...prev])
    return newItem
  }, [])

  const cancelBooking = useCallback((id: number) => {
    setScheduleItems(prev => {
      const item = prev.find(s => s.id === id)
      if (item) {
        setNotifications(prevN => [{
          id: Date.now(),
          type: 'course',
          title: '课程已取消',
          content: `「${item.courseName}」${item.date} ${item.time} 已取消`,
          time: '刚刚',
          read: false,
        }, ...prevN])
      }
      return prev.map(item => item.id === id ? { ...item, status: 'cancelled' as const } : item)
    })
  }, [])

  const checkInBooking = useCallback((id: number) => {
    setScheduleItems(prev =>
      prev.map(item => item.id === id ? { ...item, status: 'completed' as const, hasCheckIn: true } : item)
    )
  }, [])

  const toggleLike = useCallback((postId: number) => {
    setFeedPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p
        const wasLiked = p.liked
        return { ...p, liked: !wasLiked, likes: p.likes + (wasLiked ? -1 : 1) }
      })
    )
  }, [])

  const addComment = useCallback((postId: number, content: string) => {
    const newComment: Comment = {
      id: Date.now(),
      userName: userProfile.name,
      userAvatar: userProfile.avatar,
      content,
      time: '刚刚',
    }
    setFeedPosts(prev =>
      prev.map(p => {
        if (p.id !== postId) return p
        return { ...p, comments: [...p.comments, newComment] }
      })
    )
  }, [])

  const publishPost = useCallback((input: PublishInput) => {
    const newPost: FeedPost = {
      id: Date.now(),
      userName: userProfile.name,
      userAvatar: userProfile.avatar,
      content: input.content,
      images: input.images || [],
      courseLabel: input.courseLabel,
      coachName: input.coachName,
      likes: 0,
      liked: false,
      comments: [],
      time: '刚刚',
    }
    setFeedPosts(prev => [newPost, ...prev])
  }, [])

  const addAddress = useCallback((addr: Omit<Address, 'id' | 'isDefault'>) => {
    const newAddr: Address = { ...addr, id: Date.now(), isDefault: false }
    setAddresses(prev => [...prev, newAddr])
  }, [])

  const updateAddress = useCallback((id: number, addr: Omit<Address, 'id' | 'isDefault'>) => {
    setAddresses(prev => prev.map(a => a.id === id ? { ...a, ...addr } : a))
  }, [])

  const removeAddress = useCallback((id: number) => {
    setAddresses(prev => prev.filter(a => a.id !== id))
  }, [])

  const setDefaultAddress = useCallback((id: number) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })))
  }, [])

  const addNotification = useCallback((notif: Omit<Notification, 'id'>) => {
    const newNotif: Notification = { ...notif, id: Date.now() }
    setNotifications(prev => [newNotif, ...prev])
  }, [])

  const recharge = useCallback((amount: number) => {
    setBalance(prev => prev + amount)
    setPaymentRecords(prev => [{
      id: Date.now(),
      type: 'recharge',
      label: '余额充值',
      time: new Date().toLocaleString('zh-CN', { hour12: false }),
      amount,
    }, ...prev])
    addNotification({
      type: 'system', title: '充值成功',
      content: `已成功充值 ¥${amount}，当前余额 ¥${balance + amount}`,
      time: '刚刚', read: false,
    })
  }, [balance, addNotification])

  const payWithBalance = useCallback((amount: number, label: string): boolean => {
    // balance is stale in the closure — use a ref or check via setState callback
    // We'll use a workaround: check via the setter's return pattern
    const useRef = { current: balance }
    if (useRef.current < amount) return false
    setBalance(prev => prev - amount)
    setPaymentRecords(prev => [{
      id: Date.now(),
      type: 'pay',
      label,
      time: new Date().toLocaleString('zh-CN', { hour12: false }),
      amount: -amount,
    }, ...prev])
    return true
  }, [balance])

  const earnPoints = useCallback((amount: number, reason: string) => {
    setPoints(prev => prev + amount)
    setPointsRecords(prev => [{
      id: Date.now(), type: 'earn', reason, amount,
      time: new Date().toLocaleString('zh-CN', { hour12: false }),
    }, ...prev])
    addNotification({
      type: 'system', title: '积分到账',
      content: `${reason}，获得 +${amount} 积分`,
      time: '刚刚', read: false,
    })
  }, [addNotification])

  const registerForEvent = useCallback((eventId: number, eventTitle: string): boolean => {
    let ok = false
    setRegisteredEventIds(prev => {
      if (prev.includes(eventId)) return prev
      ok = true
      return [...prev, eventId]
    })
    if (ok) {
      addNotification({
        type: 'activity', title: '活动报名成功',
        content: `你已成功报名「${eventTitle}」，请按时参加`,
        time: '刚刚', read: false, link: `/event/${eventId}`,
      })
    }
    return ok
  }, [addNotification])

  const addReview = useCallback((review: Omit<Review, 'id'>) => {
    const newReview: Review = { ...review, id: Date.now() }
    setUserReviews(prev => [newReview, ...prev])
    addNotification({
      type: 'review', title: '评价发表成功',
      content: `你对「${review.courseLabel}」的评价已发布`,
      time: '刚刚', read: false,
    })
  }, [addNotification])

  const purchaseMembership = useCallback((planId: string): boolean => {
    const plan = availablePlans.find(p => p.id === planId)
    if (!plan) return false
    const newCard: MembershipCard = {
      id: Date.now(),
      type: plan.name.includes('年度') ? '年卡' : plan.name.includes('季度') ? '季卡' : '次卡',
      name: `FitFlow ${plan.name}`,
      total: plan.total,
      used: 0,
      unit: '次',
      issueDate: new Date().toISOString().slice(0, 10),
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      color: 'linear-gradient(135deg, var(--c-accent), var(--c-accent-deep))',
      status: 'active',
    }
    setMembershipCards(prev => [newCard, ...prev])
    addNotification({
      type: 'system', title: '会员卡开通成功',
      content: `你已成功购买「${plan.name}」，共 ${plan.total} 次`,
      time: '刚刚', read: false, link: '/membership',
    })
    return true
  }, [addNotification])

  const setGender = useCallback((g: 'female' | 'male') => {
    setGenderState(g)
    document.documentElement.setAttribute('data-theme', g === 'male' ? 'male' : '')
    localStorage.setItem('fitflow_theme', g)
  }, [])

  // Use a ref to track latest points for synchronous read in spendPoints
  const pointsRef = useRef(points)
  pointsRef.current = points

  const spendPoints = useCallback((amount: number, item: string): boolean => {
    if (pointsRef.current < amount) return false
    setPoints(prev => prev - amount)
    setPointsRecords(prev => [{
      id: Date.now(), type: 'spend', reason: item, amount: -amount,
      time: new Date().toLocaleString('zh-CN', { hour12: false }),
    }, ...prev])
    return true
  }, [])

  const markNotificationRead = useCallback((id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }, [])

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const useCoupon = useCallback((id: number) => {
    setCoupons(prev =>
      prev.map(c => c.id === id ? { ...c, status: 'used' as const } : c)
    )
    const coupon = coupons.find(c => c.id === id)
    if (coupon) {
      addNotification({
        type: 'system', title: '优惠券已使用',
        content: `「${coupon.name}」已成功抵扣 ¥${coupon.value}`,
        time: '刚刚', read: false,
      })
    }
  }, [coupons, addNotification])

  return (
    <AppContext.Provider value={{
      scheduleItems, addBooking, cancelBooking, checkInBooking,
      feedPosts, toggleLike, addComment, publishPost,
      addresses, addAddress, updateAddress, removeAddress, setDefaultAddress,
      coupons, balance, paymentRecords, useCoupon, recharge, payWithBalance,
      points, pointsRecords, earnPoints, spendPoints,
      gender, setGender,
      registeredEventIds, registerForEvent,
      membershipCards, purchaseMembership,
      userReviews, addReview,
      notifications, markNotificationRead, markAllNotificationsRead,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppState() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppState must be used inside AppProvider')
  return ctx
}
