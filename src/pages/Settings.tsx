import { useNavigate } from 'react-router-dom'
import { Switch } from 'antd-mobile'
import { useState } from 'react'

export default function Settings() {
  const nav = useNavigate()
  const [pushOn, setPushOn] = useState(true)
  const [smsOn, setSmsOn] = useState(true)
  const [wechatOn, setWechatOn] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: '#f7f7f7' }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', padding: '14px 16px', background: '#fff',
        borderBottom: '1px solid #eee', gap: 8,
      }}>
        <div onClick={() => nav(-1)} style={{
          width: 34, height: 34, borderRadius: '50%', background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, color: '#fff', cursor: 'pointer', fontWeight: 500, lineHeight: 1,
        }}>‹</div>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#222' }}>设置</span>
      </div>

      {/* Notification Settings */}
      <div style={{ margin: '12px', background: '#fff', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f0f0', fontSize: 13, fontWeight: 600, color: '#6a6a6a' }}>
          通知设置
        </div>
        {[
          { label: '推送通知', desc: '课程提醒、活动通知', state: pushOn, set: setPushOn },
          { label: '短信通知', desc: '重要变更通过短信告知', state: smsOn, set: setSmsOn },
          { label: '微信通知', desc: '接收微信公众号消息', state: wechatOn, set: setWechatOn },
        ].map((item) => (
          <div key={item.label} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px', borderBottom: '1px solid #f7f7f7',
          }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, color: '#222' }}>{item.label}</div>
              <div style={{ fontSize: 12, color: '#929292', marginTop: 2 }}>{item.desc}</div>
            </div>
            <Switch checked={item.state} onChange={item.set} />
          </div>
        ))}
      </div>

      {/* Account */}
      <div style={{ margin: '0 12px 12px', background: '#fff', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f0f0', fontSize: 13, fontWeight: 600, color: '#6a6a6a' }}>
          账户安全
        </div>
        {['修改手机号', '修改密码', '注销账户'].map((label) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px', borderBottom: '1px solid #f7f7f7',
            cursor: 'pointer',
          }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#222' }}>{label}</span>
            <span style={{ fontSize: 14, color: '#ccc' }}>›</span>
          </div>
        ))}
      </div>

      {/* About */}
      <div style={{ margin: '0 12px 12px', background: '#fff', borderRadius: 14, overflow: 'hidden' }}>
        {[
          ['用户协议', '隐私政策', '关于 FitFlow', '版本'],
        ].map((group) => group.map((label) => (
          <div key={label} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px', borderBottom: '1px solid #f7f7f7',
            cursor: 'pointer',
          }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#222' }}>{label}</span>
            <span style={{ fontSize: 12, color: '#6a6a6a' }}>
              {label === '版本' ? 'v1.0.0' : '›'}
            </span>
          </div>
        )))}
      </div>

      {/* Logout */}
      <div style={{ margin: '24px 12px' }}>
        <div onClick={() => nav('/')} style={{
          width: '100%', padding: '14px 0', borderRadius: 12, textAlign: 'center',
          background: '#fff', border: '1px solid #ddd', color: '#c13515',
          fontSize: 15, fontWeight: 600, cursor: 'pointer',
        }}>
          退出登录
        </div>
      </div>
    </div>
  )
}
