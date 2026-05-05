import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SearchBar } from 'antd-mobile'
import { coaches, courses, venues } from '../data/mock'
import {
  FireIcon, SearchIcon, StarFilledIcon, ClockIcon,
  LocationIcon, BuildingIcon, UserIcon, CloseIcon,
  RefreshIcon, HomeServiceIcon,
} from '../components/Icons'

const hotSearches = ['核心床', '产后恢复', '林悦然', '体态矫正', '上门私教', '梵音普拉提', '脊柱侧弯', '塑形减脂']

const HISTORY_KEY = 'fitflow_search_history'

function loadHistory(): string[] {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]') } catch { return [] }
}
function saveHistory(terms: string[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(terms.slice(0, 10)))
}

export default function Search() {
  const nav = useNavigate()
  const [query, setQuery] = useState('')
  const [history, setHistory] = useState<string[]>(loadHistory)
  const [isFocused, setIsFocused] = useState(false)

  // Persist history
  useEffect(() => { saveHistory(history) }, [history])

  const addToHistory = (term: string) => {
    if (!term.trim()) return
    setHistory(prev => {
      const next = [term, ...prev.filter(h => h !== term)].slice(0, 10)
      return next
    })
  }

  const removeHistory = (term: string) => {
    setHistory(prev => prev.filter(h => h !== term))
  }

  // Search logic
  const results = useMemo(() => {
    if (!query.trim()) return null
    const q = query.trim().toLowerCase()

    const matchedCoaches = coaches.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.specialties.some(s => s.toLowerCase().includes(q)) ||
      c.certifications.some(cert => cert.toLowerCase().includes(q))
    )

    const matchedCourses = courses.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.coachName.toLowerCase().includes(q) ||
      c.venueName.toLowerCase().includes(q) ||
      c.targetAudience.some(t => t.toLowerCase().includes(q))
    )

    const matchedVenues = venues.filter(v =>
      v.name.toLowerCase().includes(q) ||
      v.district.toLowerCase().includes(q) ||
      v.address.toLowerCase().includes(q) ||
      v.facilities.some(f => f.toLowerCase().includes(q))
    )

    return { coaches: matchedCoaches, courses: matchedCourses, venues: matchedVenues }
  }, [query])

  const hasResults = results && (
    results.coaches.length > 0 || results.courses.length > 0 || results.venues.length > 0
  )

  const totalResults = results
    ? results.coaches.length + results.courses.length + results.venues.length
    : 0

  const doSearch = (term: string) => {
    setQuery(term)
    addToHistory(term)
  }

  const showHotAndHistory = !query.trim()

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      {/* NavBar + SearchBar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '12px 16px', paddingTop: 16, position: 'sticky', top: 0,
        background: '#fff', zIndex: 10, borderBottom: query ? '1px solid #f0f0f0' : 'none',
      }}>
        <div onClick={() => nav(-1)} style={{
          width: 32, height: 32, borderRadius: '50%',
          background: '#f7f7f7', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 16, color: '#222',
          cursor: 'pointer', fontWeight: 700, flexShrink: 0,
        }}>←</div>
        <div style={{ flex: 1 }}>
          <SearchBar
            placeholder="搜索教练、课程、场馆..."
            value={query}
            onChange={setQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onCancel={() => setQuery('')}
            onSearch={addToHistory}
            style={{
              '--border-radius': '20px',
              '--background': '#f7f7f7',
            } as React.CSSProperties}
          />
        </div>
      </div>

      {/* ====== Hot Search + History ====== */}
      {showHotAndHistory && (
        <div style={{ padding: '0 16px' }}>
          {/* History */}
          {history.length > 0 && (
            <div style={{ marginTop: 16, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#222', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <RefreshIcon size={14} color="#6a6a6a" /> 最近搜索
                </span>
                <span
                  onClick={() => setHistory([])}
                  style={{ fontSize: 12, color: '#6a6a6a', cursor: 'pointer' }}
                >
                  清除记录
                </span>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {history.map(h => (
                  <span
                    key={h}
                    onClick={() => doSearch(h)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '7px 14px', borderRadius: 20, fontSize: 13, fontWeight: 500,
                      background: '#f7f7f7', color: '#222', cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  >
                    {h}
                    <span onClick={(e) => { e.stopPropagation(); removeHistory(h) }}
                      style={{ display: 'inline-flex', fontSize: 10 }}>
                      <CloseIcon size={10} color="#999" />
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Hot Search */}
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
              <FireIcon size={14} color="#E3617B" /> 热门搜索
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {hotSearches.map(tag => (
                <span
                  key={tag}
                  onClick={() => doSearch(tag)}
                  style={{
                    padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 500,
                    background: '#fff', color: '#222', border: '1px solid #ddd',
                    cursor: 'pointer', userSelect: 'none',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ====== Search Results ====== */}
      {results && (
        <div style={{ padding: '0 16px 24px' }}>
          {/* Result count */}
          <div style={{
            padding: '14px 0', fontSize: 13, fontWeight: 500, color: '#6a6a6a',
            borderBottom: hasResults ? '1px solid #f0f0f0' : 'none',
          }}>
            {hasResults
              ? `找到 ${totalResults} 个结果`
              : '未找到相关结果，试试其他关键词'}
          </div>

          {!hasResults && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>
              <SearchIcon size={48} color="#ddd" />
              <p style={{ marginTop: 12, fontSize: 14 }}>换个关键词试试？</p>
            </div>
          )}

          {/* Coaches */}
          {results.coaches.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <div style={{
                fontSize: 13, fontWeight: 600, color: '#6a6a6a',
                marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <UserIcon size={14} color="#6a6a6a" /> 教练
              </div>
              {results.coaches.map(c => (
                <div
                  key={c.id}
                  onClick={() => { addToHistory(query); nav(`/coach/${c.id}`) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 0', borderBottom: '1px solid #f0f0f0', cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
                    position: 'relative', overflow: 'hidden',
                    background: '#f5e0d8',
                  }}>
                    {c.avatar && (
                      <img
                        src={c.avatar}
                        alt=""
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#222' }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: '#6a6a6a', marginTop: 2 }}>
                      {c.title} · {c.specialties.slice(0, 3).join('、')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
                    <StarFilledIcon size={12} color="#E3617B" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#222' }}>{c.rating.toFixed(1)}</span>
                  </div>
                  <span style={{ fontSize: 18, color: '#ccc', flexShrink: 0 }}>›</span>
                </div>
              ))}
            </div>
          )}

          {/* Courses */}
          {results.courses.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{
                fontSize: 13, fontWeight: 600, color: '#6a6a6a',
                marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <ClockIcon size={14} color="#6a6a6a" /> 课程
              </div>
              {results.courses.map(c => (
                <div
                  key={c.id}
                  onClick={() => { addToHistory(query); nav(`/course/${c.id}`) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 0', borderBottom: '1px solid #f0f0f0', cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 10, flexShrink: 0,
                    position: 'relative', overflow: 'hidden',
                    background: c.imageGradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {c.thumbnail && (
                      <img
                        src={c.thumbnail}
                        alt=""
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                    {c.isHomeService && !c.thumbnail && <HomeServiceIcon size={20} color="#fff" />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#222' }}>{c.title}</div>
                    <div style={{ fontSize: 12, color: '#6a6a6a', marginTop: 2 }}>
                      {c.coachName} · {c.isHomeService ? '上门服务' : c.venueName} · {c.duration}分钟
                    </div>
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 600, color: '#222', flexShrink: 0 }}>¥{c.price}</span>
                  <span style={{ fontSize: 18, color: '#ccc', flexShrink: 0 }}>›</span>
                </div>
              ))}
            </div>
          )}

          {/* Venues */}
          {results.venues.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <div style={{
                fontSize: 13, fontWeight: 600, color: '#6a6a6a',
                marginBottom: 10, display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <BuildingIcon size={14} color="#6a6a6a" /> 场馆
              </div>
              {results.venues.map(v => (
                <div
                  key={v.id}
                  onClick={() => { addToHistory(query); nav(`/venue/${v.id}`) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '12px 0', borderBottom: '1px solid #f0f0f0', cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: 10, flexShrink: 0,
                    position: 'relative', overflow: 'hidden',
                    background: 'linear-gradient(135deg, #f5e0d8, #e8d4c8)',
                  }}>
                    {v.heroImage && (
                      <img
                        src={v.heroImage}
                        alt=""
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: '#222', display: 'flex', alignItems: 'center', gap: 4 }}>
                      {v.name}
                      {v.verified && (
                        <span style={{
                          fontSize: 10, color: '#E3617B', background: 'rgba(227,97,123,0.08)',
                          padding: '1px 6px', borderRadius: 4, fontWeight: 500,
                        }}>已核验</span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: '#6a6a6a', marginTop: 2 }}>
                      <LocationIcon size={10} color="#6a6a6a" /> {v.district} · {v.distance} · ⭐{v.rating.toFixed(1)}
                    </div>
                  </div>
                  <span style={{ fontSize: 18, color: '#ccc', flexShrink: 0 }}>›</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
