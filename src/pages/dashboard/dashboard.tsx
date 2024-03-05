import { useEffect, useState } from 'react'

import { FilteredPanel } from '@/components/filtered-panel'
import { ItemList } from '@/components/item-list'
import { LoaderSquare } from '@/components/ui/loader-square'
import { ScrollToTopButton } from '@/components/ui/scroll-to-top-button/scroll-to-top-button'
import {
  defaultLimit,
  defaultPage,
  defaultValueParams,
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

  const handlerSetLimitPage = (newLimit: number) => {
    setState(prevState => ({
      ...prevState,
      action: getId,
      limit: newLimit,
      params: { limit: newLimit, offset: (prevState.page - 1) * newLimit },
    }))
  }

  const handlerFiltered = (params: FilterParams) => {
    setState(prevState => ({ ...prevState, action: filtered, params }))
  }

  const handlerReset = () => {
    setState({ ...initialState })
  }

  return (
    <div>
      {loadingIds && <LoaderSquare />}
      <div className={s.wrapper_panel}>
        <FilteredPanel handlerReset={handlerReset} onHandleSubmitParams={handlerFiltered} />
      </div>
      {dataIDs && (
        <>
          <ItemList
            dataIDs={dataIDs}
            handlerPagination={handlerPagination}
            handlerSetLimitPage={handlerSetLimitPage}
            limit={limit}
            offPagination={state.action}
            page={page}
          />
        </>
      )}
      <ScrollToTopButton />
    </div>
  )
}
