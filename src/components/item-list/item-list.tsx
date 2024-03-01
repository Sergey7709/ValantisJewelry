import { ItemListTable } from '@/components/item-list/item-list-table'
import { ItemListProps, ItemsResponse } from '@/components/item-list/types.ItemList'
import { removeDuplicates } from '@/components/item-list/utils'
import { requestMethod, requestValue, useAxiosQuery, valueUrlParams } from '@/services'

const { getItem } = requestValue
const { post } = requestMethod

export const ItemList = ({ dataIDs }: ItemListProps) => {
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
    error: errorItems,
    loading: loadingItems,
  } = useAxiosQuery<ItemsResponse>({
    params: axiosParams,
  })

  const uniqueItems = removeDuplicates(dataItems?.result ?? [])

  return (
    <div>
      {loadingItems && <div style={{ color: 'red' }}>LOADING</div>}
      {errorItems && <div style={{ color: 'red' }}>{errorItems}</div>}
      {dataItems && <ItemListTable uniqueItems={uniqueItems} />}
    </div>
  )
}
