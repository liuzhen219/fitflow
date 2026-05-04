import { useNavigate } from 'react-router-dom'
import { SearchBar } from 'antd-mobile'

const hotSearches = [
  '核心床',
  '产后恢复',
  '林悦然',
  '体态矫正',
  '上门私教',
  '梵音普拉提',
]

export default function Search() {
  const nav = useNavigate()

  return (
    <div style={s.page}>
      {/* NavBar + SearchBar inline */}
      <div style={s.navBar}>
        <div style={s.navBack} onClick={() => nav(-1)}>←</div>
        <div style={s.searchWrapper}>
          <SearchBar
            placeholder="搜索课程、教练、场馆..."
            style={{
              '--border-radius': '20px',
              '--background': '#FFFFFF',
            } as React.CSSProperties}
          />
        </div>
      </div>

      {/* Hot Search Section */}
      <div style={s.section}>
        <div style={s.sectionTitle}>🔥 热门搜索</div>
        <div style={s.tagRow}>
          {hotSearches.map((tag) => (
            <span key={tag} style={s.tagChip}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#FFF5F0',
    padding: '0 12px',
  },

  // NavBar + Search inline
  navBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '12px 4px',
    paddingTop: 16,
  },
  navBack: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'rgba(232,180,162,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    color: '#4A3B3C',
    cursor: 'pointer',
    fontWeight: 700,
    lineHeight: 1,
    flexShrink: 0,
  },
  searchWrapper: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },

  // Hot Search
  section: {
    marginTop: 12,
    padding: 16,
    background: '#FFFFFF',
    borderRadius: 16,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#4A3B3C',
    marginBottom: 12,
  },
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
    color: '#4A3B3C',
    border: '1px solid #F0E8E0',
    cursor: 'pointer',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
    userSelect: 'none',
  },
}
