import { createItem as addItemResource } from '../../Resources/goods'
import { getTotal } from '../../Utils/goodsUtils';

export const addItem = (item) => async (dispatch, getState) => {
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
  },
  (getGoodsError) => {
    dispatch({
      type: 'ADD_ITEM',
      subtype: 'failed',
      error: getGoodsError.message
    })
  })
}