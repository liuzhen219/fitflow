import { Popup, Toast } from 'antd-mobile'
import { useAppState } from '../store/AppContext'
import { ShareIcon } from './Icons'
import type { FeedPost } from '../data/mock'

interface ShareSheetProps {
  visible: boolean
  onClose: () => void
  post: FeedPost
}

const INVITE_CODE = 'FITFLOW-LI888'

const channels = [
  { key: 'wechat', label: '微信好友', icon: '💬', color: '#07C160' },
  { key: 'moments', label: '朋友圈', icon: '🟢', color: '#07C160' },
  { key: 'copylink', label: '复制链接', icon: '🔗', color: '#6a6a6a' },
  { key: 'poster', label: '生成海报', icon: '🖼️', color: '#FF6B35' },
]

export default function ShareSheet({ visible, onClose, post }: ShareSheetProps) {
  const { earnPoints } = useAppState()

  const shareText = `【FitFlow普拉提】${post.userName}分享了训练心得：「${post.content.slice(0, 40)}...」\n\n${post.coachName} · ${post.courseLabel}\n\n点击查看 → https://fitflow.app/share/${post.id}?ref=${INVITE_CODE}\n\n注册时输入邀请码 ${INVITE_CODE} 得50积分！`

  const handleShare = (channel: string) => {
    onClose()
    switch (channel) {
      case 'wechat':
        Toast.show({ content: '已唤起微信分享（模拟）' })
        break
      case 'moments':
        Toast.show({ content: '已唤起朋友圈分享（模拟）' })
        break
      case 'copylink':
        navigator.clipboard?.writeText(shareText)
        Toast.show({ icon: 'success', content: '分享文案已复制，可粘贴到微信/朋友圈' })
        break
      case 'poster':
        Toast.show({ content: '海报已生成（模拟）' })
        break
    }
    earnPoints(10, '分享优质内容')
  }

  const handleNativeShare = async () => {
    onClose()
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${post.userName}的训练心得 · FitFlow普拉提`,
          text: `FitFlow普拉提 | ${post.coachName} · ${post.courseLabel}`,
          url: `https://fitflow.app/share/${post.id}?ref=${INVITE_CODE}`,
        })
        earnPoints(10, '分享优质内容')
        Toast.show({ icon: 'success', content: '分享成功！+10积分' })
      } catch {
        // user cancelled
      }
    } else {
      navigator.clipboard?.writeText(shareText)
      Toast.show({ icon: 'success', content: '链接已复制，可粘贴分享' })
      earnPoints(10, '分享优质内容')
    }
  }

  return (
    <Popup
      visible={visible}
      onClose={onClose}
      onMaskClick={onClose}
      bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#fff' }}
    >
      <div style={{ padding: '20px 16px 30px' }}>
        {/* Title */}
        <div style={{ fontSize: 16, fontWeight: 600, color: '#222', textAlign: 'center', marginBottom: 4 }}>
          分享到
        </div>
        <div style={{ fontSize: 12, color: '#6a6a6a', textAlign: 'center', marginBottom: 20 }}>
          分享优质内容可获得 <span style={{ color: 'var(--c-accent)', fontWeight: 600 }}>+10 积分</span>
        </div>

        {/* Channel grid */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 24 }}>
          {channels.map(ch => (
            <div key={ch.key}
              onClick={() => handleShare(ch.key)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer' }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: '#f7f7f7', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 24,
              }}>
                {ch.icon}
              </div>
              <span style={{ fontSize: 12, color: '#222', fontWeight: 500 }}>{ch.label}</span>
            </div>
          ))}
        </div>

        {/* Native share button */}
        <div
          onClick={handleNativeShare}
          style={{
            padding: '14px', borderRadius: 12, background: '#f7f7f7',
            textAlign: 'center', fontSize: 14, fontWeight: 600, color: '#222',
            cursor: 'pointer', marginBottom: 10,
          }}
        >
          <ShareIcon size={16} color="#222" />{' '}系统分享
        </div>

        {/* Share preview */}
        <div style={{
          borderRadius: 12, border: '1px solid #eee', overflow: 'hidden',
          background: '#fafafa', padding: 12,
        }}>
          <div style={{ fontSize: 11, color: '#929292', marginBottom: 8 }}>分享预览</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 4 }}>
            {post.userName}的训练心得
          </div>
          <div style={{ fontSize: 12, color: '#6a6a6a', lineHeight: 1.6, marginBottom: 6 }}>
            {post.content.slice(0, 80)}{post.content.length > 80 ? '...' : ''}
          </div>
          <div style={{ fontSize: 11, color: '#929292' }}>
            {post.coachName} · {post.courseLabel}
          </div>
          <div style={{
            marginTop: 8, padding: '6px 10px', borderRadius: 6,
            background: 'var(--c-accent-soft)', fontSize: 11, fontWeight: 500, color: 'var(--c-accent)',
          }}>
            邀请码：{INVITE_CODE} | 双方各得50积分 🎁
          </div>
        </div>

        {/* Cancel */}
        <div
          onClick={onClose}
          style={{
            marginTop: 12, padding: '14px', borderRadius: 12, background: '#fff',
            border: '1px solid #ddd', textAlign: 'center', fontSize: 14,
            fontWeight: 600, color: '#6a6a6a', cursor: 'pointer',
          }}
        >
          取消
        </div>
      </div>
    </Popup>
  )
}
