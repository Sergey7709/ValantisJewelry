import { TextField } from '@/components/ui/text-field'
import { FilterParams } from '@/pages/dashboard/types.dashboard'

import s from './filtered-panel.module.scss'

type FilteredPanelProps = {
  onHandleSubmitForm: (form: FilterParams) => void
}
export const FilteredPanel = ({ onHandleSubmitForm }: FilteredPanelProps) => {
  return (
    <div>
      <form>
        <div className={s.filterTextField}>
          <TextField label={'search'} type={'search'} />
        </div>
      </form>
    </div>
  )
}
