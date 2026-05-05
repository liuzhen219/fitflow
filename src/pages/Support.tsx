import { useNavigate } from 'react-router-dom'
import { SupportIcon, ClockIcon, CheckIcon, SparkleIcon } from '../components/Icons'

const faqs = [
  { q: '如何取消已预约的课程？', a: '在「行程」页面找到对应课程，开课前1小时可免费取消并退款。超过截止时间将无法取消。' },
  { q: '退款多久到账？', a: '取消课程后，退款将在1-3个工作日内原路返回你的支付账户。' },
  { q: '如何更换绑定的手机号？', a: '前往「设置」→「账户安全」→「修改手机号」，按提示验证身份后即可更换。' },
  { q: '上门私教的费用包含场地费吗？', a: '上门私教不包含场地费，费用仅为教练教学费。如需要教练协助预约场地，可在预约时备注。' },
  { q: '如何给教练写评价？', a: '课程完结后，在「行程-已完结」列表点击「去评价」，或从教练主页点击「写评价」按钮。' },
  { q: '会员卡能否转让？', a: '目前会员卡暂不支持转让，仅限本人使用。如有特殊情况请联系客服。' },
]

export default function Support() {
  const nav = useNavigate()

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
        <span style={{ fontSize: 17, fontWeight: 600, color: '#222' }}>客服帮助</span>
      </div>

      {/* Contact */}
      <div style={{ margin: '12px', background: '#fff', borderRadius: 14, padding: '16px' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <SupportIcon size={16} color="var(--c-accent)" /> 联系我们
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {[
            { icon: '📞', label: '客服电话', value: '400-888-6666', sub: '工作日 09:00-21:00' },
            { icon: '💬', label: '在线客服', value: '点此发起对话', sub: '响应时间 < 5分钟' },
            { icon: '📧', label: '邮件支持', value: 'help@fitflow.app', sub: '24小时内回复' },
          ].map((item) => (
            <div key={item.label} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
              borderBottom: '1px solid #f7f7f7', cursor: 'pointer',
            }}>
              <span style={{ fontSize: 24 }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: '#222' }}>{item.label}</div>
                <div style={{ fontSize: 12, color: '#6a6a6a', marginTop: 2 }}>{item.sub}</div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--c-accent)' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ margin: '0 12px 12px', background: '#fff', borderRadius: 14, padding: '16px' }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#222', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
          <SparkleIcon size={16} color="var(--c-accent)" /> 常见问题
        </div>
        {faqs.map((faq, i) => (
          <div key={i} style={{
            padding: '12px 0', borderBottom: i < faqs.length - 1 ? '1px solid #f7f7f7' : 'none',
          }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#222', marginBottom: 4, display: 'flex', alignItems: 'flex-start', gap: 6 }}>
              <span style={{ color: 'var(--c-accent)', fontWeight: 700, flexShrink: 0 }}>Q</span>
              {faq.q}
            </div>
            <div style={{ fontSize: 13, color: '#6a6a6a', lineHeight: 1.5, paddingLeft: 22, display: 'flex', alignItems: 'flex-start', gap: 6 }}>
              <span style={{ color: '#16A34A', fontWeight: 700, flexShrink: 0 }}>A</span>
              {faq.a}
            </div>
          </div>
        ))}
      </div>

      {/* Service time */}
      <div style={{ margin: '0 12px 40px', padding: '14px 16px', background: '#fff', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
        <ClockIcon size={18} color="var(--c-accent)" />
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, color: '#222' }}>客服工作时间</div>
          <div style={{ fontSize: 12, color: '#6a6a6a', marginTop: 2 }}>工作日 09:00 - 21:00 · 周末 10:00 - 18:00</div>
        </div>
      </div>
    </div>
  )
}
