export const addItem = (item) => {
    return {
        type: 'addItem',
        payload: item
    }
}

export const deleteItem = (itemId) => {
    return {
        type: 'deleteItem',
        id: itemId
    }
}

export const selectItem = (itemId) => {
    return {
        type: 'toggleItem',
        id: itemId
    }

    // setSubtotal(setSubtotal(goods.filter((item) => {
    //     return shallowSelectedGoodsCopy.indexOf(item.id) >= 0;
    //   })))
    // setSelectedGoods
}