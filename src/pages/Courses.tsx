import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar, SearchBar, Space, Tag } from 'antd-mobile'

const allCourses = [
  { id: 1, title: '核心床基础 · 脊柱灵活', coach: '林若溪', dur: '45 min', level: '初级', tag: '核心床', time: '周一/三 9:00', color: 'linear-gradient(135deg, #E8DDD2, #D9CFC0)' },
  { id: 2, title: '垫上普拉提 · 核心唤醒', coach: 'Serena Li', dur: '60 min', level: '中级', tag: '垫上', time: '周二/四 10:30', color: 'linear-gradient(135deg, #DCDACC, #CDD0C0)' },
  { id: 3, title: '流瑜伽 · 身体流动', coach: '王语晴', dur: '50 min', level: '初级', tag: '瑜伽', time: '每天 7:00', color: 'linear-gradient(135deg, #E0D8CC, #D5CBB8)' },
  { id: 4, title: '冥想 · 正念疗愈', coach: 'Mia Chen', dur: '30 min', level: '初级', tag: '冥想', time: '周六/日 8:30', color: 'linear-gradient(135deg, #DCDACC, #CDD3C5)' },
  { id: 5, title: '核心床进阶 · 力量', coach: '林若溪', dur: '55 min', level: '高级', tag: '核心床', time: '周三/五 14:00', color: 'linear-gradient(135deg, #E0D5C8, #CFC0AC)' },
  { id: 6, title: '塑形 · 臀腿线条', coach: '王语晴', dur: '45 min', level: '中级', tag: '塑形', time: '周一/四 16:00', color: 'linear-gradient(135deg, #DCE0D4, #CDD5C8)' },
]

const tags = ['全部', '核心床', '垫上', '瑜伽', '冥想', '塑形']

export default function Courses() {
  const nav = useNavigate()
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('全部')

  const filtered = useMemo(() => {
    let list = allCourses
    if (activeTag !== '全部') list = list.filter(c => c.tag === activeTag)
    if (search) list = list.filter(c => c.title.includes(search) || c.coach.includes(search))
    return list
  }, [activeTag, search])

  return (
    <div style={s.page}>
      <NavBar onBack={() => nav(-1)}>全部课程</NavBar>

      <div style={s.body}>
        <SearchBar value={search} onChange={setSearch} placeholder="搜索课程或导师..." style={s.search} />

        <Space wrap style={{ marginBottom: 16 }}>
          {tags.map(t => (
            <Tag
              key={t}
              round
              color={activeTag === t ? 'primary' : 'default'}
              onClick={() => setActiveTag(t)}
              style={activeTag === t ? s.tagActive : s.tagDefault}
            >
              {t}
            </Tag>
          ))}
        </Space>

        <div style={s.list}>
          {filtered.map(c => (
            <div key={c.id} style={s.row} onClick={() => nav(`/course/${c.id}`)}>
              <div style={{ ...s.rowImg, background: c.color }}>
                <span style={s.rowLevel}>{c.level}</span>
              </div>
              <div style={s.rowInfo}>
                <h4 style={s.rowTitle}>{c.title}</h4>
                <p style={s.rowMeta}>{c.coach} · {c.dur}</p>
                <p style={s.rowTime}>{c.time}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8B6A6" strokeWidth="2"><polyline points="9,18 15,12 9,6"/></svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: 'var(--c-bg)' },
  body: { padding: '12px 20px' },
  search: {
    '--border-radius': '14px',
    '--background': 'var(--c-bg-card)',
    '--placeholder-color': '#C0BBB6',
    marginBottom: 16,
  } as any,
  tagActive: { '--background-color': '#C8B6A6', '--text-color': '#fff', '--border-color': '#C8B6A6' } as any,
  tagDefault: { '--text-color': 'var(--c-text-secondary)', '--border-color': 'rgba(200,182,166,0.2)' } as any,
  list: { display: 'flex', flexDirection: 'column', gap: 12 },
  row: {
    display: 'flex', alignItems: 'center', gap: 14,
    background: 'var(--c-bg-card)', borderRadius: 16, padding: 14,
    boxShadow: 'var(--shadow-soft)', cursor: 'pointer',
  },
  rowImg: { width: 68, height: 68, borderRadius: 12, display: 'flex', alignItems: 'flex-end', padding: 6, flexShrink: 0 },
  rowLevel: { fontSize: 10, color: '#fff', background: 'rgba(0,0,0,0.12)', padding: '2px 8px', borderRadius: 6 },
  rowInfo: { flex: 1, minWidth: 0 },
  rowTitle: { fontSize: 14, fontWeight: 500, color: 'var(--c-text)', marginBottom: 3 },
  rowMeta: { fontSize: 12, color: 'var(--c-text-secondary)' },
  rowTime: { fontSize: 11, color: 'var(--c-primary-deep)', marginTop: 2 },
}
