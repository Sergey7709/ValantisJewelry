import { useEffect } from 'react'

import { ItemListTable } from '@/components/item-list/item-list-table'
import { ItemListProps, ItemsResponse } from '@/components/item-list/types.ItemList'
import { removeDuplicates } from '@/components/item-list/utils'
import { LoaderSquare } from '@/components/ui/loader-square'
import { Pagination } from '@/components/ui/pagination'
import { magicNumber } from '@/pages/dashboard/constants.dashboard'
import { requestMethod, requestValue, useAxiosQuery, valueUrlParams } from '@/services'

const { getItem } = requestValue
const { post } = requestMethod

export const ItemList = ({
  dataIDs,
  handlerPagination,
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

  useEffect(() => {
    getData()
  }, [dataIDs])

  const uniqueItems = removeDuplicates(dataItems?.result ?? [])

  return (
    <div>
      {loadingItems && <LoaderSquare />}
      {dataItems && (
        <>
          {<ItemListTable uniqueItems={uniqueItems} />}
          {offPagination !== 'filter' && (
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
