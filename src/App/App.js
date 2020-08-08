import React, { Component } from 'react'

import './App.css'

import GoodsList from '../GoodsList/GoodsList'
import { goods } from '../Mocks/GoodsMock'
import { category } from '../Mocks/CategoryMock'
import GoodsListForm from '../GoodsListForm/GoodsListForm'
import { addNewItem, removeElementById, getTotal, changeGoodsSelected, selectedItems, changeItem, removeSelectedItems, checkSelected } from '../Utils/goodsUtils'
import GoodsTotalWeight from '../GoodsTotalWeight/GoodsTotalWeight'
import SelectedItemWeigt from '../SelectedItemWeigt/SelectedItemWeight'

export default class App extends Component {
  state = {
    category,
    goods,
    total: getTotal(goods),
    totalWeightSelectedItem: "0",
  }

  recalculateTotal = () => {
    this.setState((state) => ({
      total: getTotal(state.goods)
    }))
  }

  onAdd = (newElement) => {
    this.setState(({ goods }) => {
      const newArray = addNewItem(newElement, goods)
      return {
        goods: newArray,
        total: getTotal(newArray),
      }
    })
  }

  onSaveItem = (newElement, id) => {
    this.setState(({ goods }) => {
      const newArr = changeItem(goods, newElement, id)
      return {
        goods: newArr,
        total: getTotal(newArr),
      }
    })
  }

  onDelete = (id) => {
    const newArray = removeElementById(id, this.state.goods)
    const array = selectedItems(newArray)
    this.setState({
      goods: newArray,
      total: getTotal(newArray),
      totalWeightSelectedItem: getTotal(array)
    })
  }

  onToggle = (id) => {
    this.setState(({ goods }) => {
      const arr = changeGoodsSelected(goods, id)
      const selectedItemsArray = selectedItems(arr)
      return { goods: arr, totalWeightSelectedItem: getTotal(selectedItemsArray) }
    })
  }

  deleteSelected = () => {
    const selectedArray = removeSelectedItems(this.state.goods)
    const array = selectedItems(selectedArray)
    this.setState({
      goods: selectedArray,
      total: getTotal(selectedArray),
      totalWeightSelectedItem: getTotal(array)
    })
  }

  render() {
    const { total, goods, category, totalWeightSelectedItem } = this.state
    return (
      <div className="Container">
        <div className="Title">Fridge</div>
        <GoodsList onSaveItem={this.onSaveItem} goods={goods} category={category} onDelete={this.onDelete} onToggle={this.onToggle} />
        <GoodsTotalWeight total={total} />
        <SelectedItemWeigt totalWeightSelectedItem={totalWeightSelectedItem} />
        <GoodsListForm category={category} onAdd={this.onAdd} />
        <button className="deleteSelected" onClick={this.deleteSelected} disabled={checkSelected(goods)} >Delete Selected</button>
      </div>
    )
  }
}