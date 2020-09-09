import { getGoods as getGoodsResource, removeItem as removeItemResource } from '../../Resources/goods'
import { getGoodsBySelected, getTotal } from '../../Utils/goodsUtils';

export const getGoods = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: 'GET_GOODS',
      subtype: 'loading'
    })
    const state = getState()

    try {
      const res = await getGoodsResource()
      dispatch({
        type: 'GET_GOODS',
        subtype: 'success',
        list: res,
        total: getTotal(res),
        subtotal: getTotal(getGoodsBySelected(res, state.selectedItems))
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

export const updateItem = (id, item = {}) => {
  return {
    type: 'UPDATE_ITEM',
    itemId: id,
    item,
  };
};
