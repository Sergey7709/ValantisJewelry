export type PaginationParams = {
  limit: number
  offset: number
}

export type FilterParams = { brand: string } | { price: number } | { product: string }

export type AxiosParams = FilterParams | PaginationParams

export type ResponseData = { result: string[] }
