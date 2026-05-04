import { useNavigate, useParams } from 'react-router-dom'
import { NavBar, Button, DatePicker, CheckList, Toast, Stepper, TextArea } from 'antd-mobile'
import { useState } from 'react'

const timeSlots = [
  { value: '1', label: '周一 9:00 — 9:45', disabled: false },
  { value: '2', label: '周一 10:30 — 11:15', disabled: false },
  { value: '3', label: '周三 9:00 — 9:45', disabled: false },
  { value: '4', label: '周三 14:00 — 14:45', disabled: false },
  { value: '5', label: '周五 9:00 — 9:45', disabled: false },
  { value: '6', label: '周五 16:00 — 16:45', disabled: true },
]

export default function Booking() {
  const { id } = useParams()
  const nav = useNavigate()
  const [time, setTime] = useState<string[]>([])
  const [count, setCount] = useState(1)
  const [note, setNote] = useState('')
  const [visible, setVisible] = useState(false)

  const handleSubmit = () => {
    if (!time.length) { Toast.show({ icon: 'fail', content: '请选择上课时间' }); return }
    Toast.show({ icon: 'success', content: '预约成功！' })
    setTimeout(() => nav('/home'), 800)
  }

  return (
    <div style={s.page}>
      <NavBar onBack={() => nav(-1)}>预约课程</NavBar>

      <div style={s.body}>
        <div style={s.card}>
          <div style={s.courseInfo}>
            <div style={{ ...s.courseImg, background: 'linear-gradient(135deg, #E8DDD2, #D9CFC0)' }} />
            <div>
              <h4 style={s.courseTitle}>核心床基础 · 脊柱灵活</h4>
              <p style={s.courseMeta}>林若溪 · 45 min · 初级</p>
            </div>
          </div>
        </div>

        {/* 上课时间 */}
        <div style={s.block}>
          <h3 style={s.blockTitle}>选择时间</h3>
          <CheckList value={time} onChange={v => setTime(v as string[])} style={s.checklist}>
            {timeSlots.map(t => (
              <CheckList.Item key={t.value} value={t.value} disabled={t.disabled} style={s.clItem}>
                {t.label}{t.disabled ? ' (已满)' : ''}
              </CheckList.Item>
            ))}
          </CheckList>
        </div>

        {/* 人数 */}
        <div style={s.block}>
          <h3 style={s.blockTitle}>预约人数</h3>
          <div style={s.stepper}>
            <Stepper value={count} onChange={setCount} min={1} max={4} style={{ '--border': '1px solid rgba(200,182,166,0.2)', '--border-radius': '12px' } as any} />
          </div>
        </div>

        {/* 备注 */}
        <div style={s.block}>
          <h3 style={s.blockTitle}>备注</h3>
          <TextArea value={note} onChange={setNote} placeholder="如有特殊情况请备注（选填）" rows={3} style={s.textarea} />
        </div>

        {/* 费用 */}
        <div style={s.priceBlock}>
          <span>小计</span>
          <div>
            <span style={s.priceNum}>¥198</span>
            <span style={s.priceMul}> ×{count}</span>
            <span style={s.priceTotal}> = ¥{198 * count}</span>
          </div>
        </div>

        <Button block color="primary" size="large" onClick={handleSubmit} style={s.btn}>
          确认预约
        </Button>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: 'var(--c-bg)' },
  body: { padding: '12px 20px 40px' },
  card: { background: 'var(--c-bg-card)', borderRadius: 18, padding: 16, boxShadow: 'var(--shadow-soft)', marginBottom: 20 },
  courseInfo: { display: 'flex', alignItems: 'center', gap: 14 },
  courseImg: { width: 56, height: 56, borderRadius: 12, flexShrink: 0 },
  courseTitle: { fontSize: 15, fontWeight: 500, color: 'var(--c-text)', marginBottom: 4 },
  courseMeta: { fontSize: 12, color: 'var(--c-text-secondary)' },
  block: { marginBottom: 24 },
  blockTitle: { fontSize: 16, fontWeight: 500, color: 'var(--c-text)', marginBottom: 12 },
  checklist: { '--active-background-color': 'rgba(200,182,166,0.08)', '--font-size': '14px' } as any,
  clItem: { padding: '13px 16px', borderBottom: '1px solid rgba(200,182,166,0.06)' },
  stepper: { display: 'inline-block' },
  textarea: {
    '--font-size': '14px',
    '--placeholder-color': '#C0BBB6',
    '--color': 'var(--c-text)',
    background: 'var(--c-bg-card)',
    borderRadius: 14,
    padding: 12,
    border: '1px solid rgba(200,182,166,0.15)',
  } as any,
  priceBlock: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 0', borderTop: '1px solid rgba(200,182,166,0.1)',
    marginBottom: 16, fontSize: 14, color: 'var(--c-text-secondary)',
  },
  priceNum: { fontSize: 20, fontWeight: 600, color: 'var(--c-primary-deep)' },
  priceMul: { fontSize: 13, color: 'var(--c-text-secondary)' },
  priceTotal: { fontSize: 20, fontWeight: 600, color: 'var(--c-text)' },
  btn: {
    '--color': '#C8B6A6', borderRadius: 28, height: 50, fontSize: 16,
    fontWeight: 500, boxShadow: '0 6px 24px rgba(200,182,166,0.35)', border: 'none',
  } as any,
}
