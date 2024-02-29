import { useState } from 'react'

import { FilteredPanel } from '@/components/filtered-panel'
import { ItemList } from '@/components/item-list'
import { Pagination } from '@/components/ui/pagination'
import {
  defaultLimit,
  defaultPage,
  defaultValueParams,
  magicNumber,
} from '@/pages/dashboard/constants.dashboard'
import { FilterParams, ResponseData, StateType } from '@/pages/dashboard/types.dashboard'
import { requestMethod, requestValue, useAxiosQuery, valueUrlParams } from '@/services'

const { filtered, getId } = requestValue
const { post } = requestMethod

const initialState: StateType = {
  action: getId,
  limit: defaultLimit,
  page: defaultPage,
  params: defaultValueParams,
}

export const Dashboard = () => {
  const [state, setState] = useState<StateType>(initialState)

  const { action, limit, page, params } = state

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
    setState({
      ...state,
      action: getId,
      page: newPage,
      params: { limit, offset: (newPage - 1) * limit },
    })
  }

  const handlerFiltered = (params: FilterParams) => {
    setState({ ...state, action: filtered, params })
  }

  const handlerReset = () => {
    setState({ ...initialState })
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
