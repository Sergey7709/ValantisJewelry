import { instance } from '@/services/api.config'
import { AxiosResponse } from 'axios'

type IdsProps = {
  limit: number
  offset: number
}

type ResponseData = {
  result: string[]
}
export const getIds = async ({ limit, offset }: IdsProps) => {
  const response: AxiosResponse = await instance
    .post('', {
      action: 'get_ids',
      params: { limit, offset },
    })
    .then(resp => {
      return resp
    })

  const responseData: ResponseData = response.data

  return responseData.result
}
