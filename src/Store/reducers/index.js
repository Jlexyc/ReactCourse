// import { goods } from '../../Mocks/GoodsMock';
import { categories } from '../../Mocks/CategoriesMock';
import { getGoodsBySelected, getTotal } from '../../Utils/goodsUtils';

const initialState = {
  goods: [],
  selectedItems: [],
  categories,
  defaultCategory: 'uncategorized',
  total: 0,
  subtotal: 0,
  getGoodsLoading: null,
  getGoodsError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_GOODS': {
      return {
        ...state,
        goods: action.subtype === 'success' ? action.list : state.goods,
        total: action.subtype === 'success' ? action.total : state.total,
        subtotal: action.subtype === 'success' ? action.subtotal : state.subtotal,
        getGoodsLoading: action.subtype === 'loading',
        getGoodsError: action.subtype === 'error' ? action.error : null
      }
    }
    case 'ADD_ITEM': {
      return {
        ...state,
        goods: action.subtype === 'success' ? action.list : state.goods,
        total: action.subtype === 'success' ? action.total : state.total,
        addItemLoading: action.subtype === 'loading',
        getGoodsLoading: action.subtype === 'loading',
        addItemError: action.subtype === 'error' ? action.error : null
      }
    }
    case 'DELETE_SELECTED': {
      return {
        ...state,
        addItemLoading: action.subtype === 'loading',
        deleteItemsLoading: action.subtype === 'loading',
        deleteItemsError: action.subtype === 'error' ? action.error : null
      }
    }
    case 'SET_ITEM_SELECTED': {
      const newSelectedItems = [
        ...state.selectedItems,
        action.itemId,
      ];
      return {
        ...state,
        selectedItems: newSelectedItems,
        subtotal: getTotal(getGoodsBySelected(state.goods, newSelectedItems)),
      };
    }
    case 'UNSET_ITEM_SELECTED': {
      const idx = state.selectedItems
          .findIndex((itemId) => itemId === action.itemId);
      const newSelectedItems = [...state.selectedItems];
      newSelectedItems.splice(idx, 1);
      return {
        ...state,
        selectedItems: newSelectedItems,
        subtotal: getTotal(getGoodsBySelected(state.goods, newSelectedItems)),
      };
    }
    case 'DELETE_ITEM': {
      const newGoods = [...state.goods];
      const idxGoods = newGoods.findIndex((item) => item.id === action.itemId);
      newGoods.splice(idxGoods, 1);
      const newSelectedItems = [...state.selectedItems];
      const idxSelected = newSelectedItems
          .findIndex((id) => id === action.itemId);
      newSelectedItems.splice(idxSelected, 1);
      return {
        ...state,
        goods: newGoods,
        selectedItems: newSelectedItems,
        total: getTotal(newGoods),
        subtotal: getTotal(getGoodsBySelected(newGoods, newSelectedItems)),
      };
    }
    case 'UPDATE_ITEM': {
      const idxGoods = state.goods
          .findIndex((item) => item.id === action.itemId);
      const newGoods = [...state.goods];
      newGoods[idxGoods] = {id: action.itemId, ...action.item};
      return {
        ...state,
        goods: newGoods,
        total: getTotal(newGoods),
        subtotal: getTotal(getGoodsBySelected(newGoods, state.selectedItems)),
      };
    }
    default:
      return state;
  }
};

export default reducer;
