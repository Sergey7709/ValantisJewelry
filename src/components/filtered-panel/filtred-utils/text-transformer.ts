import { FilterParams } from '@/pages/dashboard/types.dashboard'

type TextTransformer = {
  searchValueSelect: string
  searchValueTextField: string
}
export const textTransformer = ({ searchValueSelect, searchValueTextField }: TextTransformer) => {
  const formatValueForBrand = () =>
    searchValueTextField
      .split(' ')
      .map(text => text.replace(text[0], text[0].toUpperCase()))
      .join(' ')

  const formattedValue =
    searchValueSelect === 'brand' ? formatValueForBrand() : searchValueTextField

  return {
    [searchValueSelect]: searchValueSelect === 'price' ? Number(formattedValue) : formattedValue,
  } as FilterParams
}
