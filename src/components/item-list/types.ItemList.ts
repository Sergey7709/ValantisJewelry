export type ItemListProps = {
  dataIDs: { result: string[] }
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
