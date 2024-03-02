import { useState } from 'react'

import { Select } from '@/components/ui/select'
import { Typography } from '@/components/ui/typography'
import { defaultLimit } from '@/pages/dashboard/constants.dashboard'

import s from './item-list-limit-page.module.scss'

const optionsForDeckItemsPerPage = ['5', '10', '20', '30', '50']

type ItemListLimitPageProps = {
  handlerSetLimitPage: (newLimit: number) => void
}
export const ItemListLimitPage = ({ handlerSetLimitPage }: ItemListLimitPageProps) => {
  const [value, setValue] = useState<string>(String(defaultLimit))
  const handlerSelectPagination = (items: string) => {
    setValue(items)
    handlerSetLimitPage(Number(items))
  }

  return (
    <div className={s.selectWrapper}>
      <Typography className={s.itemTypography}>Show</Typography>
      <Select
        className={s.select}
        onValueChange={handlerSelectPagination}
        options={optionsForDeckItemsPerPage}
        value={value}
        variant={'pagination'}
      />
      <Typography className={s.itemTypography}>on page</Typography>
    </div>
  )
}
