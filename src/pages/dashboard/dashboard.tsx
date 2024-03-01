import { useCallback, useEffect, useState } from 'react'

import { FilteredPanel } from '@/components/filtered-panel'
import { ItemList } from '@/components/item-list'
import { LoaderSquare } from '@/components/ui/loader-square'
import { Pagination } from '@/components/ui/pagination'
import {
  defaultLimit,
  defaultPage,
  defaultValueParams,
  magicNumber,
} from '@/pages/dashboard/constants.dashboard'
import { FilterParams, ResponseData, StateType } from '@/pages/dashboard/types.dashboard'
import { requestMethod, requestValue, useAxiosQuery, valueUrlParams } from '@/services'
import { useIsFirstRender } from '@/shared/hooks'

import s from './dashboard.module.scss'

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

  const isFirstRender = useIsFirstRender()

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
    getData,
    loading: loadingIds,
  } = useAxiosQuery<ResponseData>({
    params: axiosParams,
  })

  useEffect(() => {
    !isFirstRender && getData()
  }, [state])
  const handlerPagination = (newPage: number) => {
    setState(prevState => ({
      ...prevState,
      action: getId,
      page: newPage,
      params: { limit, offset: (newPage - 1) * limit },
    }))
  }

  const handlerFiltered = useCallback((params: FilterParams) => {
    setState({ ...state, action: filtered, params })
  }, [])

  const handlerReset = () => {
    setState({ ...initialState })
  }

  return (
    <div>
      {loadingIds && <LoaderSquare />}
      {/*{errorIds && <div style={{ color: 'red' }}>{errorIds}</div>}*/}
      {/*<ol>{dataIDs?.result?.map((el: string, index) => <li key={index}>{el}</li>)}</ol>*/}
      <div className={s.wrapper_panel}>
        <FilteredPanel onHandleSubmitParams={handlerFiltered} />
        <button className={s.button} onClick={handlerReset}>
          Reset
        </button>
      </div>
      {dataIDs && !loadingIds && (
        <>
          <ItemList dataIDs={dataIDs} />
          {state.action !== 'filter' && (
            <Pagination
              currentPage={page}
              onPageChange={page => handlerPagination(page)}
              pageSize={limit}
              totalCount={magicNumber}
            />
          )}
        </>
      )}
    </div>
  )
}
