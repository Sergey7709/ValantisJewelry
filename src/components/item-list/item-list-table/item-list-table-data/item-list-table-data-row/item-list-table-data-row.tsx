import { Item } from '@/components/item-list/types.ItemList'
import { Table } from '@/components/ui/table'

import s from './item-list-table-data-row.module.scss'

export const ItemListTableDataRow = (item: Item) => {
  return (
    <Table.Row className={s.deckTableRow} key={item.id}>
      <Table.Cell className={s.deckTableCell}>
        <div>{item.id}</div>
      </Table.Cell>
      <Table.Cell className={s.deckTableCell}>
        <div>{item.product}</div>
      </Table.Cell>
      <Table.Cell className={s.deckTableCell}>
        <div>{item.brand ?? '-'}</div>
      </Table.Cell>
      <Table.Cell className={s.deckTableCell}>
        <div>{item.price}</div>
      </Table.Cell>
    </Table.Row>
  )
}
