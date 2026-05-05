import { HashRouter, Routes, Route, useNavigate, useLocation, Outlet } from 'react-router-dom'
import { TabBar } from 'antd-mobile'
import { AppOutline } from 'antd-mobile-icons'

import {
  BuildingIcon,
  HomeServiceIcon,
  CalendarIcon,
  UserIcon,
} from './components/Icons'

import Splash from './pages/Splash'
import Login from './pages/Login'
import Home from './pages/Home'
import StudioCourses from './pages/StudioCourses'
import HomeService from './pages/HomeService'
import Schedule from './pages/Schedule'
import Profile from './pages/Profile'
import CoachProfile from './pages/CoachProfile'
import VenueProfile from './pages/VenueProfile'
import CourseDetail from './pages/CourseDetail'
import BookingConfirm from './pages/BookingConfirm'
import PaymentSuccess from './pages/PaymentSuccess'
import CheckIn from './pages/CheckIn'
import PostReview from './pages/PostReview'
import Search from './pages/Search'
import OrderList from './pages/OrderList'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
import UserProfile from './pages/UserProfile'
import Settings from './pages/Settings'
import TrainingArchive from './pages/TrainingArchive'
import Notifications from './pages/Notifications'
import Venues from './pages/Venues'
import MembershipCard from './pages/MembershipCard'
import Support from './pages/Support'
import Coupons from './pages/Coupons'

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

  const activeKey = '/' + location.pathname.split('/').filter(Boolean)[0] || '/home'

  return (
    <>
      <Outlet />
      <TabBar
        activeKey={tabs.some(t => t.key === activeKey) ? activeKey : undefined}
        onChange={(key: string) => navigate(key)}
        safeArea
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        {tabs.map(tab => (
          <TabBar.Item key={tab.key} icon={tab.icon(activeKey === tab.key)} title={tab.title} />
        ))}
      </TabBar>
    </>
  )
}

export default function App() {
  return (
    <HashRouter>
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
        <Route path="/payment-success/:id" element={<PaymentSuccess />} />
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
      </Routes>
    </HashRouter>
  )
}
