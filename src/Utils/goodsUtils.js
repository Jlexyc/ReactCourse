import { v4 as uuidv4 } from 'uuid';

export const newItemFromData = (data) => {
  return {
    id: uuidv4(),
    ...data,
  }
}

export const addNewItem = (data, goods) => {
  return [...goods, newItemFromData(data)]
}

export const removeElementById = (id, goods) => {
  return goods.filter((e) => e.id !== id)
}

export const removeSelectedItems = (goods) => {
  return goods.filter((item) => item.selected === false)
}

export const getTotal = (goods) => {
  return goods.reduce((acc, item) => {
    return acc + parseFloat(item.weight || 0);
  }, 0)
}

export const changeItem = (goods, changedElement, id) => {
  return goods.map((item) => {
    if (id === item.id) {
      return {
        ...item,
        title: changedElement.title,
        weight: changedElement.weight || 0,
        description: changedElement.description,
        categoryName: changedElement.categoryName
      }
    }
    return item
  })
}

export const changeGoodsSelected = (goods, id) => {
  return goods.map((item) => {
    if (id === item.id) {
      return {
        ...item,
        selected: !item.selected
      }
    }
    return item
  })
}

export const selectedItems = (changeGoodsSelected) => {
  return changeGoodsSelected.filter(item => item.selected)
}

export const checkSelected = (goods) => {
  let checked = true
  goods.forEach((item) => {
    if (item.selected) checked = false
  })
  return checked
}