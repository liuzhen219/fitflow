import React, { useState, useCallback } from 'react'
import { HeartIcon, HeartFilledIcon, CommentIcon, ShareIcon } from './Icons'
import { useAppState } from '../store/AppContext'
import type { FeedPost } from '../data/mock'
import ShareSheet from './ShareSheet'

interface FeedCardProps {
  post: FeedPost
  compact?: boolean
  onClick?: () => void
}

const FeedCard: React.FC<FeedCardProps> = ({ post, compact, onClick }) => {
  const { toggleLike, addComment } = useAppState()
  const [showComments, setShowComments] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLike = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    toggleLike(post.id)
  }, [post.id, toggleLike])

  const handleSubmitComment = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    const text = commentText.trim()
    if (!text) return
    setIsSubmitting(true)
    addComment(post.id, text)
    setCommentText('')
    setShowComments(true)
    setIsSubmitting(false)
  }, [post.id, commentText, addComment])

  const handleCommentTap = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    setShowComments(v => !v)
  }, [])

  const imageCount = post.images.length

  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff',
        borderRadius: 14,
        border: '1px solid #ddd',
        padding: compact ? '10px' : '16px',
        cursor: onClick ? 'pointer' : 'default',
        marginBottom: compact ? 0 : 12,
      }}
    >
      {/* Header: avatar + name + time */}
      <div style={{ display: 'flex', alignItems: 'center', gap: compact ? 8 : 10, marginBottom: compact ? 6 : 10 }}>
        <img
          src={post.userAvatar}
          alt={post.userName}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          style={{
            width: compact ? 28 : 40,
            height: compact ? 28 : 40,
            borderRadius: '50%',
            objectFit: 'cover',
            flexShrink: 0,
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: compact ? 12 : 15, fontWeight: 600, color: '#222', lineHeight: 1.25 }}>
            {post.userName}
          </div>
          <div style={{ fontSize: compact ? 10 : 12, color: '#929292', marginTop: 1 }}>
            {post.time}
          </div>
        </div>
      </div>

      {/* Content text */}
      <p style={{
        fontSize: compact ? 12 : 14,
        color: '#222',
        lineHeight: 1.57,
        margin: compact ? '0 0 4px 0' : '0 0 8px 0',
        display: '-webkit-box',
        WebkitLineClamp: compact ? 1 : undefined,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {post.content}
      </p>

      {/* Course tag */}
      <div style={{ display: 'flex', gap: 6, marginBottom: compact ? 6 : 10, flexWrap: 'wrap' }}>
        <span style={{
          padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 500,
          background: '#FFF0EE', color: 'var(--c-accent)',
        }}>
          {post.courseLabel}
        </span>
        <span style={{
          padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 500,
          background: '#f7f7f7', color: '#6a6a6a',
        }}>
          {post.coachName}
        </span>
      </div>

      {/* Image grid */}
      {imageCount > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: imageCount === 1 ? '1fr' : imageCount === 2 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
          gap: 6,
          marginBottom: compact ? 8 : 12,
        }}>
          {post.images.map((img, i) => (
            <div
              key={i}
              style={{
                borderRadius: 8,
                overflow: 'hidden',
                aspectRatio: '1 / 1',
                background: '#f0f0f0',
              }}
            >
              <img
                src={img}
                alt={`${post.userName}分享${i + 1}`}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Action bar: likes + comments */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span
          onClick={handleLike}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            cursor: 'pointer', userSelect: 'none',
            fontSize: compact ? 12 : 13, fontWeight: 500,
            color: post.liked ? '#E3617B' : '#6a6a6a',
          }}
        >
          {post.liked
            ? <HeartFilledIcon size={compact ? 14 : 16} color="#E3617B" />
            : <HeartIcon size={compact ? 14 : 16} color="#6a6a6a" />
          }
          {post.likes}
        </span>
        <span
          onClick={handleCommentTap}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: compact ? 12 : 13, fontWeight: 500, color: '#6a6a6a',
            cursor: 'pointer', userSelect: 'none',
          }}
        >
          <CommentIcon size={compact ? 14 : 16} color="#6a6a6a" />
          {post.comments.length}
        </span>
        {!compact && (
          <span
            onClick={(e) => {
              e.stopPropagation()
              setShowShare(true)
            }}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontSize: 13, fontWeight: 500, color: '#6a6a6a',
              cursor: 'pointer', userSelect: 'none', marginLeft: 'auto',
            }}
          >
            <ShareIcon size={compact ? 14 : 16} color="#6a6a6a" />
          </span>
        )}
      </div>

      {/* Comments section */}
      {showComments && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ marginTop: 10, borderTop: '1px solid #f0f0f0', paddingTop: 10 }}
        >
          {post.comments.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              {post.comments.map((c) => (
                <div key={c.id} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13 }}>
                  <img
                    src={c.userAvatar}
                    alt=""
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 600, color: '#222', marginRight: 6 }}>{c.userName}</span>
                    <span style={{ color: '#444' }}>{c.content}</span>
                    <div style={{ fontSize: 11, color: '#929292', marginTop: 2 }}>{c.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Comment input */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="写评论..."
              style={{
                flex: 1, padding: '8px 12px', borderRadius: 18, border: '1px solid #ddd',
                fontSize: 13, outline: 'none', background: '#f7f7f7',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isSubmitting) {
                  handleSubmitComment(e as unknown as React.MouseEvent)
                }
              }}
            />
            <span
              onClick={handleSubmitComment}
              style={{
                fontSize: 13, fontWeight: 600, color: commentText.trim() ? 'var(--c-accent)' : '#ccc',
                cursor: commentText.trim() ? 'pointer' : 'default', flexShrink: 0, userSelect: 'none',
              }}
            >
              发送
            </span>
          </div>
        </div>
      )}

      {/* Share Sheet */}
      <ShareSheet
        visible={showShare}
        onClose={() => setShowShare(false)}
        post={post}
      />
    </div>
  )
}

export default FeedCard
