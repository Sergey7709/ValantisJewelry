import { useEffect, useState } from 'react'

import ArrowUpCircle from '@/assets/icons/arrow-up-circle'

import s from './scroll-to-top-button.module.scss'

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleButtonClick = () => {
    window.scrollTo({
      behavior: 'smooth',
      top: 0,
    })
  }

  return (
    <>
      {isVisible && (
        <div className={s.scroll_to_top}>
          <ArrowUpCircle className={s.arrowUpCircle} onClick={handleButtonClick} />
        </div>
      )}
    </>
  )
}
