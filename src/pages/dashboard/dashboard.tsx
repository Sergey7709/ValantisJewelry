import { useState } from 'react'

import { FilteredPanel } from '@/components/filtered-panel'
import { ItemList } from '@/components/item-list'
import { Pagination } from '@/components/ui/pagination'
import { AxiosParams, FilterParams, ResponseData } from '@/pages/dashboard/types.dashboard'
import { requestMethod, requestValue, useAxiosQuery, valueUrlParams } from '@/services'

const { filtered, getId } = requestValue
const { post } = requestMethod
const magicNumber = 8005
const defaultValue = { limit: 5, offset: 0 }

export const Dashboard = () => {
  const [page, setPage] = useState<number>(1)
  const [limit, setLimit] = useState<number>(5)
  const [action, setAction] = useState<string>(requestValue.getId)
  const [params, setParams] = useState<AxiosParams>(defaultValue)

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

  const handlerFiltered = (params: FilterParams) => {
    setAction(filtered)
    setParams(params)
  }

  const handlerReset = () => {
    setAction(requestValue.getId)
    setParams(defaultValue)
  }

  if (loadingIds) {
    return <div>LOADING</div>
  }

  return (
    <div>
      {errorIds && <div style={{ color: 'red' }}>{errorIds}</div>}
      <ol>{dataIDs?.result?.map((el: string, index) => <li key={index}>{el}</li>)}</ol>
      <button onClick={handlerReset}>Reset</button>
      <FilteredPanel onHandleSubmitParams={handlerFiltered} />
      {dataIDs && <ItemList dataIDs={dataIDs} />}
      <Pagination
        currentPage={page}
        onPageChange={page => handlerPagination(page)}
        pageSize={limit}
        totalCount={magicNumber}
      />
    </div>
  )
}
