import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux';

import './App.css'

import GoodsList from '../GoodsList/GoodsList'
import GoodsListForm from '../GoodsListForm/GoodsListForm'
import Counter from '../Counter/Counter'
import GoodsChangeForm from '../GoodsChangeForm/GoodsChangeForm';
import * as goodsActions from '../Store/actions/goodsActions';

export default function App() {

  const dispatch = useDispatch();

  const deletingSelectedItems = useCallback(
    () => {
      dispatch(goodsActions.deletingSelectedItems())
    },
    [dispatch],
  )

  return (
    <div className="Container">
      <div className="Title">Fridge</div>
      <GoodsList />
      <Counter />
      <div className="cartForm">
        <GoodsListForm />
        <GoodsChangeForm />
      </div>
      <div>
        <h3>THIS BUTTON DELETE ALL PRODUCT THEN YOU HAVE MARKED </h3>
        <button className="allDelete" onClick={() => deletingSelectedItems()}>delete</button>
      </div>
    </div>
  )
}
