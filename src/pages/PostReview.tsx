import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import StarRating from '../components/StarRating'
import { scheduleItems } from '../data/mock'

const coachTags = ['专业认真', '讲解清晰', '氛围舒适', '耐心细致', '效果明显']
const venueTags = ['器械齐全', '环境干净', '交通便利', '服务周到', '空间宽敞']

export default function PostReview() {
  const { id } = useParams<{ id: string }>()
  const nav = useNavigate()
  const item = scheduleItems.find((s) => s.id === Number(id))

  const [coachRating, setCoachRating] = useState(0)
  const [venueRating, setVenueRating] = useState(0)
  const [selectedCoachTags, setSelectedCoachTags] = useState<string[]>([])
  const [selectedVenueTags, setSelectedVenueTags] = useState<string[]>([])
  const [reviewText, setReviewText] = useState('')

  const toggleTag = (
    tag: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(tag)) {
      setSelected(selected.filter((t) => t !== tag))
    } else {
      setSelected([...selected, tag])
    }
  }

  if (!item) {
    return (
      <div style={s.page}>
        <div style={s.navBar}>
          <div style={s.navBack} onClick={() => nav(-1)}>←</div>
          <div style={s.navTitle}>课后评价</div>
          <div style={s.navPlaceholder} />
        </div>
        <div style={s.notFound}>
          <div style={s.notFoundEmoji}>🔍</div>
          <p style={s.notFoundText}>课程未找到</p>
          <div style={s.backBtn} onClick={() => nav(-1)}>返回</div>
        </div>
      </div>
    )
  }

  return (
    <div style={s.page}>
      {/* NavBar */}
      <div style={s.navBar}>
        <div style={s.navBack} onClick={() => nav(-1)}>←</div>
        <div style={s.navTitle}>课后评价</div>
        <div style={s.navPlaceholder} />
      </div>

      <div style={s.scrollArea}>
        {/* Course Info Summary */}
        <div style={s.courseCard}>
          <h2 style={s.courseName}>{item.courseName}</h2>
          <div style={s.courseMeta}>
            <span>{item.coachName}</span>
            <span style={s.metaDot}>·</span>
            <span>{item.isHomeService ? '上门服务' : item.venueName}</span>
            <span style={s.metaDot}>·</span>
            <span>{item.date}</span>
          </div>
        </div>

        {/* Coach Rating Section */}
        <div style={s.section}>
          <div style={s.sectionTitle}>👩‍🏫 教练评价</div>
          <div style={s.ratingRow}>
            <StarRating value={coachRating} onChange={setCoachRating} size={28} />
            {coachRating > 0 && (
              <span style={s.ratingLabel}>{coachRating} 分</span>
            )}
          </div>
          <div style={s.tagRow}>
            {coachTags.map((tag) => {
              const selected = selectedCoachTags.includes(tag)
              return (
                <span
                  key={tag}
                  style={{
                    ...s.tagChip,
                    ...(selected ? s.tagChipCoachActive : {}),
                  }}
                  onClick={() => toggleTag(tag, selectedCoachTags, setSelectedCoachTags)}
                >
                  {tag}
                </span>
              )
            })}
          </div>
        </div>

        {/* Venue Rating Section */}
        {!item.isHomeService && (
          <div style={s.section}>
            <div style={s.sectionTitle}>🏛️ 场馆评价</div>
            <div style={s.ratingRow}>
              <StarRating value={venueRating} onChange={setVenueRating} size={28} />
              {venueRating > 0 && (
                <span style={s.ratingLabel}>{venueRating} 分</span>
              )}
            </div>
            <div style={s.tagRow}>
              {venueTags.map((tag) => {
                const selected = selectedVenueTags.includes(tag)
                return (
                  <span
                    key={tag}
                    style={{
                      ...s.tagChip,
                      ...(selected ? s.tagChipVenueActive : {}),
                    }}
                    onClick={() => toggleTag(tag, selectedVenueTags, setSelectedVenueTags)}
                  >
                    {tag}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {/* Text Input Area */}
        <div style={s.section}>
          <div style={s.sectionTitle}>✍️ 写点什么...</div>
          <div
            style={s.textArea}
            contentEditable
            suppressContentEditableWarning
            onInput={(e) => {
              setReviewText((e.target as HTMLDivElement).innerText)
            }}
          >
            {reviewText === '' ? null : undefined}
          </div>
          <div style={s.charCount}>{reviewText.length}/500</div>
        </div>

        {/* Photo Upload */}
        <div style={s.section}>
          <div style={s.sectionTitle}>📷 添加图片</div>
          <div style={s.photoRow}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={s.photoBox}>
                <span style={s.photoEmoji}>📷</span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div style={s.submitArea}>
          <button style={s.submitBtn} onClick={() => nav(-1)}>
            提交评价
          </button>
        </div>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#fff',
  },
  scrollArea: {
    padding: '0 12px 40px',
  },

  // NavBar
  navBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    paddingTop: 16,
  },
  navBack: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'rgba(227,97,123,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    color: '#222',
    cursor: 'pointer',
    fontWeight: 700,
    lineHeight: 1,
  },
  navTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: '#222',
  },
  navPlaceholder: { width: 32 },

  // Not Found
  notFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    gap: 12,
    padding: 20,
  },
  notFoundEmoji: { fontSize: 48, lineHeight: 1 },
  notFoundText: { fontSize: 16, color: '#222', fontWeight: 500, margin: 0 },
  backBtn: {
    marginTop: 8,
    padding: '10px 28px',
    borderRadius: 24,
    background: '#E3617B',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
  },

  // Course Card
  courseCard: {
    marginTop: 8,
    padding: 16,
    background: '#FFFFFF',
    borderRadius: 16,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  courseName: {
    fontSize: 15,
    fontWeight: 700,
    color: '#222',
    margin: '0 0 6px 0',
    lineHeight: 1.3,
  },
  courseMeta: {
    fontSize: 12,
    color: '#6a6a6a',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    flexWrap: 'wrap',
  },
  metaDot: {
    color: '#ddd',
  },

  // Section
  section: {
    marginTop: 16,
    padding: 16,
    background: '#FFFFFF',
    borderRadius: 16,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#222',
    marginBottom: 10,
  },

  // Rating
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  ratingLabel: {
    fontSize: 12,
    color: '#E3617B',
    fontWeight: 600,
  },

  // Tag Chips
  tagRow: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  tagChip: {
    padding: '6px 14px',
    borderRadius: 16,
    fontSize: 12,
    fontWeight: 500,
    background: '#FFFFFF',
    color: '#6a6a6a',
    border: '1px solid #ddd',
    cursor: 'pointer',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    userSelect: 'none',
  },
  tagChipCoachActive: {
    background: '#E3617B',
    color: '#FFFFFF',
    border: '1px solid #E3617B',
  },
  tagChipVenueActive: {
    background: '#E3617B',
    color: '#FFFFFF',
    border: '1px solid #E3617B',
  },

  // Text Area
  textArea: {
    width: '100%',
    minHeight: 80,
    background: '#FFFFFF',
    borderRadius: 12,
    border: '1px solid #ddd',
    padding: 12,
    fontSize: 12,
    color: '#222',
    outline: 'none',
    lineHeight: 1.6,
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
  },
  charCount: {
    textAlign: 'right',
    fontSize: 11,
    color: '#929292',
    marginTop: 6,
  },

  // Photo Upload
  photoRow: {
    display: 'flex',
    gap: 10,
  },
  photoBox: {
    width: 60,
    height: 60,
    borderRadius: 10,
    border: '1.5px dashed #ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  photoEmoji: {
    fontSize: 22,
    lineHeight: 1,
    opacity: 0.5,
  },

  // Submit
  submitArea: {
    marginTop: 24,
    marginBottom: 40,
  },
  submitBtn: {
    width: '100%',
    padding: '14px 0',
    borderRadius: 24,
    background: '#E3617B',
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    lineHeight: 1.2,
  },
}
