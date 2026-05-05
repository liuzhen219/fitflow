import { useNavigate } from 'react-router-dom'
import { scheduleItems, userProfile } from '../data/mock'
import { ClockIcon, StarFilledIcon, ArchiveIcon, DumbbellIcon } from '../components/Icons'

export default function TrainingArchive() {
  const nav = useNavigate()
  const completed = scheduleItems.filter((s) => s.status === 'completed')

  const totalHours = Math.round(userProfile.stats.totalMinutes / 60)

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', padding: '14px 16px',
        borderBottom: '1px solid #f0f0f0', gap: 8,
      }}>
        <div onClick={() => nav(-1)} style={{
          width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: '#fff', cursor: 'pointer', fontWeight: 400, lineHeight: '34px', flexShrink: 0,
        }}>‹</div>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#222' }}>训练档案</span>
      </div>

      {/* Stats Overview */}
      <div style={{ display: 'flex', gap: 10, padding: '16px' }}>
        {[
          { value: userProfile.stats.totalClasses, label: '累计课时', icon: <ClockIcon size={18} color="#E3617B" /> },
          { value: `${totalHours}h`, label: '训练总时长', icon: <DumbbellIcon size={18} color="#E3617B" /> },
          { value: userProfile.stats.followedCoaches, label: '教练数', icon: <StarFilledIcon size={18} color="#E3617B" /> },
        ].map((s) => (
          <div key={s.label} style={{
            flex: 1, background: '#fafafa', borderRadius: 14, padding: '16px 12px',
            textAlign: 'center', border: '1px solid #eee',
          }}>
            {s.icon}
            <div style={{ fontSize: 22, fontWeight: 700, color: '#E3617B', marginTop: 8 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#6a6a6a', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress bars for body metrics */}
      <div style={{ padding: '0 16px', marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 12 }}>身体数据趋势</div>
        {[
          { label: '核心力量', pct: 78 },
          { label: '柔韧性', pct: 65 },
          { label: '体态改善', pct: 82 },
          { label: '身体意识', pct: 70 },
        ].map((m) => (
          <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ width: 70, fontSize: 13, fontWeight: 500, color: '#222' }}>{m.label}</span>
            <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#f0f0f0', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: 3, background: '#E3617B', width: `${m.pct}%`, transition: 'width 0.5s ease' }} />
            </div>
            <span style={{ width: 36, fontSize: 12, fontWeight: 600, color: '#E3617B', textAlign: 'right' }}>{m.pct}%</span>
          </div>
        ))}
      </div>

      {/* History */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
          <ArchiveIcon size={14} color="#E3617B" /> 上课记录
        </div>
        {completed.length > 0 ? completed.map((item) => (
          <div key={item.id} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 0', borderBottom: '1px solid #f0f0f0',
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#222' }}>{item.courseName}</div>
              <div style={{ fontSize: 12, color: '#6a6a6a', marginTop: 2 }}>{item.coachName} · {item.venueName}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: '#6a6a6a' }}>{item.date}</div>
              <div style={{ fontSize: 11, color: '#929292' }}>{item.time}</div>
            </div>
          </div>
        )) : (
          <div style={{ textAlign: 'center', padding: 40, color: '#929292', fontSize: 14 }}>暂无训练记录</div>
        )}
      </div>
    </div>
  )
}
