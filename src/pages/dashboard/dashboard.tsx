import { useState } from 'react'

import { FilteredPanel } from '@/components/filtered-panel'
import { ItemList } from '@/components/item-list'
import { Pagination } from '@/components/ui/pagination'
import { TextField } from '@/components/ui/text-field'
import { AxiosParams, FilterParams, ResponseData } from '@/pages/dashboard/types.dashboard'
import { useAxiosQuery } from '@/services'

export const Dashboard = () => {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(5)
  const [action, setAction] = useState<string>('get_ids')
  const [params, setParams] = useState<AxiosParams>({ limit, offset: (page - 1) * limit })

  const axiosParams = {
    data: {
      action,
      params,
    },
    method: 'post',
    url: '',
  }

  const {
    data: dataIDs,
    error: errorIds,
    loading: loadingIds,
  } = useAxiosQuery<ResponseData>({
    params: axiosParams,
  })

  const handlerPagination = (newPage: number) => {
    setAction('get_ids')
    setPage(newPage)
    setParams({ limit, offset: (newPage - 1) * limit })
  }

  const handlerFiltered = (form: FilterParams) => {
    setAction('filter')
    setParams(form)
  }

  if (loadingIds) {
    return <div>LOADING</div>
  }

  return (
    <div>
      {errorIds && <div style={{ color: 'red' }}>{errorIds}</div>}
      <TextField type={'search'} />
      <ul>{dataIDs?.result?.map((el: string, index) => <li key={index}>{el}</li>)}</ul>
      <FilteredPanel />
      {dataIDs && <ItemList dataIDs={dataIDs} />}
      <Pagination
        currentPage={page}
        onPageChange={page => handlerPagination(page)}
        pageSize={limit}
        totalCount={200}
      />
    </div>
  )
}
