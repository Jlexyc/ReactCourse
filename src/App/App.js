import React, { Component } from 'react'

import './App.css'

import GoodsList from '../GoodsList/GoodsList'
import { goods } from '../Mocks/GoodsMock'
import GoodsListForm from '../GoodsListForm/GoodsListForm'
import { updateElementByID, deleteCountedElements, addNewItem, removeElementById, getTotal, selectedElementByID, 
  getTotalCounted } from '../Utils/goodsUtils'


export default class App extends Component {
  state = {
    goods,
    total: getTotal(goods),
    totalCounted: getTotalCounted(goods),
    onUpdateID: "" 
  }

  recalculateTotal = () => {
    this.setState((state) => ({
      total: getTotal(state.goods)
    }))
  }

  recalculategetTotalCounted = () => {
    this.setState((state) => ({
      totalCounted: getTotalCounted(state.goods)
    }))
  }

  onAdd = (newElement) => {
    this.setState(({ goods }) => {
      const newArray = addNewItem(newElement, goods)
      return {
        goods: newArray,
        total: getTotal(newArray),
    }})
  }

  onDelete = (id) => {
    const newArray = removeElementById(id, this.state.goods)
    this.setState({
      goods: newArray,
      total: getTotal(newArray),
      totalCounted: getTotalCounted(newArray),
    })
  }

  onChange = (id) => {
    this.setState({
      onUpdateID: id,
    })
  }

  onCanсel = () => {
    this.setState({
      onUpdateID: '',
    })
      
  }

  onSave = (data) => {
    const newArray = updateElementByID(data, this.state.goods)
    this.setState({
      goods: newArray,
      onUpdateID: "",
      total: getTotal(newArray),
      totalCounted: getTotalCounted(newArray),
    })

  }

  deleteCounted = () => {
    const newArray = deleteCountedElements(this.state.goods)
    this.setState({
      goods: newArray,
      total: getTotal(newArray),
      totalCounted: getTotalCounted(newArray),
    })
  }

  onRawClick = (id) => {
    const newArray = selectedElementByID(id, this.state.goods)
    this.setState({
      goods: newArray,
      totalCounted: getTotalCounted(newArray),
    })
  }

  render() {
    const { total, goods, onUpdateID, totalCounted } = this.state
    return (
      <div className="Container">
        <div className="Title">Fridge</div>
        <GoodsList goods={goods}
            onUpdateID={onUpdateID}
            onDelete={this.onDelete} 
            onRawClick={this.onRawClick} 
            onChange={this.onChange}
            onCanсel={this.onCanсel}
            onSave={this.onSave}/>
        <div className="Total">
          <div>Total:</div>
          <div>{total}</div>
          <div>Total counted:</div>
          <div>{totalCounted}</div>
          <div><button onClick={this.deleteCounted}>Delete counted</button></div>
          <div/>
        </div>
        <GoodsListForm onAdd={this.onAdd}/>
      </div>
    )
  }
}
