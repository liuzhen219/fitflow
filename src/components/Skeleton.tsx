import React from 'react'

const base: React.CSSProperties = {
  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.4s ease-in-out infinite',
  borderRadius: 8,
}

interface SkeletonProps {
  w?: number | string
  h?: number
  circle?: boolean
  count?: number
  gap?: number
  style?: React.CSSProperties
}

export const Skeleton: React.FC<SkeletonProps> = ({ w = '100%', h = 14, circle, count = 1, gap = 8, style }) => {
  const items = Array.from({ length: count })
  const elStyle: React.CSSProperties = {
    ...base,
    width: w,
    height: h,
    borderRadius: circle ? '50%' : 8,
    ...style,
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap }}>
      {items.map((_, i) => (
        <div key={i} style={elStyle} />
      ))}
    </div>
  )
}

export const SkeletonCard: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={{
    display: 'flex', gap: 14, padding: '16px 0', borderBottom: '1px solid #f0f0f0',
    ...style,
  }}>
    <div style={{ ...base, width: 110, height: 110, borderRadius: 14, flexShrink: 0 }} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 8 }}>
      <div>
        <div style={{ ...base, width: '70%', height: 16, marginBottom: 8 }} />
        <div style={{ ...base, width: '50%', height: 13 }} />
      </div>
      <div style={{ ...base, width: '40%', height: 13 }} />
    </div>
  </div>
)

export const SkeletonFeedCard: React.FC = () => (
  <div style={{
    background: '#fff', borderRadius: 14, padding: 16, border: '1px solid #f0f0f0', marginBottom: 12,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
      <div style={{ ...base, width: 40, height: 40, borderRadius: '50%' }} />
      <div>
        <div style={{ ...base, width: 80, height: 13, marginBottom: 4 }} />
        <div style={{ ...base, width: 50, height: 11 }} />
      </div>
    </div>
    <div style={{ ...base, width: '100%', height: 13, marginBottom: 6 }} />
    <div style={{ ...base, width: '60%', height: 13, marginBottom: 10 }} />
    <div style={{ ...base, width: '100%', height: 180, borderRadius: 12, marginBottom: 10 }} />
    <div style={{ display: 'flex', gap: 20 }}>
      <div style={{ ...base, width: 50, height: 13 }} />
      <div style={{ ...base, width: 50, height: 13 }} />
    </div>
  </div>
)

export const SkeletonCoachCard: React.FC = () => (
  <div style={{ minWidth: 156, flexShrink: 0 }}>
    <div style={{ ...base, width: '100%', height: 200, borderRadius: 14, marginBottom: 10 }} />
    <div style={{ ...base, width: '60%', height: 15, marginBottom: 6 }} />
    <div style={{ ...base, width: '40%', height: 13 }} />
  </div>
)

export const SkeletonVenueCard: React.FC = () => (
  <div style={{ minWidth: 220, flexShrink: 0 }}>
    <div style={{ ...base, width: '100%', height: 140, borderRadius: 14, marginBottom: 8 }} />
    <div style={{ ...base, width: '70%', height: 14, marginBottom: 6 }} />
    <div style={{ ...base, width: '50%', height: 12 }} />
  </div>
)

// Inject shimmer keyframes once
if (typeof document !== 'undefined') {
  const id = 'skeleton-shimmer'
  if (!document.getElementById(id)) {
    const style = document.createElement('style')
    style.id = id
    style.textContent = '@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }'
    document.head.appendChild(style)
  }
}
