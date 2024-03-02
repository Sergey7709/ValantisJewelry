import { getTimestamp } from '@/shared/utility'
import axios from 'axios'
import md5 from 'md5'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Auth': md5(`${import.meta.env.VITE_AUTH_VALUE_PART}${getTimestamp()}`),
  },
})
