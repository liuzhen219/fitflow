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

const s: Record<string, React.CSSProperties> = {
  card: {
    background: '#FFF5F0',
    borderRadius: 12,
    padding: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: '#F5D5C8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 700,
    color: '#D4A08A',
    flexShrink: 0,
    lineHeight: 1,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  },
  userName: {
    fontSize: 12,
    fontWeight: 600,
    color: '#4A3B3C',
    margin: 0,
    lineHeight: 1.2,
  },
  classCount: {
    fontSize: 10,
    color: '#8B7E74',
    margin: 0,
    lineHeight: 1.2,
  },
  content: {
    fontSize: 11,
    color: '#4A3B3C',
    margin: 0,
    lineHeight: 1.5,
  },
  tagsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 4,
  },
  tagChip: {
    display: 'inline-block',
    padding: '3px 8px',
    borderRadius: 10,
    fontSize: 10,
    background: '#F0E8E0',
    color: '#8B7E74',
    cursor: 'default',
    lineHeight: 1.2,
  },
  courseLabel: {
    fontSize: 10,
    color: '#C4A882',
    margin: 0,
    lineHeight: 1.2,
  },
  imagesRow: {
    display: 'flex',
    gap: 6,
    overflowX: 'auto',
  },
  imageThumb: {
    width: 52,
    height: 52,
    borderRadius: 8,
    objectFit: 'cover',
    flexShrink: 0,
    background: '#F0E8E0',
  },
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
    <div style={s.card}>
      <div style={s.header}>
        <div style={s.avatar}>
          {userAvatar ? (
            <img src={userAvatar} alt={userName} style={{ objectFit: 'cover', width: 32, height: 32, borderRadius: '50%' }} />
          ) : (
            userName.charAt(0)
          )}
        </div>
        <div style={s.userInfo}>
          <p style={s.userName}>{userName}</p>
          <p style={s.classCount}>{classCount}节课</p>
        </div>
      </div>

      <StarRating value={rating} />

      <p style={s.content}>{content}</p>

      {tags.length > 0 && (
        <div style={s.tagsRow}>
          {tags.map((tag, idx) => (
            <span key={idx} style={s.tagChip}>
              {tag}
            </span>
          ))}
        </div>
      )}

      <p style={s.courseLabel}>{courseLabel}</p>

      {images.length > 0 && (
        <div style={s.imagesRow}>
          {images.map((img, idx) => (
            <img key={idx} src={img} alt="" style={s.imageThumb} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ReviewCard
