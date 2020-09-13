import { 
  getGoods as getGoodsResource, 
  removeItem as removeItemResource, 
  updateItem as updateItemResource,
  createItem as addItemResource
} from '../../Resources/goods'

import {
  get
} from '../../Services/networkProvider'

import { getGoodsBySelected, getTotal } from '../../Utils/goodsUtils';

export const getGoods = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'GET_GOODS',
      subtype: 'loading'
    })
    const state = getState()

    try {
      const res = await get('goods')
      console.log('res: ', res.goods)
      dispatch({
        type: 'GET_GOODS',
        subtype: 'success',
        list: res.goods,
        total: getTotal(res.goods),
        subtotal: getTotal(getGoodsBySelected(res.goods, state.selectedItems))
      })
    } catch (getGoodsError) {
      dispatch({
        type: 'GET_GOODS',
        subtype: 'failed',
        error: getGoodsError.message
      })
    }

  }
}

export const deleteSelected = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'DELETE_SELECTED',
      subtype: 'loading'
    })
    const state = getState()

    const promises = state.selectedItems.map((e) => removeItemResource(e))
    Promise.all(promises).then((res) => {
        dispatch(getGoods())
        dispatch({
          type: 'DELETE_SELECTED',
          subtype: 'success',
        }
      )},
        (getGoodsError) => {
          dispatch(getGoods())
          dispatch({
            type: 'DELETE_SELECTED',
            subtype: 'failed',
            error: getGoodsError.message
          })
        }
      )
  }
}

export const updateItem = (item) => async (dispatch, getState) => new Promise((resolve, reject) => {
    dispatch({
      type: 'UPDATE_ITEM',
      subtype: 'loading'
    })
    const state = getState()

    updateItemResource(item.id, item).then((res) => {
        console.log('UPDATE RES: ', res)
        dispatch({
          type: 'UPDATE_ITEM',
          subtype: 'success',
          itemId: item.id,
          item: res
        })
        resolve()
      },
        (error) => {
          dispatch({
            type: 'UPDATE_ITEM',
            subtype: 'failed',
            error: error.message
          })
          reject()
        }
      )
  })

export const addItem = (item) => async (dispatch, getState) => new Promise((resolve, reject) => {
  dispatch({
    type: 'ADD_ITEM',
    subtype: 'loading',
  })

  addItemResource(item).then(res => {
    const state = getState()
    const newList = [ ...state.goods, res ]
    dispatch({
      type: 'ADD_ITEM',
      subtype: 'success',
      list: newList,
      total: getTotal(newList)
    })
    resolve()
  },
  (getGoodsError) => {
    dispatch({
      type: 'ADD_ITEM',
      subtype: 'failed',
      error: getGoodsError.message
    })
    reject()
  })
})

export const setItemSelected = (id) => {
  return {
    type: 'SET_ITEM_SELECTED',
    itemId: id,
  };
};

export const unsetItemSelected = (id) => {
  return {
    type: 'UNSET_ITEM_SELECTED',
    itemId: id,
  };
};

export const deleteItem = (id) => {
  return {
    type: 'DELETE_ITEM',
    itemId: id,
  };
};
