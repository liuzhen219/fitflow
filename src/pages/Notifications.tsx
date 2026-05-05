import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { notifications } from '../data/mock'
import { ClockIcon, StarFilledIcon, SparkleIcon, CheckIcon } from '../components/Icons'

const typeIcon: Record<string, React.ReactNode> = {
  course: <ClockIcon size={16} color="#E3617B" />,
  review: <StarFilledIcon size={16} color="#E3617B" />,
  activity: <SparkleIcon size={16} color="#E3617B" />,
  system: <CheckIcon size={16} color="#16A34A" />,
}

export default function Notifications() {
  const nav = useNavigate()
  const [filter, setFilter] = useState<string>('all')
  const [items, setItems] = useState(notifications)

  const filtered = filter === 'all' ? items : items.filter((n) => n.type === filter)
  const unreadCount = items.filter((n) => !n.read).length

  const markAllRead = () => setItems(items.map((n) => ({ ...n, read: true })))

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px 12px', borderBottom: '1px solid #f0f0f0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div onClick={() => nav(-1)} style={{
            width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, color: '#fff', cursor: 'pointer', fontWeight: 400, lineHeight: '34px', flexShrink: 0,
          }}>‹</div>
          <span style={{ fontSize: 17, fontWeight: 600, color: '#222' }}>消息中心</span>
          {unreadCount > 0 && (
            <span style={{
              fontSize: 11, fontWeight: 600, color: '#fff', background: '#E3617B',
              padding: '2px 8px', borderRadius: 10,
            }}>{unreadCount} 未读</span>
          )}
        </div>
        {unreadCount > 0 && (
          <span onClick={markAllRead} style={{ fontSize: 13, color: '#6a6a6a', cursor: 'pointer' }}>
            全部已读
          </span>
        )}
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '12px 16px', borderBottom: '1px solid #f7f7f7' }}>
        {[
          { key: 'all', label: '全部' },
          { key: 'course', label: '课程' },
          { key: 'activity', label: '活动' },
          { key: 'review', label: '评价' },
          { key: 'system', label: '系统' },
        ].map((f) => (
          <span key={f.key} onClick={() => setFilter(f.key)}
            style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 500,
              flexShrink: 0, cursor: 'pointer', whiteSpace: 'nowrap',
              color: filter === f.key ? '#fff' : '#222',
              background: filter === f.key ? '#E3617B' : '#f7f7f7',
            }}>{f.label}</span>
        ))}
      </div>

      {/* Notification list */}
      <div>
        {filtered.map((n) => (
          <div key={n.id}
            onClick={() => {
              setItems(items.map((i) => i.id === n.id ? { ...i, read: true } : i))
              if (n.link) nav(n.link)
            }}
            style={{
              display: 'flex', gap: 12, padding: '14px 16px',
              borderBottom: '1px solid #f7f7f7', cursor: n.link ? 'pointer' : 'default',
              background: n.read ? '#fff' : '#fef9f8',
            }}>
            {/* Icon */}
            <div style={{
              width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
              background: n.read ? '#f7f7f7' : 'rgba(227,97,123,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {typeIcon[n.type]}
            </div>

            {/* Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                <span style={{ fontSize: 14, fontWeight: n.read ? 500 : 600, color: '#222' }}>{n.title}</span>
                {!n.read && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#E3617B', flexShrink: 0 }} />}
              </div>
              <p style={{ fontSize: 12, color: '#6a6a6a', lineHeight: 1.5, margin: 0 }}>{n.content}</p>
              <p style={{ fontSize: 11, color: '#929292', margin: '4px 0 0' }}>{n.time}</p>
            </div>

            {n.link && <span style={{ fontSize: 14, color: '#ccc', flexShrink: 0, marginTop: 4 }}>›</span>}
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 60, color: '#929292', fontSize: 14 }}>
            暂无消息
          </div>
        )}
      </div>
    </div>
  )
}
