import React from 'react'
import StarRating from './StarRating'

interface ReviewCardProps {
  userName: string
  userAvatar?: string
  rating: number
  tags: string[]
  content: string
  images: string[]
  courseLabel: string
  classCount: number
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  userName,
  userAvatar,
  rating,
  tags,
  content,
  images,
  courseLabel,
  classCount,
}) => {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 14,
        border: '1px solid #ddd',
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {/* Header: avatar + name + rating on one row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: '#f7f7f7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              fontWeight: 600,
              color: '#6a6a6a',
              flexShrink: 0,
              lineHeight: 1,
              overflow: 'hidden',
            }}
          >
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                style={{
                  objectFit: 'cover',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                }}
              />
            ) : (
              userName.charAt(0)
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: '#222',
                margin: 0,
                lineHeight: 1.25,
              }}
            >
              {userName}
            </p>
            <p
              style={{
                fontSize: 12,
                color: '#6a6a6a',
                margin: 0,
                lineHeight: 1.29,
              }}
            >
              {classCount}节课
            </p>
          </div>
        </div>
        <StarRating value={rating} size={14} />
      </div>

      <p
        style={{
          fontSize: 14,
          color: '#222',
          margin: 0,
          lineHeight: 1.43,
        }}
      >
        {content}
      </p>

      {tags.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {tags.map((tag, idx) => (
            <span
              key={idx}
              style={{
                display: 'inline-block',
                padding: '4px 8px',
                borderRadius: 4,
                fontSize: 11,
                background: '#f7f7f7',
                color: '#6a6a6a',
                cursor: 'default',
                lineHeight: 1.29,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <p
        style={{
          fontSize: 12,
          color: '#6a6a6a',
          margin: 0,
          lineHeight: 1.29,
        }}
      >
        {courseLabel}
      </p>

      {images.length > 0 && (
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt=""
              style={{
                width: 56,
                height: 56,
                borderRadius: 8,
                objectFit: 'cover',
                flexShrink: 0,
                background: '#f7f7f7',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewCard
