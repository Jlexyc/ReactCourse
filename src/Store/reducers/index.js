import { combineReducers } from 'redux'

import form from './formReducer'
import categories from './categoriesReducer'
import goods from './goodsReducer'

export default combineReducers({
  form,
  categories,
  goods
})