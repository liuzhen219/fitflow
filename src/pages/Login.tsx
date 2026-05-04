import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NavBar, Button, Input, Form, Toast, Checkbox } from 'antd-mobile'

export default function Login() {
  const nav = useNavigate()
  const [isLogin, setIsLogin] = useState(true)
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = () => {
    Toast.show({ icon: 'success', content: isLogin ? '登录成功' : '注册成功' })
    setTimeout(() => nav('/home'), 600)
  }

  return (
    <div style={s.page}>
      <NavBar onBack={() => nav(-1)} style={s.nav}>
        {isLogin ? '登录' : '注册'}
      </NavBar>

      <div style={s.body}>
        <div style={s.header}>
          <h2 style={s.title}>{isLogin ? '欢迎回来' : '加入我们'}</h2>
          <p style={s.sub}>{isLogin ? '继续你的普拉提之旅' : '开启身心平衡的新篇章'}</p>
        </div>

        <Form layout="horizontal" style={s.form}>
          {!isLogin && (
            <Form.Item>
              <Input placeholder="昵称" clearable style={s.input} />
            </Form.Item>
          )}
          <Form.Item>
            <Input placeholder="手机号" type="tel" clearable style={s.input} />
          </Form.Item>
          <Form.Item>
            <Input placeholder="验证码" clearable style={s.input} />
            <Button size="small" fill="none" style={s.codeBtn}>获取验证码</Button>
          </Form.Item>
          {!isLogin && (
            <Form.Item>
              <Input placeholder="邀请码（选填）" clearable style={s.input} />
            </Form.Item>
          )}
        </Form>

        {!isLogin && (
          <div style={s.agree}>
            <Checkbox checked={agreed} onChange={setAgreed} style={{ '--icon-size':'16px', fontSize:12 } as any}>
              同意 <span style={{color:'#D44A65'}}>《用户协议》</span>和<span style={{color:'#D44A65'}}>《隐私政策》</span>
            </Checkbox>
          </div>
        )}

        <Button block color="primary" size="large" onClick={handleSubmit} style={s.btn}>
          {isLogin ? '登录' : '注册'}
        </Button>

        <p style={s.switch}>
          {isLogin ? '还没有账号？' : '已有账号？'}
          <span style={s.switchLink} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? '立即注册' : '去登录'}
          </span>
        </p>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#fff' },
  nav: { '--border-bottom': 'none' } as any,
  body: { padding: '24px 28px' },
  header: { marginBottom: 32, marginTop: 16 },
  title: { fontSize: 28, fontWeight: 500, color: '#E3617B', marginBottom: 6, letterSpacing: 1 },
  sub: { fontSize: 14, color: '#6a6a6a', fontWeight: 300 },
  form: { '--border-inner': 'none', '--border-top': 'none', '--border-bottom': '1px solid #ddd' } as any,
  input: {
    '--font-size': '15px',
    '--placeholder-color': '#C0BBB6',
    padding: '14px 0',
  } as any,
  codeBtn: { color: '#E3617B', fontSize: 13, fontWeight: 500 },
  agree: { marginTop: 16, marginBottom: 20 },
  btn: {
    '--color': '#E3617B',
    borderRadius: 28,
    height: 50,
    fontSize: 16,
    fontWeight: 500,
    boxShadow: '0 6px 24px rgba(227,97,123,0.35)',
    border: 'none',
    marginTop: 12,
  } as any,
  switch: { textAlign: 'center', marginTop: 28, fontSize: 14, color: '#6a6a6a', fontWeight: 300 },
  switchLink: { color: '#D44A65', fontWeight: 500, cursor: 'pointer', marginLeft: 4 },
}
