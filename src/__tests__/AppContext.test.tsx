import { renderHook, act } from '@testing-library/react'
import { ReactNode } from 'react'
import { AppProvider, useAppState } from '../store/AppContext'
import { courses, coaches } from '../data/mock'

function wrapper({ children }: { children: ReactNode }) {
  return <AppProvider>{children}</AppProvider>
}

function renderAppHook() {
  return renderHook(() => useAppState(), { wrapper })
}

// ---- Booking ----
describe('Booking', () => {
  it('adds a booking to scheduleItems', () => {
    const { result } = renderAppHook()
    const before = result.current.scheduleItems.length
    const course = courses[0]

    let booking: ReturnType<typeof result.current.addBooking>
    act(() => {
      booking = result.current.addBooking({
        course,
        date: '2026-06-01',
        timeSlot: '10:00',
      })
    })

    expect(result.current.scheduleItems.length).toBe(before + 1)
    expect(booking!.status).toBe('upcoming')
    expect(booking!.courseName).toBe(course.title)
    expect(booking!.time).toMatch(/10:00 - \d{2}:\d{2}/)
  })

  it('cancels a booking', () => {
    const { result } = renderAppHook()
    const course = courses[0]

    act(() => {
      const b = result.current.addBooking({ course, date: '2026-06-01', timeSlot: '10:00' })
      result.current.cancelBooking(b.id)
    })

    const cancelled = result.current.scheduleItems.find(s => s.status === 'cancelled')
    expect(cancelled).toBeTruthy()
  })

  it('checks in a booking', () => {
    const { result } = renderAppHook()
    const course = courses[0]

    act(() => {
      const b = result.current.addBooking({ course, date: '2026-06-01', timeSlot: '10:00' })
      result.current.checkInBooking(b.id)
    })

    const completed = result.current.scheduleItems.find(s => s.status === 'completed')
    expect(completed).toBeTruthy()
    expect(completed!.hasCheckIn).toBe(true)
  })
})

// ---- Coupons ----
describe('Coupons', () => {
  it('applies a coupon to a booking', () => {
    const { result } = renderAppHook()

    const activeBefore = result.current.coupons.filter(c => c.status === 'active').length

    act(() => {
      result.current.useCoupon(1)
    })

    const activeAfter = result.current.coupons.filter(c => c.status === 'active').length
    expect(activeAfter).toBe(activeBefore - 1)
  })
})

// ---- Balance & Payment ----
describe('Balance & Payment', () => {
  it('recharges balance', () => {
    const { result } = renderAppHook()
    const before = result.current.balance

    act(() => { result.current.recharge(100) })

    expect(result.current.balance).toBe(before + 100)
    const lastRecord = result.current.paymentRecords[0]
    expect(lastRecord.type).toBe('recharge')
    expect(lastRecord.amount).toBe(100)
  })

  it('pays with balance when sufficient', () => {
    const { result } = renderAppHook()

    act(() => { result.current.recharge(500) })
    const balanceBefore = result.current.balance

    let ok = false
    act(() => { ok = result.current.payWithBalance(300, '测试课程') })

    expect(ok).toBe(true)
    expect(result.current.balance).toBe(balanceBefore - 300)
    expect(result.current.paymentRecords[0].type).toBe('pay')
  })

  it('refuses payment when balance insufficient', () => {
    const { result } = renderAppHook()
    const huge = result.current.balance + 99999
    let ok = true
    act(() => { ok = result.current.payWithBalance(huge, '天价课') })
    expect(ok).toBe(false)
    expect(result.current.balance).toBeGreaterThan(0) // balance unchanged
  })
})

// ---- Points ----
describe('Points', () => {
  it('earns and spends points', () => {
    const { result } = renderAppHook()

    act(() => { result.current.earnPoints(500, '邀请好友') })
    const afterEarn = result.current.points
    expect(afterEarn).toBeGreaterThanOrEqual(500)

    let ok = false
    act(() => { ok = result.current.spendPoints(80, '兑换按摩球') })
    expect(ok).toBe(true)
    expect(result.current.points).toBe(afterEarn - 80)
  })

  it('refuses spend when points insufficient', () => {
    const { result } = renderAppHook()
    let ok = true
    act(() => { ok = result.current.spendPoints(99999, '超级大奖') })
    expect(ok).toBe(false)
  })
})

