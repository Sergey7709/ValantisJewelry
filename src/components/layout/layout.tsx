import { ReactNode } from 'react'

import { ThemeMode } from '@/components/ui/theme-mode'
import { Typography } from '@/components/ui/typography'

import s from './layout.module.scss'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={s.layout_container}>
      <header className={s.header}>
        <Typography className={s.title}>Valantis Jewelry</Typography>
        <ThemeMode />
      </header>

      <div>{children}</div>
    </div>
  )
}
