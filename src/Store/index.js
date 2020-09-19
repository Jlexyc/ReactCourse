import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import productsReducer from './reducers/productsReducer';

function logger({ getState }) {
    return next => action => {
      console.log('ACTION ', action)
  
      // Call the next dispatch method in the middleware chain.
      const returnValue = next(action)
  
      console.log('NEW STATE', getState())
  
      // This will likely be the action itself, unless
      // a middleware further in chain changed it.
      return returnValue
    }
  }

export default createStore(
    combineReducers({ auth: authReducer, products: productsReducer }),
    applyMiddleware(logger, thunk)
)
