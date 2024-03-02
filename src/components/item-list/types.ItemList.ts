export type ItemListProps = {
  dataIDs: { result: string[] }
  handlerPagination: (newPage: number) => void
  limit: number
  offPagination: string
  page: number
}

export type Items = {
  brand: null | string
  id: string
  price: number
  product: string
}

export type ItemsResponse = {
  result: Array<Items>
}

export type Item = {
  brand: null | string
  id: string
  price: number
  product: string
}
