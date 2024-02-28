import { ItemListProps, Items, ItemsResponse } from '@/components/item-list/types.ItemList'
import { requestMethod, requestValue, useAxiosQuery, valueUrlParams } from '@/services'

const { getItem } = requestValue
const { post } = requestMethod

export const ItemList = ({ dataIDs }: ItemListProps) => {
  const axiosParams = {
    data: {
      action: getItem,
      params: { ids: [...new Set(dataIDs.result)] },
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

  if (loadingItems) {
    return <div>LOADING</div>
  }

  return (
    <div>
      {errorItems && <div style={{ color: 'red' }}>{errorItems}</div>}
      <ul>
        {dataItems?.result?.map((el: Items, index) => (
          <li key={index}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <div>{el.id}</div>
              <div> {el.brand}</div>
              <div>{el.product}</div>
              <div> {el.price}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
