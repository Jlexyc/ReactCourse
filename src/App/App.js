import React, { Component } from 'react'

import './App.css'

import GoodsList from '../GoodsList/GoodsList'
import { goods } from '../Mocks/GoodsMock'
import GoodsListForm from '../GoodsListForm/GoodsListForm'
import { addNewItem, removeElementById, getTotal, figureProperty, selectedResult, findElementById, changeElementById } from '../Utils/goodsUtils'
import Counter from '../Counter/Counter'
import GoodsChangeForm from '../GoodsChangeForm/GoodsChangeForm'

export default class App extends Component {
  state = {
    goods,
    total: getTotal(goods),
    local: 0,
    changeId: null,
  }


  onCounter = (id) => {
    this.setState((state) => {
      const result = figureProperty(state.goods, id, 'counter');

      return {
        goods: result,
        local: selectedResult(result)
      }
    })
  };

  onAdd = (newElement) => {
    this.setState(({ goods }) => {
      const newArray = addNewItem(newElement, goods)
      return {
        goods: newArray,
        total: getTotal(newArray),
      }
    })
  }

  onDelete = (id) => {
    const newArray = removeElementById(id, this.state.goods)
    this.setState({
      goods: newArray,
      total: getTotal(newArray),
      local: selectedResult(newArray)
    })
  }

  getId = (id) => {
    this.setState({
      changeId: id
    })
  }

  deletingSelectedItems = () => {
    const filterResult = this.state.goods.filter((el) => !el.counter)
    this.setState({
      goods: filterResult,
      total: getTotal(filterResult),
      local: selectedResult(filterResult)
    });
  };

  onChange = (text) => {
    const { changeId, goods } = this.state
    const element = findElementById(changeId, goods);
    const renewalItems = changeElementById(element, this.state.goods, text)

    this.setState({
      goods: renewalItems,
      total: getTotal(renewalItems),
      local: selectedResult(renewalItems),
      changeId: null
    })
  };

  render() {
    const { total, goods, local, changeId } = this.state
    return (
      <div className="Container">
        <div className="Title">Fridge</div>
        <GoodsList goods={goods} onDelete={this.onDelete} onCounter={this.onCounter} getId={this.getId} />
        <Counter total={total} resultCounter={local} />
        <div className="cartForm">
          <GoodsListForm onAdd={this.onAdd} />
          <GoodsChangeForm changeId={changeId} onChange={this.onChange} />
        </div>
        <div>
          <h3>THIS BUTTON DELETE ALL PRODUCT THEN YOU HAVE MARKED </h3>
          <button className="allDelete" onClick={() => this.deletingSelectedItems()}>delete</button>
        </div>
      </div>
    )
  }
}
