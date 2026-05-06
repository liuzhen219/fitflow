import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppState } from '../store/AppContext'
import { userProfile } from '../data/mock'
import { ClockIcon, StarFilledIcon, ArchiveIcon, DumbbellIcon, CheckIcon, SparkleIcon } from '../components/Icons'

interface BodyData {
  height: string
  weight: string
  bust: string
  waist: string
  hip: string
  bodyFat: string
}

const initData: BodyData = { height: '165', weight: '56', bust: '86', waist: '72', hip: '92', bodyFat: '26' }

const fields: { key: keyof BodyData; label: string; unit: string }[] = [
  { key: 'height', label: '身高', unit: 'cm' },
  { key: 'weight', label: '体重', unit: 'kg' },
  { key: 'bust', label: '胸围', unit: 'cm' },
  { key: 'waist', label: '腰围', unit: 'cm' },
  { key: 'hip', label: '臀围', unit: 'cm' },
  { key: 'bodyFat', label: '体脂率', unit: '%' },
]

export default function TrainingArchive() {
  const { scheduleItems } = useAppState()
  const nav = useNavigate()
  const completed = scheduleItems.filter((s) => s.status === 'completed')
  const totalHours = Math.round(userProfile.stats.totalMinutes / 60)

  // Body data state
  const [bodyData, setBodyData] = useState<BodyData>(initData)
  const [editData, setEditData] = useState<BodyData>(initData)
  const [showForm, setShowForm] = useState(false)
  const [saved, setSaved] = useState(true)
  const [history, setHistory] = useState<{ date: string; data: BodyData }[]>([
    { date: '2026-04-15', data: { height: '165', weight: '58', bust: '88', waist: '75', hip: '94', bodyFat: '28' } },
    { date: '2026-03-01', data: { height: '165', weight: '60', bust: '90', waist: '78', hip: '96', bodyFat: '30' } },
  ])

  const handleInput = (key: keyof BodyData, val: string) => {
    setEditData(prev => ({ ...prev, [key]: val }))
  }

  const handleSave = () => {
    const today = new Date().toISOString().slice(0, 10)
    setHistory(prev => [{ date: today, data: { ...bodyData } }, ...prev.slice(0, 5)])
    setBodyData(editData)
    setSaved(true)
    setShowForm(false)
  }

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
          { value: userProfile.stats.totalClasses, label: '累计课时', icon: <ClockIcon size={18} color="var(--c-accent)" /> },
          { value: `${totalHours}h`, label: '训练总时长', icon: <DumbbellIcon size={18} color="var(--c-accent)" /> },
          { value: userProfile.stats.followedCoaches, label: '教练数', icon: <StarFilledIcon size={18} color="var(--c-accent)" /> },
        ].map((s) => (
          <div key={s.label} style={{
            flex: 1, background: '#fafafa', borderRadius: 14, padding: '16px 12px',
            textAlign: 'center', border: '1px solid #eee',
          }}>
            {s.icon}
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--c-accent)', marginTop: 8 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#6a6a6a', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Body Data Section */}
      <div style={{ padding: '0 16px', marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#222', display: 'flex', alignItems: 'center', gap: 4 }}>
            <SparkleIcon size={14} color="var(--c-accent)" /> 身体数据
          </div>
          <span onClick={() => { if (!showForm) { setEditData(bodyData); setSaved(false) }; setShowForm(!showForm) }}
            style={{ fontSize: 13, fontWeight: 500, color: 'var(--c-accent)', cursor: 'pointer' }}>
            {showForm ? '取消' : '+ 更新数据'}
          </span>
        </div>

        {/* Data display or form */}
        {showForm ? (
          <div style={{
            background: '#fafafa', borderRadius: 14, padding: '14px 16px', border: '1px solid #eee',
          }}>
            <div style={{ fontSize: 12, color: '#6a6a6a', marginBottom: 12 }}>
              填写你当前的身体测量数据，用于追踪训练效果
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {fields.map(f => (
                <div key={f.key}>
                  <div style={{ fontSize: 11, color: '#6a6a6a', marginBottom: 4 }}>{f.label} ({f.unit})</div>
                  <input
                    type="number"
                    value={editData[f.key]}
                    onChange={e => handleInput(f.key, e.target.value)}
                    style={{
                      width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #ddd',
                      fontSize: 14, fontWeight: 500, color: '#222', outline: 'none',
                      background: '#fff', boxSizing: 'border-box',
                    }}
                  />
                </div>
              ))}
            </div>
            <div
              onClick={handleSave}
              style={{
                marginTop: 14, padding: '12px', borderRadius: 10, textAlign: 'center',
                background: 'var(--c-accent)', color: '#fff', fontSize: 14, fontWeight: 600,
                cursor: 'pointer',
              }}>
              保存数据
            </div>
          </div>
        ) : (
          <div style={{
            background: '#fafafa', borderRadius: 14, padding: '14px 16px', border: '1px solid #eee',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {fields.map(f => (
                <div key={f.key} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#222' }}>
                    {bodyData[f.key]}
                    <span style={{ fontSize: 11, fontWeight: 500, color: '#929292', marginLeft: 2 }}>{f.unit}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#6a6a6a', marginTop: 2 }}>{f.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: '#929292', marginTop: 10, textAlign: 'center' }}>
              上次更新：{history[0]?.date || '2026-04-15'}
            </div>
          </div>
        )}

        {/* Measurement history */}
        {history.length > 1 && (
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6a6a6a', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
              <ArchiveIcon size={12} color="#6a6a6a" /> 历史记录
            </div>
            {history.slice(1, 4).map((h, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 0', borderBottom: '1px solid #f7f7f7', fontSize: 12,
              }}>
                <span style={{ color: '#6a6a6a', fontWeight: 500 }}>{h.date}</span>
                <span style={{ color: '#929292' }}>
                  体脂 {h.data.bodyFat}% · {h.data.weight}kg · 腰 {h.data.waist}cm
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress bars */}
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
              <div style={{ height: '100%', borderRadius: 3, background: 'var(--c-accent)', width: `${m.pct}%`, transition: 'width 0.5s ease' }} />
            </div>
            <span style={{ width: 36, fontSize: 12, fontWeight: 600, color: 'var(--c-accent)', textAlign: 'right' }}>{m.pct}%</span>
          </div>
        ))}
      </div>

      {/* History */}
      <div style={{ padding: '0 16px 40px' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
          <ArchiveIcon size={14} color="var(--c-accent)" /> 上课记录
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
