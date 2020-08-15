import React, { useCallback, useState } from 'react'

import './App.css'

import GoodsList from '../GoodsList/GoodsList'
import { goods as goodsMock } from '../Mocks/GoodsMock'
import GoodsListForm from '../GoodsListForm/GoodsListForm'
import { updateElementByID, deleteCountedElements, addNewItem, removeElementById, getTotal, selectedElementByID, 
  getTotalCounted } from '../Utils/goodsUtils'


export default function App(props){

  let [goods, setGoods] = useState(goodsMock);    
  let [total, setTotal] = useState(getTotal(goodsMock));
  let [totalCounted, setTotalCounted] = useState(getTotalCounted(goodsMock));
  let [onUpdateID, setOnUpdateID] = useState(''); 

  const onAdd = useCallback(
    (newElement) => {
    const newArray = addNewItem(newElement, goods)
    setGoods(newArray)
    setTotal(getTotal(newArray))
  },[goods])

  const onChange = useCallback((id) => {
    setOnUpdateID(id)
  })

  const onCanсel = useCallback(() => {
    setOnUpdateID("")
  })

  const onSave =  useCallback(
    (data) => {
    const newArray = updateElementByID(data, goods)
    setGoods(newArray)
    setOnUpdateID("")
    setTotal(getTotal(newArray))
    setTotalCounted(getTotalCounted(newArray))
  },[goods])

  const deleteCounted = useCallback(
    () => {
    const newArray = deleteCountedElements(goods)
    setGoods(newArray)
    setTotal(getTotal(newArray))
    setTotalCounted(getTotalCounted(newArray))
  },[goods])

  const onDelete = useCallback(
    (id) => {
      const newArray = removeElementById(id, goods)
      setGoods(newArray)
      setTotal(getTotal(newArray))
      setTotalCounted(getTotalCounted(newArray))
    }, [goods]
  )

  const onRawClick = useCallback(
    (id) => {
    console.log(id)
    const newArray = selectedElementByID(id, goods)
    setGoods(newArray)
    setTotalCounted(getTotalCounted(newArray))
  },[goods])

    return (
      <div className="Container">
        <div className="Title">Fridge</div>
        <GoodsList goods={goods}
            onUpdateID={onUpdateID}
            onDelete={onDelete} 
            onRawClick={onRawClick} 
            onChange={onChange}
            onCanсel={onCanсel}
            onSave={onSave}/>
        <div className="Total">
          <div>Total:</div>
          <div>{total}</div>
          <div>Total counted:</div>
          <div>{totalCounted}</div>
          <div><button onClick={deleteCounted}>Delete counted</button></div>
          <div/>
        </div>
        <GoodsListForm onAdd={onAdd}/>
      </div>
    )
  // }
}
