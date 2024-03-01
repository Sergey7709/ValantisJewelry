import { ItemListTable } from '@/components/item-list/item-list-table'
import { ItemListProps, ItemsResponse } from '@/components/item-list/types.ItemList'
import { removeDuplicates } from '@/components/item-list/utils'
import { LoaderSquare } from '@/components/ui/loader-square'
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

  const { data: dataItems, loading: loadingItems } = useAxiosQuery<ItemsResponse>({
    params: axiosParams,
  })

  const uniqueItems = removeDuplicates(dataItems?.result ?? [])

  return (
    <div>
      {loadingItems && <LoaderSquare />}
      {/*{errorItems && <div style={{ color: 'red' }}>{errorItems}</div>}*/}
      {dataItems && <ItemListTable uniqueItems={uniqueItems} />}
    </div>
  )
}
