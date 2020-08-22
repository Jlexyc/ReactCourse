import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App/App';
import { store } from './Store';
import { initWithEndpoint, get, create, remove, update } from './Services/networkProvider'

initWithEndpoint('http://localhost:8080')

update('goods', '7ecfb3ff-332f-4ed1-b84a-db486c8d021f', {
  title: 'Title After Update',
  description: 'Description After Update',
  weight: '123'
}).then(() => {
  get('goods')
})


ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

