import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const logger = store => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }

const localThunk = store => next => action => {
    if( typeof action === 'function') {
      action(store.dispatch, store.getState)
    } else {
      return next(action)
    }
  }


const store = createStore(reducer, applyMiddleware(localThunk, logger));

export { store };
