import { goods } from '../../Mocks/GoodsMock'
import { addNewItem, removeElementById, getTotal } from '../../Utils/goodsUtils';

const initialState = {
    list: goods,
    selectedList: [],
    total: getTotal(goods)
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'addItem':{
            const newList = addNewItem(action.payload, state.list)
            return {
                ...state,
                list: newList,
                total: getTotal(newList)
            }
        }
        case 'deleteItem': {
            const newList = removeElementById(action.id, state.list)
            return {
                ...state,
                list: newList,
                total: getTotal(newList)
            }
        }
        case 'toggleItem':
            const idx = state.selectedList.findIndex((itemId) => itemId === action.id);
            const shallowSelectedGoodsCopy = [...state.selectedList];
        
            if (idx >= 0) {
              shallowSelectedGoodsCopy.splice(idx, 1);
            } else {
              shallowSelectedGoodsCopy.push(action.id);
            }

            return {
                ...state,
                selectedList: shallowSelectedGoodsCopy
            }
        default:
            return state
    }
}

export default reducer