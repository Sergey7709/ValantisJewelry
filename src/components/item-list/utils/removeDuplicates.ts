import { Item } from '../types.ItemList'

export const removeDuplicates = (items: Item[]) => {
  const uniqueItems: Item[] = []
  const collectionIDS = new Set<string>()

  items.forEach((item: Item) => {
    if (!collectionIDS.has(item.id)) {
      uniqueItems.push(item)
      collectionIDS.add(item.id)
    }
  })

  return uniqueItems
}
