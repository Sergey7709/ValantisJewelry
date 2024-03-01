import { ItemListTableData } from '@/components/item-list/item-list-table/item-list-table-data'
import { Item } from '@/components/item-list/types.ItemList'
import { Table } from '@/components/ui/table'

import s from './item-list-table.module.scss'
export type Column = {
  key: string
  sortable?: boolean
  title: string
}
export const columnsDecks: Column[] = [
  {
    key: 'ID',
    sortable: false,
    title: 'ID',
  },
  {
    key: 'Product',
    sortable: true,
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

type ItemListTableProps = {
  uniqueItems: Item[]
}
export const ItemListTable = ({ uniqueItems }: ItemListTableProps) => {
  return (
    <div className={s.tableWrapper}>
      <Table.Root>
        <Table.Header columns={columnsDecks} onSort={() => {}} sort={null}>
          <Table.Head>
            <Table.Row className={s.deckHeaderRow}>
              <Table.HeadCellList
                className={s.deckHeaderCell}
                columns={columnsDecks}
                onSort={() => {}}
                sort={null}
              />
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
