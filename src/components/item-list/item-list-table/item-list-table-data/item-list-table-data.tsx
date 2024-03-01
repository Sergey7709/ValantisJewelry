import { ItemListTableDataRow } from '@/components/item-list/item-list-table/item-list-table-data/item-list-table-data-row'
import { Item } from '@/components/item-list/types.ItemList'

type ItemListTableDataProps = {
  uniqueItems: Item[]
}
export const ItemListTableData = ({ uniqueItems }: ItemListTableDataProps) => {
  return uniqueItems.map(item => <ItemListTableDataRow key={item.id} {...item} />)
}
