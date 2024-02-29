import { Select } from '@/components/ui/select'
import { TextField } from '@/components/ui/text-field'
import { FilterParams } from '@/pages/dashboard/types.dashboard'

import s from './filtered-panel.module.scss'

type FilteredPanelProps = {
  onHandleSubmitForm: (form: FilterParams) => void
}

const optionsSelect = ['brand', 'price', 'product']

export const FilteredPanel = ({ onHandleSubmitForm }: FilteredPanelProps) => {
  return (
    <div>
      <form>
        <div className={s.filterTextField}>
          <Select
            label={'Filter'}
            onValueChange={() => {}}
            options={optionsSelect}
            placeholder={'Select the filter type'}
            variant={'common'}
          />
          <TextField label={'Enter a value for filtering'} type={'search'} />
        </div>
      </form>
    </div>
  )
}
