import { useState } from 'react'

import { FilteredPanel } from '@/components/filtered-panel'
import { ItemList } from '@/components/item-list'
import { Pagination } from '@/components/ui/pagination'
import { AxiosParams, FilterParams, ResponseData } from '@/pages/dashboard/types.dashboard'
import { requestMethod, requestValue, useAxiosQuery, valueUrlParams } from '@/services'

const { filtered, getId } = requestValue
const { post } = requestMethod

export const Dashboard = () => {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(5)
  const [action, setAction] = useState<string>(requestValue.getId)
  const [params, setParams] = useState<AxiosParams>({ limit, offset: (page - 1) * limit })

  const axiosParams = {
    data: {
      action,
      params,
    },
    method: post,
    url: valueUrlParams,
  }

  const {
    data: dataIDs,
    error: errorIds,
    loading: loadingIds,
  } = useAxiosQuery<ResponseData>({
    params: axiosParams,
  })

  const handlerPagination = (newPage: number) => {
    setAction(getId)
    setPage(newPage)
    setParams({ limit, offset: (newPage - 1) * limit })
  }

  const handlerFiltered = (form: FilterParams) => {
    setAction(filtered)
    setParams(form)
  }

  if (loadingIds) {
    return <div>LOADING</div>
  }

  return (
    <div>
      {errorIds && <div style={{ color: 'red' }}>{errorIds}</div>}
      <ul>{dataIDs?.result?.map((el: string, index) => <li key={index}>{el}</li>)}</ul>
      <FilteredPanel onHandleSubmitForm={handlerFiltered} />
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
