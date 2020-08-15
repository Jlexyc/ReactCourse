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

export const deleteCountedElements = (goods) => {
    return goods.filter((e) => !e.isSelected)
}

export const selectedElementByID = (id, goods) => {
    const elementsIndex = goods.findIndex(element => element.id === id )
    let newArray = [...goods]
    newArray[elementsIndex] = {...newArray[elementsIndex], isSelected: !newArray[elementsIndex].isSelected}
    console.log(newArray)
    return newArray
    
}

export const updateElementByID = (arrayData, goods) => {
    const elementsIndex = goods.findIndex(element => element.id === arrayData.id )
    let newArray = [...goods]
    newArray[elementsIndex] = arrayData
    return newArray
}

export const getTotal = (goods) => {
    return goods.reduce((acc, item) => {
        return acc + parseFloat(item.weight);
    }, 0)
}

export const getTotalCounted = (goods) => {
    return goods.reduce((acc, item) => {
        return item.isSelected ? acc + parseFloat(item.weight) : acc;
    }, 0)
}