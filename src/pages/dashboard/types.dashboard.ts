export type PaginationParams = {
  limit: number
  offset: number
}

export type FilterParams = { brand: string } | { price: number } | { product: string }

type AllKeys<T> = T extends any ? keyof T : never
export type KeysFilterParams = AllKeys<FilterParams>

export type AxiosParams = FilterParams | PaginationParams

export type ResponseData = { result: string[] }

export type StateType = {
  action: string
  limit: number
  page: number
  params: AxiosParams
}
