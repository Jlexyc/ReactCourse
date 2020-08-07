import { v4 as uuidv4 } from 'uuid';

export const newItemFromData = (data) => {
    return {
        id: uuidv4(),
        ...data,
        counter: false,
    }
}

export const addNewItem = (data, goods) => {
    return [...goods, newItemFromData(data)]
}

export const removeElementById = (id, goods) => {
    return goods.filter((e) => e.id !== id)
}

export const getTotal = (goods) => {
    return goods.reduce((acc, item) => {
        return acc + parseFloat(item.weight);
    }, 0)
}

export const figureProperty = (arr, id, variable) => {
    const _id = arr.findIndex((el) => el.id === id);
    const oldItem = arr[_id];
    const newItem = { ...oldItem, [variable]: !oldItem[variable] };
    return [
        ...arr.slice(0, _id),
        newItem,
        ...arr.slice(_id + 1)
    ];
};

export const selectedResult = (items) => {
    const result = items.filter(item => item.counter)
        .reduce((start, end) => {
            return start + +end.weight
        }, 0);
    return result;
}

export const findElementById = (id, goods) => {
    return goods.find((el) => el.id === id);
}; 

export const changeElementById = (element, array, text) => {
    const idx = array.findIndex((el) => el.id === element.id);
    const newElement = Object.assign(element, text)
    array[idx] = newElement;
    return array
};