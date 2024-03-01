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

  const getData = async (retryCount = 0) => {
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

        if (retryCount < 2) {
          console.log('retry')
          getData(retryCount + 1)
        }
      } else {
        console.error(`Unknown error occurred:${error}`)
        setError(`Unknown error occurred:${error}`)
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return { data, error, getData, loading }
}
