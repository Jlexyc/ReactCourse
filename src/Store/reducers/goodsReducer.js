import { goods } from '../../Mocks/GoodsMock';
import { addNewItem, changeElementById, removeElementById, getTotal, figureProperty, selectedResult } from '../../Utils/goodsUtils'


const initialState = {
    list: goods,
    total: getTotal(goods),
    local: 0,
    changeId: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'addItem': {
            const newList = addNewItem(action.payload, state.list);
            return {
                ...state,
                list: newList,
                total: getTotal(newList),
                local: selectedResult(newList),
            }
        }
        case 'onDelete': {
            const newList = removeElementById(action.id, state.list)
            return {
                ...state,
                list: newList,
                total: getTotal(newList),
                local: selectedResult(newList),
            }
        }
        case 'onCounter': {
            const newList = figureProperty(state.list, action.payload, 'counter');
            return {
                ...state,
                list: newList,
                total: getTotal(newList),
                local: selectedResult(newList),
            }
        }  
        case 'deletingSelectedItems': {
            const newList = state.list.filter((el) => !el.counter);
            return {
                ...state,
                list: newList,
                total: getTotal(newList),
                local: selectedResult(newList),
            }
        } 
        case 'getId': {
            return {
                ...state,
                changeId: action.id
            }
        }
        case 'onChange': {
            const newList = changeElementById(state.changeId, state.list, action.form);
            return {
                ...state,
                list: newList,
                total: getTotal(newList),
                local: selectedResult(newList),
                changeId: null
            }
        }     
        default:
            return state;
    }
};

export default reducer