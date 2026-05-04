import React, { useState } from 'react'

interface StarRatingProps {
  value: number
  onChange?: (v: number) => void
  size?: number
}

const StarRating: React.FC<StarRatingProps> = ({ value, onChange, size = 28 }) => {
  const [hover, setHover] = useState(0)

  const active = hover || value

  return (
    <div style={{ display: 'inline-flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onMouseEnter={() => onChange && setHover(star)}
          onMouseLeave={() => onChange && setHover(0)}
          onClick={() => onChange?.(star)}
          style={{
            fontSize: size,
            opacity: star <= active ? 1 : 0.25,
            cursor: onChange ? 'pointer' : 'default',
            lineHeight: 1,
            userSelect: 'none',
            transition: 'opacity 0.15s',
          }}
        >
          ⭐
        </span>
      ))}
    </div>
  )
}

export default StarRating
