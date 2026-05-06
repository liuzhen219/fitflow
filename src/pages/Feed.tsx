import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Popup, Toast, PullToRefresh } from 'antd-mobile'
import FeedCard from '../components/FeedCard'
import { useAppState } from '../store/AppContext'
import { coaches } from '../data/mock'
import { CommentIcon, CloseIcon, PhotoIcon } from '../components/Icons'

export default function Feed() {
  const nav = useNavigate()
  const { feedPosts, publishPost } = useAppState()
  const [showPublish, setShowPublish] = useState(false)
  const [content, setContent] = useState('')
  const [coachId, setCoachId] = useState<number | null>(null)
  const [images, setImages] = useState<string[]>([])

  const handlePickImages = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = true
    input.onchange = () => {
      const files = Array.from(input.files || [])
      if (files.length + images.length > 9) {
        Toast.show({ content: '最多上传9张图片' })
        return
      }
      files.forEach(file => {
        const reader = new FileReader()
        reader.onload = () => {
          setImages(prev => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
    input.click()
  }

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx))
  }

  const handlePublish = () => {
    const text = content.trim()
    if (!text) return
    const coach = coachId ? coaches.find(c => c.id === coachId) : coaches[0]
    publishPost({
      content: text,
      courseLabel: coach ? coach.courses[0]?.name || '普拉提' : '普拉提',
      coachName: coach?.name || '平台用户',
      images: images.length > 0 ? images : undefined,
    })
    setContent('')
    setCoachId(null)
    setImages([])
    setShowPublish(false)
    Toast.show({ icon: 'success', content: '发布成功' })
  }

  return (
    <div className="page-enter" style={{ minHeight: '100vh', background: '#f7f7f7' }}>
      {/* Header */}
      <div
        style={{
          background: '#fff',
          padding: '14px 16px',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span
            onClick={() => nav(-1)}
            style={{ fontSize: 18, cursor: 'pointer', lineHeight: 1, userSelect: 'none' }}
          >
            {'‹'}
          </span>
          <span style={{ fontSize: 18, fontWeight: 600, color: '#222', display: 'flex', alignItems: 'center', gap: 6 }}>
            <CommentIcon size={18} color="var(--c-accent)" />
            社区动态
          </span>
        </div>
        <span
          onClick={() => setShowPublish(true)}
          style={{
            fontSize: 14, fontWeight: 600, color: 'var(--c-accent)',
            cursor: 'pointer', padding: '6px 14px', borderRadius: 18,
            background: 'var(--c-accent-soft)',
          }}
        >
          + 发布
        </span>
      </div>

      {/* Feed list */}
      <PullToRefresh
        onRefresh={async () => { await new Promise(r => setTimeout(r, 600)) }}
      >
        <div style={{ padding: '16px' }}>
          {feedPosts.map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </div>
      </PullToRefresh>

      {/* Publish popup */}
      <Popup
        visible={showPublish}
        onClose={() => setShowPublish(false)}
        onMaskClick={() => setShowPublish(false)}
        bodyStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          background: '#fff',
          minHeight: '50vh',
        }}
      >
        <div style={{ padding: '20px 16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontSize: 18, fontWeight: 600, color: '#222' }}>发布动态</span>
            <span onClick={() => setShowPublish(false)} style={{ cursor: 'pointer', lineHeight: 1 }}>
              <CloseIcon size={20} color="#6a6a6a" />
            </span>
          </div>

          {/* Content input */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="分享你的训练心得..."
            style={{
              width: '100%', minHeight: 120, padding: 12, borderRadius: 12,
              border: '1px solid #ddd', fontSize: 14, lineHeight: 1.6,
              resize: 'vertical', outline: 'none', fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />

          {/* Image picker */}
          <div style={{ marginTop: 12 }}>
            {images.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                {images.map((url, i) => (
                  <div key={i} style={{
                    width: 72, height: 72, borderRadius: 10, overflow: 'hidden',
                    position: 'relative', background: '#f0f0f0',
                  }}>
                    <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span onClick={() => removeImage(i)} style={{
                      position: 'absolute', top: 2, right: 2, width: 18, height: 18,
                      borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, cursor: 'pointer', lineHeight: 1,
                    }}>✕</span>
                  </div>
                ))}
              </div>
            )}
            <div onClick={handlePickImages} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px',
              borderRadius: 18, border: '1px solid #ddd', fontSize: 13, fontWeight: 500,
              color: '#6a6a6a', cursor: 'pointer',
            }}>
              <PhotoIcon size={16} color="#6a6a6a" />
              {images.length > 0 ? `已选 ${images.length} 张` : '添加图片'}
            </div>
          </div>

          {/* Coach picker */}
          <div style={{ marginTop: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#6a6a6a', marginBottom: 8, display: 'block' }}>
              关联教练（可选）
            </span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {coaches.map(c => (
                <span
                  key={c.id}
                  onClick={() => setCoachId(coachId === c.id ? null : c.id)}
                  style={{
                    padding: '6px 14px', borderRadius: 18, fontSize: 13, fontWeight: 500,
                    cursor: 'pointer', userSelect: 'none',
                    background: coachId === c.id ? 'var(--c-accent)' : '#f7f7f7',
                    color: coachId === c.id ? '#fff' : '#222',
                    border: coachId === c.id ? '1.5px solid #E3617B' : '1px solid #eee',
                  }}
                >
                  {c.name}
                </span>
              ))}
            </div>
          </div>

          {/* Publish button */}
          <div
            onClick={handlePublish}
            style={{
              marginTop: 20, width: '100%', padding: '14px 0', borderRadius: 12,
              background: content.trim() ? 'var(--c-accent)' : '#ddd',
              color: '#fff', textAlign: 'center', fontSize: 16, fontWeight: 600,
              cursor: content.trim() ? 'pointer' : 'default',
              transition: 'background 0.15s',
            }}
          >
            发布
          </div>
        </div>
      </Popup>

      <div style={{ height: 16 }} />
    </div>
  )
}
