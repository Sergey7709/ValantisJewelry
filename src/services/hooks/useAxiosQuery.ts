import { useEffect, useState } from 'react'

import { instance } from '@/services/api.config'
import { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios'

type AxiosQuery = {
  params?: AxiosRequestConfig
}
type AxiosErrorType = { message: string }
export const useAxiosQuery = <T>({ params }: AxiosQuery) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true)
        const response: AxiosResponse<T> = await instance('', { ...params })

        setData(response.data)
        setLoading(false)
      } catch (error) {
        if (isAxiosError(error)) {
          const Error: AxiosErrorType = {
            message: error.message,
          }

          console.error(Error.message)
          setError(`Error getting the data: ${Error.message}`)
          setLoading(false)
        } else {
          console.error(`Unknown error occurred:${error}`)
          setError(`Unknown error occurred:${error}`)
          setLoading(false)
        }
      }
    }

    getData()
  }, [params?.data.params.offset, params?.data.action])

  return { data, error, loading }
}
