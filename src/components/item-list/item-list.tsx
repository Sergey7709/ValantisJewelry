import { useAxiosQuery } from '@/services'

type ItemListProps = {
  dataIDs: { result: string[] }
}

type Items = {
  brand: string
  id: string
  price: number
  product: string
}

type ItemsResponse = {
  result: Array<Items>
}
export const ItemList = ({ dataIDs }: ItemListProps) => {
  const {
    data: dataItems,
    error: errorItems,
    loading: loadingItems,
  } = useAxiosQuery<ItemsResponse>({
    params: {
      data: {
        action: 'get_items',
        params: { ids: [...new Set(dataIDs.result)] },
      },
      method: 'post',
      url: '',
    },
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
