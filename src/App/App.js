import React, { useState, useCallback } from 'react'

import './App.css'

import GoodsList from '../GoodsList/GoodsList'
import { goods as MainInfo } from '../Mocks/GoodsMock';
import GoodsListForm from '../GoodsListForm/GoodsListForm'
import { addNewItem, removeElementById, getTotal, figureProperty, selectedResult, findElementById, changeElementById } from '../Utils/goodsUtils'
import Counter from '../Counter/Counter'
import GoodsChangeForm from '../GoodsChangeForm/GoodsChangeForm'

export default function App() {

  const [goods, setGoods] = useState(MainInfo);
  const [total, setTotal] = useState(getTotal(goods));
  const [local, setLocal] = useState(0);
  const [changeId, setChangeId] = useState(null);


  const onCounter = useCallback(
    (id) => {
      const result = figureProperty(goods, id, 'counter');
      setGoods(result)
      setLocal(selectedResult(result))
    },
    [goods],
  )

  const onAdd = useCallback(
    (newElement) => {
      const newArray = addNewItem(newElement, goods);
      setGoods(newArray);
      setTotal(getTotal(newArray))
    },
    [goods],
  )


    const onDelete = useCallback(
      (id) => {
        const newArray = removeElementById(id, goods);
        setGoods(newArray)
        setTotal(getTotal(newArray))
        setLocal(selectedResult(newArray))
      },
      [goods],
    )

  const getId = useCallback(
    (id) => {
      setChangeId(id)
    },
    [],
  )


  const deletingSelectedItems = useCallback(
    () => {
      const filterResult = goods.filter((el) => !el.counter)
      setGoods(filterResult)
      setTotal(getTotal(filterResult))
      setLocal(selectedResult(filterResult))
    },
    [goods],
  )

  const onChange = useCallback(
    (text) => {
    const element = findElementById(changeId, goods);
    const renewalItems = changeElementById(element, goods, text)
    setGoods(renewalItems)
    setTotal(getTotal(renewalItems))
    setLocal(selectedResult(renewalItems))
    setChangeId(null)
    },
    [changeId, goods],
  )


  return (
    <div className="Container">
      <div className="Title">Fridge</div>
      <GoodsList goods={goods} onDelete={onDelete} onCounter={onCounter} getId={getId} />
      <Counter total={total} resultCounter={local} />
      <div className="cartForm">
        <GoodsListForm onAdd={onAdd} />
        <GoodsChangeForm changeId={changeId} onChange={onChange} />
      </div>
      <div>
        <h3>THIS BUTTON DELETE ALL PRODUCT THEN YOU HAVE MARKED </h3>
        <button className="allDelete" onClick={() => deletingSelectedItems()}>delete</button>
      </div>
    </div>
  )
}
