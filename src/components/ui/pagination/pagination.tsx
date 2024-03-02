import { KeyboardEvent } from 'react'

import { ArrowLeft, ArrowRight } from '@/assets/icons'
import clsx from 'clsx'

import s from './pagination.module.scss'

import { DOTS, usePagination } from './usePagination'

type Props = {
  className?: string
  currentPage: number
  onPageChange: (page: number) => void
  pageSize: number
  siblingCount?: number
  totalCount: number
}

export const Pagination = (props: Props) => {
  const { className, currentPage, onPageChange, pageSize, siblingCount = 1, totalCount } = props

  const paginationRange =
    usePagination({
      currentPage,
      pageSize,
      siblingCount,
      totalCount,
    }) || []

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  const onKeySubmit = (e: KeyboardEvent<HTMLLIElement>, cb: () => void) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      cb()
    }
  }

  return (
    <ul className={clsx(s.container, className)}>
      <li
        className={clsx(s.item, currentPage === 1 ? s.disabled : '')}
        onClick={onPrevious}
        onKeyDown={e => onKeySubmit(e, onPrevious)}
        tabIndex={currentPage !== 1 ? 0 : undefined}
      >
        <ArrowLeft className={s.left} />
      </li>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li className={clsx(s.item, s.dots)} key={index}>
              ...
            </li>
          )
        }

        return (
          <li
            className={clsx(s.item, pageNumber === currentPage && s.selected)}
            key={index}
            onClick={() => onPageChange?.(Number(pageNumber))}
            onKeyDown={e => onKeySubmit(e, () => onPageChange(Number(pageNumber)))}
            tabIndex={pageNumber !== currentPage ? 0 : undefined}
          >
            {pageNumber}
          </li>
        )
      })}
      <li
        className={clsx(s.item, currentPage === lastPage ? s.disabled : '')}
        onClick={onNext}
        onKeyDown={e => onKeySubmit(e, onNext)}
        tabIndex={currentPage !== lastPage ? 0 : undefined}
      >
        <ArrowRight className={s.right} />
      </li>
    </ul>
  )
}
