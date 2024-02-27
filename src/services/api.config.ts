import { getTimestamp } from '@/utility'
import axios from 'axios'
import md5 from 'md5'

export const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Auth': md5(`${process.env.AUTH_VALUE_PART}${getTimestamp()}`),
  },
})
