import { useEffect } from 'react'

import { ItemListTable } from '@/components/item-list/item-list-table'
import { ItemListLimitPage } from '@/components/item-list/item-list-table/item-list-limit-page/item-list-limit-page'
import { ItemListProps, ItemsResponse } from '@/components/item-list/types.ItemList'
import { removeDuplicates } from '@/components/item-list/utils'
import { LoaderSquare } from '@/components/ui/loader-square'
import { Pagination } from '@/components/ui/pagination'
import { magicNumber } from '@/pages/dashboard/constants.dashboard'
import { requestMethod, requestValue, useAxiosQuery, valueUrlParams } from '@/services'

import s from './item-list.module.scss'

const { getItem } = requestValue
const { post } = requestMethod

export const ItemList = ({
  dataIDs,
  handlerPagination,
  handlerSetLimitPage,
  limit,
  offPagination,
  page,
}: ItemListProps) => {
  const axiosParams = {
    data: {
      action: getItem,
      params: { ids: dataIDs.result },
    },
    method: post,
    url: valueUrlParams,
  }

  const {
    data: dataItems,
    getData,
    loading: loadingItems,
  } = useAxiosQuery<ItemsResponse>({
    params: axiosParams,
  })
  const uniqueItems = removeDuplicates(dataItems?.result ?? [])

  useEffect(() => {
    getData()
  }, [dataIDs])

  return (
    <div>
      {loadingItems && <LoaderSquare />}
      {dataItems && (
        <>
          {<ItemListTable uniqueItems={uniqueItems} />}
          {offPagination !== 'filter' && (
            <div className={s.pagination_wrapper}>
              <Pagination
                currentPage={page}
                onPageChange={page => handlerPagination(page)}
                pageSize={limit}
                totalCount={magicNumber}
              />
              <ItemListLimitPage handlerSetLimitPage={handlerSetLimitPage} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
