import { useNavigate, useParams } from 'react-router-dom'
import { useState, useMemo } from 'react'
import StarRating from '../components/StarRating'
import { scheduleItems } from '../data/mock'
import {
  SearchIcon, UserIcon, BuildingIcon, PhotoIcon,
  ClockIcon, LocationIcon, SparkleIcon,
} from '../components/Icons'

const coachTags = ['专业认真', '讲解清晰', '氛围舒适', '耐心细致', '效果明显']
const venueTags = ['器械齐全', '环境干净', '交通便利', '服务周到', '空间宽敞']

export default function PostReview() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()

  // Determine entry mode: from schedule item id or from coach id
  const isCoachMode = window.location.hash.includes('/review/coach/')
  const coachId = isCoachMode ? Number(id) : null
  const scheduleItemId = isCoachMode ? null : Number(id)

  // Completed courses for the user, filtered by coach if in coach mode
  const userCompletedCourses = useMemo(() => {
    const completed = scheduleItems.filter((s) => s.status === 'completed')
    if (coachId) return completed.filter((s) => s.coachId === coachId)
    // from schedule: find the specific item
    const item = scheduleItems.find((s) => s.id === scheduleItemId)
    // also get other courses by same coach
    if (item) {
      return completed.filter((s) => s.coachId === item.coachId)
    }
    return completed
  }, [coachId, scheduleItemId])

  const [selectedCourse, setSelectedCourse] = useState(
    userCompletedCourses.length === 1 ? userCompletedCourses[0] : null
  )

  const [coachRating, setCoachRating] = useState(0)
  const [venueRating, setVenueRating] = useState(0)
  const [selectedCoachTags, setSelectedCoachTags] = useState<string[]>([])
  const [selectedVenueTags, setSelectedVenueTags] = useState<string[]>([])

  const toggleTag = (tag: string, selected: string[], setFn: (v: string[]) => void) =>
    setFn(selected.includes(tag) ? selected.filter((t) => t !== tag) : [...selected, tag])

  if (userCompletedCourses.length === 0) {
    return (
      <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 20 }}>
        <SearchIcon size={48} color="#c0c0c0" />
        <p style={{ fontSize: 16, color: '#222', fontWeight: 500, margin: 0 }}>暂无已完成课程</p>
        <p style={{ fontSize: 13, color: '#6a6a6a', margin: 0, textAlign: 'center' }}>
          你可以在上完课后再来评价教练
        </p>
        <div style={{ marginTop: 8, padding: '10px 28px', borderRadius: 24, background: '#E3617B', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }} onClick={() => nav(-1)}>返回</div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px',
        borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, background: '#fff', zIndex: 10,
      }}>
        <div onClick={() => nav(-1)} style={{
          width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, color: '#fff', cursor: 'pointer', fontWeight: 500, lineHeight: 1, flexShrink: 0,
        }}>‹</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#222' }}>评价教练</div>
          <div style={{ fontSize: 12, color: '#6a6a6a' }}>
            {selectedCourse ? selectedCourse.coachName : '选择课程'}
          </div>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* Course selector */}
        {userCompletedCourses.length > 1 && (
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#222', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
              <SparkleIcon size={14} color="#E3617B" /> 你上过{userCompletedCourses[0]?.coachName}的{userCompletedCourses.length}门课，请选择评价哪一门：
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {userCompletedCourses.map((c) => (
                <div key={c.id} onClick={() => setSelectedCourse(c)}
                  style={{
                    padding: '12px 14px', borderRadius: 12, cursor: 'pointer',
                    border: selectedCourse?.id === c.id ? '1.5px solid #E3617B' : '1px solid #ddd',
                    background: selectedCourse?.id === c.id ? 'rgba(227,97,123,0.04)' : '#fafafa',
                  }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14, fontWeight: selectedCourse?.id === c.id ? 600 : 500, color: '#222' }}>
                      {c.courseName}
                    </span>
                    {selectedCourse?.id === c.id && (
                      <span style={{ fontSize: 11, color: '#E3617B', fontWeight: 600 }}>已选择 ✓</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4, fontSize: 12, color: '#6a6a6a' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}><ClockIcon size={11} color="#6a6a6a" />{c.date} · {c.time}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}><LocationIcon size={11} color="#6a6a6a" />{c.venueName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedCourse && (
          <>
            {/* Course info */}
            <div style={{
              padding: '12px 14px', borderRadius: 12, background: '#fafafa',
              border: '1px solid #f0f0f0', marginBottom: 20,
            }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#222', margin: 0 }}>{selectedCourse.courseName}</p>
              <p style={{ fontSize: 12, color: '#6a6a6a', margin: '4px 0 0' }}>
                {selectedCourse.date} · {selectedCourse.coachName}
              </p>
            </div>

            {/* Coach Rating */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#222', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <UserIcon size={14} color="#E3617B" /> 教练评价
              </p>
              <StarRating value={coachRating} onChange={setCoachRating} />
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                {coachTags.map((t) => (
                  <span key={t} onClick={() => toggleTag(t, selectedCoachTags, setSelectedCoachTags)} style={{
                    padding: '6px 12px', borderRadius: 16, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                    background: selectedCoachTags.includes(t) ? '#E3617B' : '#f7f7f7',
                    color: selectedCoachTags.includes(t) ? '#fff' : '#222',
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Venue Rating */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#222', margin: '0 0 8px', display: 'flex', alignItems: 'center', gap: 4 }}>
                <BuildingIcon size={14} color="#E3617B" /> 场馆评价
              </p>
              <StarRating value={venueRating} onChange={setVenueRating} />
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                {venueTags.map((t) => (
                  <span key={t} onClick={() => toggleTag(t, selectedVenueTags, setSelectedVenueTags)} style={{
                    padding: '6px 12px', borderRadius: 16, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                    background: selectedVenueTags.includes(t) ? '#C4A882' : '#f7f7f7',
                    color: selectedVenueTags.includes(t) ? '#fff' : '#222',
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Text */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#222', margin: '0 0 8px' }}>✍️ 写点什么...</p>
              <div style={{ background: '#f7f7f7', borderRadius: 12, padding: 12, minHeight: 80, fontSize: 13, color: '#929292' }} contentEditable>
                分享你的上课感受，帮助其他学员做出选择～
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ width: 60, height: 60, background: '#f7f7f7', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px dashed #ddd' }}>
                    <PhotoIcon size={22} color="#c0c0c0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button onClick={() => nav(-1)} style={{
              width: '100%', padding: '14px 0', borderRadius: 8, border: 'none',
              background: '#E3617B', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer',
            }}>
              提交评价
            </button>
          </>
        )}
      </div>
    </div>
  )
}
