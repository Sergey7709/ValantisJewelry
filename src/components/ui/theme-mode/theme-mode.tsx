import { ChangeEventHandler } from 'react'

import s from './theme-mode.module.scss'

const setDark = () => {
  localStorage.setItem('theme', 'dark')
  document.documentElement.setAttribute('data-theme', 'dark')
}

const setLight = () => {
  localStorage.setItem('theme', 'light')
  document.documentElement.setAttribute('data-theme', 'light')
}

const storedTheme = localStorage.getItem('theme')

const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

const defaultDark = storedTheme === 'dark' || (storedTheme === null && prefersDark)

if (defaultDark) {
  setDark()
}

const toggleTheme: ChangeEventHandler<HTMLInputElement> = e => {
  if (e.target.checked) {
    setDark()
  } else {
    setLight()
  }
}

export const ThemeMode = () => {
  return (
    <div style={{ marginLeft: '100px', marginTop: '50px' }}>
      <input
        className={s.check}
        defaultChecked={defaultDark}
        id={'checkbox_toggle'}
        onChange={toggleTheme}
        type={'checkbox'}
      />
      <div className={s.checkbox}>
        <label className={s.slide} htmlFor={'checkbox_toggle'}>
          <span className={s.toggle}></span>
          <span className={s.text}>Light</span>
          <span className={s.text}>Dark</span>
        </label>
      </div>
    </div>
  )
}
