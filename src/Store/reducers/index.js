import { combineReducers } from 'redux';

import form from './formReducer';
import downDropList from './categoriesReducer';
import goods from './goodsReducer';
import changeForm from './formChangeReducer'

export default combineReducers({
    form,
    downDropList,
    goods,
    changeForm
})