// ---- Feed ----
describe('Feed', () => {
  it('publishes a new post', () => {
    const { result } = renderAppHook()
    const before = result.current.feedPosts.length

    act(() => {
      result.current.publishPost({
        content: '测试动态内容',
        courseLabel: '普拉提',
        coachName: '林悦然',
      })
    })

    expect(result.current.feedPosts.length).toBe(before + 1)
    const latest = result.current.feedPosts[0]
    expect(latest.content).toBe('测试动态内容')
    expect(latest.likes).toBe(0)
    expect(latest.comments).toEqual([])
  })

  it('toggles like', () => {
    const { result } = renderAppHook()
    const postId = result.current.feedPosts[0].id
    const likesBefore = result.current.feedPosts[0].likes

    act(() => { result.current.toggleLike(postId) })
    const after = result.current.feedPosts.find(p => p.id === postId)!
    expect(after.likes).toBe(likesBefore + 1)
    expect(after.liked).toBe(true)

    act(() => { result.current.toggleLike(postId) })
    const after2 = result.current.feedPosts.find(p => p.id === postId)!
    expect(after2.likes).toBe(likesBefore)
    expect(after2.liked).toBe(false)
  })

  it('adds a comment', () => {
    const { result } = renderAppHook()
    const postId = result.current.feedPosts[0].id
    const commentsBefore = result.current.feedPosts[0].comments.length

    act(() => { result.current.addComment(postId, '好文章！') })

    const post = result.current.feedPosts.find(p => p.id === postId)!
    expect(post.comments.length).toBe(commentsBefore + 1)
    expect(post.comments[0].content).toBe('好文章！')
  })
})

// ---- Addresses ----
describe('Addresses', () => {
  it('adds, updates, and removes addresses', () => {
    const { result } = renderAppHook()
    const before = result.current.addresses.length

    act(() => {
      result.current.addAddress({
        tag: '新家', name: '李女士', phone: '13900001111',
        full: '上海市浦东新区XX路1号',
      })
    })
    expect(result.current.addresses.length).toBe(before + 1)

    const newAddr = result.current.addresses[0]
    act(() => {
      result.current.updateAddress(newAddr.id, {
        tag: '老家', name: '李女士', phone: '13900001111',
        full: '上海市浦东新区XX路1号',
      })
    })
    expect(result.current.addresses[0].tag).toBe('老家')

    act(() => { result.current.setDefaultAddress(newAddr.id) })
    expect(result.current.addresses[0].isDefault).toBe(true)

    act(() => { result.current.removeAddress(newAddr.id) })
    expect(result.current.addresses.length).toBe(before)
  })
})

// ---- Events ----
describe('Events', () => {
  it('registers for events', () => {
    const { result } = renderAppHook()
    const before = result.current.registeredEventIds.length

    let ok = false
    act(() => { ok = result.current.registerForEvent(1, '春日垫上普拉提') })
    expect(ok).toBe(true)
    expect(result.current.registeredEventIds.length).toBe(before + 1)

    // Duplicate should return false
    act(() => { ok = result.current.registerForEvent(1, '春日垫上普拉提') })
    expect(ok).toBe(false)
  })
})

// ---- Gender theme ----
describe('Gender Theme', () => {
  it('switches gender', () => {
    const { result } = renderAppHook()

    act(() => { result.current.setGender('male') })
    expect(result.current.gender).toBe('male')
    expect(document.documentElement.getAttribute('data-theme')).toBe('male')

    act(() => { result.current.setGender('female') })
    expect(result.current.gender).toBe('female')
    expect(document.documentElement.getAttribute('data-theme')).toBe('')
  })
})

// ---- Membership ----
describe('Membership', () => {
  it('purchases a membership card', () => {
    const { result } = renderAppHook()
    const before = result.current.membershipCards.length

    let ok = false
    act(() => { ok = result.current.purchaseMembership('plan-10') })
    expect(ok).toBe(true)
    expect(result.current.membershipCards.length).toBe(before + 1)
    expect(result.current.membershipCards[0].status).toBe('active')
  })
})

// ---- Notifications ----
describe('Notifications', () => {
  it('marks notifications as read', () => {
    const { result } = renderAppHook()

    // Create a booking which generates a notification
    const course = courses[0]
    act(() => { result.current.addBooking({ course, date: '2026-06-01', timeSlot: '10:00' }) })

    const unread = result.current.notifications.filter(n => !n.read)
    expect(unread.length).toBeGreaterThan(0)

    act(() => { result.current.markAllNotificationsRead() })
    const unreadAfter = result.current.notifications.filter(n => !n.read)
    expect(unreadAfter.length).toBe(0)
  })
})
