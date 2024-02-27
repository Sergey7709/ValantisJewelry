import { useMemo, useState } from 'react'

import { ItemList } from '@/components/item-list'
import { Pagination } from '@/components/ui/pagination'
import { TextField } from '@/components/ui/text-field'
import { useAxiosQuery } from '@/services'

export const Dashboard = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)

  const axiosParams = useMemo(
    () => ({
      data: {
        action: 'get_ids',
        params: { limit, offset: (page - 1) * limit },
      },
      method: 'post',
      url: '',
    }),
    [page, limit]
  )

  const {
    data: dataIDs,
    error: errorIds,
    loading: loadingIds,
  } = useAxiosQuery<{ result: string[] }>({
    params: axiosParams,
  })

  const handlerPagination = (newPage: number) => {
    setPage(newPage)
  }

  if (loadingIds) {
    return <div>LOADING</div>
  }
  console.log(dataIDs)

  return (
    <div>
      {errorIds && <div style={{ color: 'red' }}>{errorIds}</div>}
      <TextField type={'search'} />
      <ul>{dataIDs?.result?.map((el: string, index) => <li key={index}>{el}</li>)}</ul>
      {dataIDs && <ItemList dataIDs={dataIDs} />}
      <Pagination
        currentPage={page}
        onPageChange={page => handlerPagination(page)}
        pageSize={limit}
        totalCount={200}
      />
    </div>
  )
}
