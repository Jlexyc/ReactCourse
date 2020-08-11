import React, { Component } from "react";
import GoodsList from "../GoodsList/GoodsList";
import goods from "../Mocks/GoodsMock";
import GoodsListForm from "../GoodsListForm/GoodsListForm";
import "./App.css";
import {
  addNewItem,
  removeElementById,
  getTotal,
  onSelect,
  getTotalSelected,
  editHandler,
  editableElement,
  deleteSelected,
} from "../Utils/goodsUtils";

export default class App extends Component {
  state = {
    goods,
    total: getTotal(goods),
    totalSelected: [],
    editField: {},
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}

  onAdd = (newElement) => {
    this.setState(({ goods }) => {
      const newArray = addNewItem(newElement, goods);
      return {
        goods: newArray,
        total: getTotal(newArray),
      };
    });
  };
  onEdit = (id) => {
    this.setState({ editField: editHandler(id, this.state.goods) });
  };
  editElement = (element) => {
    this.setState(({ goods }) => {
      const newArray = editableElement(element, goods);
      return {
        goods: newArray,
        total: getTotal(newArray),
        editField: {},
        totalSelected: null,
      };
    });
  };

  onDelete = (id) => {
    const newArray = removeElementById(id, this.state.goods);
    this.setState({
      goods: newArray,
      total: getTotal(newArray),
      totalSelected: getTotalSelected(newArray),
    });
  };
  onSelected = (id) => {
    const newArray = onSelect(id, this.state.goods);

    this.setState({
      goods: newArray,
      totalSelected: getTotalSelected(newArray),
    });
  };

  onDeleteSelected = () => {
    const newGoods = deleteSelected(this.state.goods);
    this.setState({
      goods: newGoods,
      total: getTotal(newGoods),
      totalSelected: null,
    });
  };

  render() {
    const { total, totalSelected, goods, editField } = this.state;
    return (
      <div className="Container">
        <div className="Title">Fridge</div>
        <GoodsList
          goods={goods}
          onDelete={this.onDelete}
          onSelected={this.onSelected}
          onEdit={this.onEdit}
        />
        <div className="Total">
          <div>Total:</div>
          <div>{total}</div>
          <div>{totalSelected ? totalSelected : ""}</div>
          <button onClick={this.onDeleteSelected}>DeleteSelected</button>
          <div />
        </div>
        <GoodsListForm
          onAdd={this.onAdd}
          editField={editField}
          editElement={this.editElement}
        />
      </div>
    );
  }
}
