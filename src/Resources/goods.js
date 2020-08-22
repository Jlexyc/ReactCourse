import { get, create, remove, update } from '../Services/networkProvider'

export const getGoods = async () => {
    //get it from local storage or remote?
    const res = await get('goods')
    return res.goods
}

export const createItem = (item = {}) => {
    return create('goods', item)
}

export const removeItem = (id) => {
    return remove('goods', id)
}

export const updateItem = (id, item = {}) => {
    return update('goods', id, item)
}