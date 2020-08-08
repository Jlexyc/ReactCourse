import { category } from "../Mocks/CategoryMock"

export const getCategory = (value) => {
  let selecedCategory = category.find((item) => item.categoryName === value)
  return selecedCategory ? selecedCategory.categoryName : "not chosen"
}