import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'

// Apply stored theme before first render
const storedTheme = localStorage.getItem('fitflow_theme')
const storedDark = localStorage.getItem('fitflow_dark')
let themeAttr = ''
if (storedTheme === 'male') themeAttr = 'male'
if (storedDark === '1') themeAttr = themeAttr ? 'dark male' : 'dark'
if (themeAttr) document.documentElement.setAttribute('data-theme', themeAttr)

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
