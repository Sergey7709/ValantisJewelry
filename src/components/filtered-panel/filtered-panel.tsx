import { memo, useEffect, useState } from 'react'

import { textTransformer } from '@/components/filtered-panel/filtred-utils/text-transformer'
import { Select } from '@/components/ui/select'
import { TextField } from '@/components/ui/text-field'
import { FilterParams, KeysFilterParams } from '@/pages/dashboard/types.dashboard'
import { useDebounce } from '@/shared/hooks'

import s from './filtered-panel.module.scss'

type FilteredPanelProps = {
  handlerReset: () => void
  onHandleSubmitParams: (form: FilterParams) => void
}

type SearchValue = string

const optionsSelect = ['brand', 'price', 'product']

const milliSecondsValue = 1500

export const FilteredPanel = memo(({ handlerReset, onHandleSubmitParams }: FilteredPanelProps) => {
  const [searchValueTextField, setSearchValueTextField] = useState<SearchValue>('')
  const [searchValueSelect, setSearchValueSelect] = useState<KeysFilterParams>('product')

  const debounce = useDebounce({ milliSeconds: milliSecondsValue, value: searchValueTextField })

  useEffect(() => {
    if (debounce.length >= 1) {
      const submitValue = textTransformer({ searchValueSelect, searchValueTextField })

      onHandleSubmitParams(submitValue)
      setSearchValueTextField('')
    }
  }, [debounce])

  const handlerChangeValueTextField = (value: SearchValue) => {
    setSearchValueTextField(value)
  }
  const handlerSelect = (newValue: KeysFilterParams) => {
    setSearchValueSelect(newValue)
  }

  const onHandlerReset = () => {
    handlerReset()
    setSearchValueTextField('')
    setSearchValueSelect('product')
  }

  return (
    <div className={s.wrapper_textField}>
      <Select
        onValueChange={handlerSelect}
        options={optionsSelect}
        placeholder={'Select the filter type'}
        value={searchValueSelect}
        variant={'common'}
      />
      <TextField
        className={s.text_field}
        label={'Select a filter type and enter a search query'}
        onValueChange={handlerChangeValueTextField}
        type={'search'}
        value={searchValueTextField}
      />
      <button className={s.button} onClick={onHandlerReset}>
        Reset
      </button>
    </div>
  )
})
