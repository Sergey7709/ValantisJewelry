import { ItemListTableData } from '@/components/item-list/item-list-table/item-list-table-data'
import { Item } from '@/components/item-list/types.ItemList'
import { Column, Table } from '@/components/ui/table'

import s from './item-list-table.module.scss'

type ItemListTableProps = {
  uniqueItems: Item[]
}
const columnsDecks: Column[] = [
  {
    key: 'ID',
    sortable: false,
    title: 'ID',
  },
  {
    key: 'Product',
    sortable: false,
    title: 'Product',
  },
  {
    key: 'Brand',
    sortable: false,
    title: 'Brand',
  },
  {
    key: 'Price',
    sortable: false,
    title: 'Price',
  },
]

export const ItemListTable = ({ uniqueItems }: ItemListTableProps) => {
  return (
    <div className={s.tableWrapper}>
      <Table.Root>
        <Table.Header columns={columnsDecks}>
          <Table.Head>
            <Table.Row className={s.tableHeaderRow}>
              <Table.HeadCellList className={s.tableHeaderCell} columns={columnsDecks} />
            </Table.Row>
          </Table.Head>
        </Table.Header>
        <Table.Body>
          {uniqueItems.length ? <ItemListTableData uniqueItems={uniqueItems} /> : <Table.Empty />}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
