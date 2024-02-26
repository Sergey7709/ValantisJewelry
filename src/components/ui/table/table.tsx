import { ComponentProps, FC, ReactNode } from 'react'

import { ChevronUp } from '@/assets/icons/chevronUp'
import { Typography } from '@/components/ui/typography'
import clsx from 'clsx'

import s from './table.module.scss'

export const Root: FC<ComponentProps<'table'>> = ({ className, ...rest }) => {
  const classNames = {
    table: clsx(className, s.table),
  }

  return <table className={classNames.table} {...rest} />
}

export type HeadProps = ComponentProps<'thead'>

export const Head: FC<HeadProps> = props => {
  return <thead {...props} />
}

export type Column = {
  key: string
  sortable?: boolean
  title: string
}

export const HeadCellList: FC<
  ComponentProps<'th'> & {
    columns: Column[]
    onSort: (sort: Sort) => void
    sort: Sort
  }
> = ({ className, columns, onSort, sort, ...restProps }) => {
  const classNames = {
    chevron: sort?.direction === 'asc' ? '' : s.chevron,
  }
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) {
      return
    }

    if (sort?.key !== key) {
      return onSort({ direction: 'asc', key })
    }

    if (sort.direction === 'desc') {
      return onSort(null)
    }

    onSort({
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      key,
    })
  }

  return columns.map(({ key, sortable, title }) => {
    return (
      <HeadCell
        className={className}
        key={key}
        onClick={handleSort(key, sortable)}
        sortable={sortable}
        {...restProps}
      >
        {title}
        {sort?.key === key && <ChevronUp className={classNames.chevron} key={sort.key} />}
      </HeadCell>
    )
  })
}

export const Header: FC<
  Omit<HeadProps, 'children'> & {
    children?: ReactNode
    columns: Column[]
    onSort: (sort: Sort) => void
    sort: Sort
  }
> = ({ children, columns, onSort, sort, ...restProps }) => {
  return (
    children || (
      <Head {...restProps}>
        <Row>
          <HeadCellList columns={columns} onSort={onSort} sort={sort} />
        </Row>
      </Head>
    )
  )
}
export const Body: FC<ComponentProps<'tbody'>> = props => {
  return <tbody {...props} />
}

export const Row: FC<ComponentProps<'tr'>> = props => {
  return <tr {...props} className={clsx(s.trStyle, props.className)} />
}

export const HeadCell: FC<
  ComponentProps<'th'> & {
    sortable?: boolean
  }
> = ({ children, className, sortable, ...rest }) => {
  const classNames = {
    headCell: clsx(className, s.headCell, sortable && s.sortable),
  }

  return (
    <th className={classNames.headCell} {...rest}>
      <span>{children}</span>
    </th>
  )
}

export const Cell: FC<ComponentProps<'td'>> = ({ className, ...rest }) => {
  const classNames = {
    cell: clsx(s.tableCell, className),
  }

  return <td className={classNames.cell} {...rest} />
}

export const Empty: FC<ComponentProps<'div'> & { mb?: string; mt?: string }> = ({ className }) => {
  const classNames = {
    empty: clsx(className, s.empty),
  }

  return (
    <Typography className={classNames.empty} variant={'h3'}>
      No data yet!
    </Typography>
  )
}

export const Table = {
  Body,
  Cell,
  Empty,
  Head,
  HeadCell,
  HeadCellList,
  Header,
  Root,
  Row,
}

export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null
