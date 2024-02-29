import { useEffect, useState } from 'react'

type UseDebounceProps<T> = {
  milliSeconds: number
  value: T
}
export const useDebounce = <T>({ milliSeconds, value }: UseDebounceProps<T>): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, milliSeconds)

    return () => {
      clearTimeout(handler)
    }
  }, [value, milliSeconds])

  return debouncedValue
}
