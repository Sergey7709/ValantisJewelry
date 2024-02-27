import { ReactNode } from 'react'

import { ThemeMode } from '@/components/ui/theme-mode'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <ThemeMode />
      <div>{children}</div>
    </div>
  )
}
