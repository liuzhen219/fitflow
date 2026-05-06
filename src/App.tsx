import { HashRouter, Routes, Route, useNavigate, useLocation, Outlet } from 'react-router-dom'
import { useState, lazy, Suspense } from 'react'
import { TabBar, SpinLoading } from 'antd-mobile'
import { AppOutline } from 'antd-mobile-icons'

import { AppProvider } from './store/AppContext'
import {
  BuildingIcon,
  HomeServiceIcon,
  CalendarIcon,
  UserIcon,
} from './components/Icons'

// Eager: 5 tab pages (always needed)
import Home from './pages/Home'
import StudioCourses from './pages/StudioCourses'
import HomeService from './pages/HomeService'
import Schedule from './pages/Schedule'
import Profile from './pages/Profile'

// Lazy: everything else
const Splash = lazy(() => import('./pages/Splash'))
const Login = lazy(() => import('./pages/Login'))
const CoachProfile = lazy(() => import('./pages/CoachProfile'))
const VenueProfile = lazy(() => import('./pages/VenueProfile'))
const CourseDetail = lazy(() => import('./pages/CourseDetail'))
const BookingConfirm = lazy(() => import('./pages/BookingConfirm'))
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'))
const CheckIn = lazy(() => import('./pages/CheckIn'))
const PostReview = lazy(() => import('./pages/PostReview'))
const Search = lazy(() => import('./pages/Search'))
const OrderList = lazy(() => import('./pages/OrderList'))
const Events = lazy(() => import('./pages/Events'))
const EventDetail = lazy(() => import('./pages/EventDetail'))
const UserProfile = lazy(() => import('./pages/UserProfile'))
const Settings = lazy(() => import('./pages/Settings'))
const TrainingArchive = lazy(() => import('./pages/TrainingArchive'))
const Notifications = lazy(() => import('./pages/Notifications'))
const Venues = lazy(() => import('./pages/Venues'))
const MembershipCard = lazy(() => import('./pages/MembershipCard'))
const Support = lazy(() => import('./pages/Support'))
const Coupons = lazy(() => import('./pages/Coupons'))
const FollowedCoaches = lazy(() => import('./pages/FollowedCoaches'))
const FollowedVenues = lazy(() => import('./pages/FollowedVenues'))
const Addresses = lazy(() => import('./pages/Addresses'))
const Favorites = lazy(() => import('./pages/Favorites'))
const Feed = lazy(() => import('./pages/Feed'))
const Wallet = lazy(() => import('./pages/Wallet'))
const Invite = lazy(() => import('./pages/Invite'))
const PointsShop = lazy(() => import('./pages/PointsShop'))

function PageLoader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <SpinLoading color="var(--c-accent)" style={{ '--size': '32px' }} />
    </div>
  )
}

const tabs = [
  { key: '/home', title: '首页', icon: (active: boolean) => <AppOutline fontSize={22} color={active ? 'var(--c-accent)' : '#6a6a6a'} /> },
  { key: '/studio', title: '场馆课程', icon: (active: boolean) => <BuildingIcon size={22} color={active ? 'var(--c-accent)' : '#6a6a6a'} /> },
  { key: '/homeservice', title: '上门服务', icon: (active: boolean) => <HomeServiceIcon size={22} color={active ? 'var(--c-accent)' : '#6a6a6a'} /> },
  { key: '/schedule', title: '约课', icon: (active: boolean) => <CalendarIcon size={22} color={active ? 'var(--c-accent)' : '#6a6a6a'} /> },
  { key: '/profile', title: '我的', icon: (active: boolean) => <UserIcon size={22} color={active ? 'var(--c-accent)' : '#6a6a6a'} /> },
]

function TabLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [bounceTab, setBounceTab] = useState<string | null>(null)

  const activeKey = '/' + location.pathname.split('/').filter(Boolean)[0] || '/home'

  const handleChange = (key: string) => {
    if (key !== activeKey) {
      setBounceTab(key)
      setTimeout(() => setBounceTab(null), 400)
    }
    navigate(key)
  }

  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <TabBar
        activeKey={tabs.some(t => t.key === activeKey) ? activeKey : undefined}
        onChange={handleChange}
        safeArea
        style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100 }}
      >
        {tabs.map(tab => (
          <TabBar.Item
            key={tab.key}
            icon={
              <span className={bounceTab === tab.key ? 'tab-bounce' : ''}>
                {tab.icon(activeKey === tab.key)}
              </span>
            }
            title={tab.title}
          />
        ))}
      </TabBar>
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route element={<TabLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/studio" element={<StudioCourses />} />
              <Route path="/homeservice" element={<HomeService />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/coach/:id" element={<CoachProfile />} />
            <Route path="/venue/:id" element={<VenueProfile />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/booking/:id" element={<BookingConfirm />} />
            <Route path="/payment-success/:bookingId/:courseId" element={<PaymentSuccess />} />
            <Route path="/checkin/:id" element={<CheckIn />} />
            <Route path="/review/:id" element={<PostReview />} />
            <Route path="/review/coach/:id" element={<PostReview />} />
            <Route path="/search" element={<Search />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/events" element={<Events />} />
            <Route path="/event/:id" element={<EventDetail />} />
            <Route path="/user/:name" element={<UserProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/training" element={<TrainingArchive />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/venues" element={<Venues />} />
            <Route path="/membership" element={<MembershipCard />} />
            <Route path="/support" element={<Support />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/followed-coaches" element={<FollowedCoaches />} />
            <Route path="/followed-venues" element={<FollowedVenues />} />
            <Route path="/addresses" element={<Addresses />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/invite" element={<Invite />} />
            <Route path="/points-shop" element={<PointsShop />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </AppProvider>
  )
}
