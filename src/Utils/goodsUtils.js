import { v4 as uuidv4 } from "uuid";

const getIndexFind = (id, goods) => {
  return goods.findIndex((good) => good.id === id);
};
const getFilter = (elem, goods)=>{
  return goods.filter((e) => e.selected === elem);
}
export const newItemFromData = (data) => {
  return {
    id: uuidv4(),
    ...data,
  };
};

export const addNewItem = (data, goods) => {
  return [...goods, newItemFromData(data)];
};

export const removeElementById = (id, goods) => {
  return goods.filter((e) => e.id !== id);
};

export const getTotal = (goods) => {
  return goods.reduce((acc, item) => {
    return acc + parseFloat(item.weight);
  }, 0);
};

export const getTotalSelected = (goods) => {
  const newGoodsSelected = getFilter(true,goods)//goods.filter((e) => e.selected === true);
  return getTotal(newGoodsSelected);
};

export const onSelect = (id, goods) => {
  const idx = getIndexFind(id, goods);
  const copyGoods = [...goods];
  copyGoods[idx] = { ...goods[idx], ...{ selected: !goods[idx].selected } };
  return copyGoods;
};

export const editHandler = (id, goods) => {
  const editGoods = goods.filter((good) => good.id === id);
  return { ...editGoods[0], ...{ edit: true } };
};

export const editableElement = (element, goods) => {
  const idx = getIndexFind(element.id, goods);
  const copyGoods = [...goods];
  copyGoods[idx] = { ...element, ...{ edit: false } };
  return copyGoods;
};
export const deleteSelected = (goods) =>{
return getFilter(false,goods)
}
