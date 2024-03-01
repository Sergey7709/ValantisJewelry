import { memo, useEffect, useState } from 'react'

import { Select } from '@/components/ui/select'
import { TextField } from '@/components/ui/text-field'
import { FilterParams, KeysFilterParams } from '@/pages/dashboard/types.dashboard'
import { useDebounce } from '@/shared/hooks'

import s from './filtered-panel.module.scss'

type FilteredPanelProps = {
  onHandleSubmitParams: (form: FilterParams) => void
}

type SearchValue = string

const optionsSelect = ['brand', 'price', 'product']

const milliSecondsValue = 1500

export const FilteredPanel = memo(({ onHandleSubmitParams }: FilteredPanelProps) => {
  const [searchValueTextField, setSearchValueTextField] = useState<SearchValue>('')
  const [searchValueSelect, setSearchValueSelect] = useState<KeysFilterParams>('product')

  const debounce = useDebounce({ milliSeconds: milliSecondsValue, value: searchValueTextField })

  useEffect(() => {
    if (debounce.length >= 1) {
      const formatValueForBrand = (value: string) =>
        value
          .split(' ')
          .map(text => text.replace(text[0], text[0].toUpperCase()))
          .join(' ')

      const formattedValue =
        searchValueSelect === 'brand'
          ? formatValueForBrand(searchValueTextField)
          : searchValueTextField

      const submitValueSelect = {
        [searchValueSelect]: searchValueSelect === 'price' ? +formattedValue : formattedValue,
      } as FilterParams

      onHandleSubmitParams(submitValueSelect)
    }
  }, [debounce])

  const handlerChangeValueTextField = (value: SearchValue) => {
    setSearchValueTextField(value)
  }
  const handlerSelect = (newValue: KeysFilterParams) => {
    setSearchValueSelect(newValue)
  }

  return (
    <div>
      <div className={s.filterTextField}>
        <Select
          label={'Filter'}
          onValueChange={handlerSelect}
          options={optionsSelect}
          placeholder={'Select the filter type'}
          value={searchValueSelect}
          variant={'common'}
        />
        <TextField label={'Search'} onValueChange={handlerChangeValueTextField} type={'search'} />
      </div>
    </div>
  )
})
