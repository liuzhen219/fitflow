import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Switch, Popup, Toast } from 'antd-mobile'
import { WarningIcon } from '../components/Icons'

export default function Settings() {
  const nav = useNavigate()
  const [pushOn, setPushOn] = useState(true)
  const [smsOn, setSmsOn] = useState(true)
  const [wechatOn, setWechatOn] = useState(false)
  const [darkMode, setDarkMode] = useState(() => document.documentElement.getAttribute('data-theme')?.includes('dark') || false)

  // Phone
  const [phoneVisible, setPhoneVisible] = useState(false)
  const [phoneStep, setPhoneStep] = useState<'verify' | 'new'>('verify')
  const [phoneCode, setPhoneCode] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleSendCode = () => Toast.show({ content: '验证码已发送' })
  const handleVerifyPhone = () => { setPhoneStep('new'); Toast.show({ content: '验证通过' }) }
  const handleChangePhone = () => {
    setPhoneVisible(false)
    setPhoneStep('verify')
    Toast.show({ icon: 'success', content: '手机号修改成功' })
  }

  // Password
  const [pwdVisible, setPwdVisible] = useState(false)
  const [oldPwd, setOldPwd] = useState('')
  const [newPwd, setNewPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const handleChangePwd = () => {
    if (!oldPwd || !newPwd || newPwd !== confirmPwd) {
      Toast.show({ content: '请检查输入' })
      return
    }
    setPwdVisible(false)
    Toast.show({ icon: 'success', content: '密码修改成功' })
  }

  // Delete account
  const [deleteVisible, setDeleteVisible] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')

  // Content pages
  const [contentVisible, setContentVisible] = useState(false)
  const [contentTitle, setContentTitle] = useState('')
  const [contentBody, setContentBody] = useState('')

  const showContent = (title: string, body: string) => {
    setContentTitle(title)
    setContentBody(body)
    setContentVisible(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px', borderRadius: 10, border: '1px solid #ddd',
    fontSize: 14, outline: 'none', boxSizing: 'border-box', marginBottom: 10,
  }

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
          fontSize: 20, color: '#fff', cursor: 'pointer', fontWeight: 400, lineHeight: '34px', flexShrink: 0,
        }}>‹</div>
        <span style={{ fontSize: 17, fontWeight: 600, color: '#222' }}>设置</span>
      </div>

      {/* Notification */}
      <div style={{ margin: '12px', background: '#fff', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f0f0', fontSize: 13, fontWeight: 600, color: '#6a6a6a' }}>通知设置</div>
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

      {/* Appearance */}
      <div style={{ margin: '0 12px 12px', background: '#fff', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f0f0', fontSize: 13, fontWeight: 600, color: '#6a6a6a' }}>外观</div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 16px',
        }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#222' }}>深色模式</div>
            <div style={{ fontSize: 12, color: '#929292', marginTop: 2 }}>切换深色界面，夜间更护眼</div>
          </div>
          <Switch checked={darkMode} onChange={(v) => {
            setDarkMode(v)
            const current = document.documentElement.getAttribute('data-theme') || ''
            const isMale = current.includes('male')
            if (v) {
              document.documentElement.setAttribute('data-theme', isMale ? 'dark male' : 'dark')
            } else {
              document.documentElement.setAttribute('data-theme', isMale ? 'male' : '')
            }
            localStorage.setItem('fitflow_dark', v ? '1' : '0')
          }} />
        </div>
      </div>

      {/* Account Security */}
      <div style={{ margin: '0 12px 12px', background: '#fff', borderRadius: 14, overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f0f0', fontSize: 13, fontWeight: 600, color: '#6a6a6a' }}>账户安全</div>
        {[
          { label: '修改手机号', value: '138****6789', action: () => setPhoneVisible(true) },
          { label: '修改密码', value: '', action: () => setPwdVisible(true) },
          { label: '注销账户', value: '', action: () => setDeleteVisible(true), danger: true },
        ].map((item) => (
          <div key={item.label} onClick={item.action} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px', borderBottom: '1px solid #f7f7f7', cursor: 'pointer',
          }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: item.danger ? '#c13515' : '#222' }}>{item.label}</span>
            <span style={{ fontSize: 13, color: '#929292' }}>{item.value || '›'}</span>
          </div>
        ))}
      </div>

      {/* About */}
      <div style={{ margin: '0 12px 12px', background: '#fff', borderRadius: 14, overflow: 'hidden' }}>
        {[
          { label: '用户协议', action: () => showContent('用户协议', agreement) },
          { label: '隐私政策', action: () => showContent('隐私政策', privacy) },
          { label: '关于 FitFlow', action: () => showContent('关于 FitFlow', about) },
          { label: '版本', value: 'v1.0.0', action: () => {} },
        ].map((item) => (
          <div key={item.label} onClick={item.action} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 16px', borderBottom: '1px solid #f7f7f7', cursor: 'pointer',
          }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#222' }}>{item.label}</span>
            <span style={{ fontSize: 13, color: '#929292' }}>{item.value || '›'}</span>
          </div>
        ))}
      </div>

      {/* Logout */}
      <div style={{ margin: '24px 12px' }}>
        <div onClick={() => nav('/')} style={{
          width: '100%', padding: '14px 0', borderRadius: 12, textAlign: 'center',
          background: '#fff', border: '1px solid #ddd', color: '#c13515',
          fontSize: 15, fontWeight: 600, cursor: 'pointer',
        }}>退出登录</div>
      </div>

      {/* ====== Phone Popup ====== */}
      <Popup visible={phoneVisible} onClose={() => { setPhoneVisible(false); setPhoneStep('verify') }} onMaskClick={() => { setPhoneVisible(false); setPhoneStep('verify') }}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#fff' }}>
        <div style={{ padding: '24px 16px 30px' }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 16 }}>修改手机号</div>
          {phoneStep === 'verify' ? (
            <>
              <div style={{ fontSize: 13, color: '#6a6a6a', marginBottom: 14 }}>当前手机号：138****6789，请先验证身份</div>
              <input placeholder="输入验证码" value={phoneCode} onChange={e => setPhoneCode(e.target.value)} style={inputStyle} />
              <div style={{ display: 'flex', gap: 10 }}>
                <div onClick={handleSendCode} style={{ flex: 1, padding: '12px', borderRadius: 10, textAlign: 'center', background: '#f7f7f7', color: '#222', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>获取验证码</div>
                <div onClick={handleVerifyPhone} style={{ flex: 1, padding: '12px', borderRadius: 10, textAlign: 'center', background: 'var(--c-accent)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>验证</div>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 13, color: '#6a6a6a', marginBottom: 14 }}>输入新的手机号</div>
              <input placeholder="新手机号" value={newPhone} onChange={e => setNewPhone(e.target.value)} style={inputStyle} />
              <input placeholder="验证码" style={inputStyle} />
              <div onClick={handleSendCode} style={{ fontSize: 13, color: 'var(--c-accent)', marginBottom: 16, cursor: 'pointer' }}>获取验证码</div>
              <div onClick={handleChangePhone} style={{ padding: '14px', borderRadius: 10, textAlign: 'center', background: 'var(--c-accent)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>确认修改</div>
            </>
          )}
        </div>
      </Popup>

      {/* ====== Password Popup ====== */}
      <Popup visible={pwdVisible} onClose={() => setPwdVisible(false)} onMaskClick={() => setPwdVisible(false)}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#fff' }}>
        <div style={{ padding: '24px 16px 30px' }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 16 }}>修改密码</div>
          <input type="password" placeholder="当前密码" value={oldPwd} onChange={e => setOldPwd(e.target.value)} style={inputStyle} />
          <input type="password" placeholder="新密码（至少6位）" value={newPwd} onChange={e => setNewPwd(e.target.value)} style={inputStyle} />
          <input type="password" placeholder="确认新密码" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} style={inputStyle} />
          <div onClick={handleChangePwd} style={{ padding: '14px', borderRadius: 10, textAlign: 'center', background: 'var(--c-accent)', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>确认修改</div>
        </div>
      </Popup>

      {/* ====== Delete Account Popup ====== */}
      <Popup visible={deleteVisible} onClose={() => setDeleteVisible(false)} onMaskClick={() => setDeleteVisible(false)}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#fff' }}>
        <div style={{ padding: '24px 16px 30px', textAlign: 'center' }}>
          <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
            <WarningIcon size={40} color="#c13515" />
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#c13515', marginBottom: 8 }}>注销账户</div>
          <div style={{ fontSize: 13, color: '#6a6a6a', lineHeight: 1.6, marginBottom: 16 }}>
            注销后，你的所有数据将被永久删除，包括课程记录、会员卡、优惠券等，且无法恢复。确定要继续吗？
          </div>
          <input placeholder='输入"确认注销"以继续' value={deleteConfirm} onChange={e => setDeleteConfirm(e.target.value)}
            style={{ ...inputStyle, textAlign: 'center' }} />
          <div style={{ display: 'flex', gap: 10 }}>
            <div onClick={() => setDeleteVisible(false)} style={{ flex: 1, padding: '14px', borderRadius: 10, textAlign: 'center', background: '#f7f7f7', color: '#222', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>取消</div>
            <div onClick={() => {
              if (deleteConfirm === '确认注销') { nav('/'); Toast.show({ content: '账户已注销' }) }
              else Toast.show({ content: '请输入"确认注销"' })
            }} style={{ flex: 1, padding: '14px', borderRadius: 10, textAlign: 'center', background: '#c13515', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>确认注销</div>
          </div>
        </div>
      </Popup>

      {/* ====== Content Page Popup ====== */}
      <Popup visible={contentVisible} onClose={() => setContentVisible(false)} onMaskClick={() => setContentVisible(false)}
        bodyStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, background: '#fff', maxHeight: '80vh' }}>
        <div style={{ padding: '20px 16px 30px' }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: '#222', marginBottom: 16, textAlign: 'center' }}>{contentTitle}</div>
          <div style={{ fontSize: 13, color: '#444', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{contentBody}</div>
        </div>
      </Popup>
    </div>
  )
}

const agreement = `欢迎使用 FitFlow！

一、服务条款
1.1 FitFlow 是一个普拉提综合平台，连接教练、场馆与健身爱好者。
1.2 用户注册即视为同意本协议，请仔细阅读。
1.3 平台有权根据运营需要调整服务内容和收费标准。

二、用户权利与义务
2.1 用户有权在平台预约课程、购买会员卡、参加线下活动。
2.2 用户应提供真实有效的个人信息，不得冒用他人身份。
2.3 用户应遵守课程预约规则，按时上课或提前取消。

三、平台责任
3.1 平台负责审核教练资质和场馆信息，保障服务质量。
3.2 平台提供第三方资金监管，保障交易安全。
3.3 因不可抗力导致的服务中断，平台不承担赔偿责任。

四、其他
4.1 本协议的解释权归 FitFlow 所有。
4.2 如有争议，双方应友好协商解决。`

const privacy = `FitFlow 隐私政策

一、信息收集
1.1 我们收集你的手机号、姓名、地址等账户信息。
1.2 我们收集你的课程预约、训练记录、身体数据等使用信息。
1.3 我们收集设备型号、操作系统版本等设备信息。

二、信息使用
2.1 用于提供课程预约、教练匹配等核心服务。
2.2 用于个性化推荐和用户体验优化。
2.3 经你授权后用于营销和活动通知。

三、信息保护
3.1 数据传输采用 HTTPS 加密，存储采用 AES 加密。
3.2 我们不会向第三方出售你的个人信息。
3.3 你随时可以在设置中管理你的隐私偏好。

四、你的权利
4.1 你可以查看、修改、删除你的个人数据。
4.2 你可以导出你的训练记录和身体数据。
4.3 注销账户后，所有数据将被永久删除。`

const about = `FitFlow v1.0.0

体态塑造的自由流动空间

FitFlow 是一个面向都市高端人群的普拉提垂直综合平台，以"教练强赋能 + 场馆重服务 + 场景全灵活"为核心定位。

我们连接专业教练、高品质场馆与中高端健身人群，提供全场景课程交付与全链路产业赋能服务。

核心功能：
· 教练与场馆双维度浏览
· 全场景约课（场馆课 / 上门私教）
· 教练 IP 打造与信任体系
· 线下活动社交
· 身体数据追踪
· 会员卡与优惠券体系

官方网站：www.fitflow.app
客服邮箱：help@fitflow.app
客服电话：400-888-6666

© 2026 FitFlow All Rights Reserved`
