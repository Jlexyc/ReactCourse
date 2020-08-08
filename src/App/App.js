import React, { useState, useCallback } from 'react'

import './App.css'

import GoodsList from '../GoodsList/GoodsList';
import { goods as goodsMock } from '../Mocks/GoodsMock';
import GoodsListForm from '../GoodsListForm/GoodsListForm';
import { addNewItem, removeElementById, getTotal, getGoodsBySelected }
  from '../Utils/goodsUtils';
import {categories} from '../Mocks/CategoriesMock';
import __ from '../Utils/translationsUtils';

export default function App(props) {

    const [goods, setGoods] = useState(goodsMock);    
    const [total, setTotal] = useState(getTotal(goodsMock));
    const [subTotal, setSubtotal] = useState(0);
    const [selectedGoods, setSelectedGoods] = useState([]);

    const onDelete = useCallback(
        (id) => {
            const newArray = removeElementById(id, goods);
            setGoods(newArray)
            setTotal(getTotal(newArray))
        }
        ,[goods]
    )

    const onDeleteSelected = useCallback(
        () => {
            const deselectedGoods = getGoodsBySelected(goods, selectedGoods, false);
            setGoods(deselectedGoods)
            setSelectedGoods([])
            setSubtotal(0)
            setTotal(getTotal(deselectedGoods))
        }
        ,[goods, selectedGoods]
    )

    const onAdd = useCallback(
        (newElement) => {
            const newArray = addNewItem(newElement, goods);
            setGoods(goods)
            setTotal(getTotal(newArray))
          }
        ,[goods]
    )

    const onElementToggle = useCallback(
        (id) => {
            const idx = selectedGoods.findIndex((itemId) => itemId === id);
            const shallowSelectedGoodsCopy = [...selectedGoods];
    
            if (idx >= 0) {
              shallowSelectedGoodsCopy.splice(idx, 1);
            } else {
              shallowSelectedGoodsCopy.push(id);
            }
    
            setGoods(goods)
            setSubtotal(setSubtotal(goods.filter((item) => {
                return shallowSelectedGoodsCopy.indexOf(item.id) >= 0;
              })))
        }
        ,[goods, selectedGoods]
    )

    const onElementUpdate = useCallback(
        (id, data = {}) => {

            const idx = goods.findIndex((item) => item.id === id);
            const newGoods = [...goods];
            newGoods[idx] = {id, ...data};
            
            setGoods(newGoods);
            setTotal(getTotal(newGoods));
            setSubtotal(getTotal(getGoodsBySelected(newGoods, selectedGoods)));
          }
        ,[goods, selectedGoods]
    )

    return (
        <div className="Container">
        <div className="Title">{ __('Fridge') }</div>
        <GoodsList
          goods={ goods }
          categories={ categories }
          selectedItems={ selectedGoods }
          onDelete={ onDelete }
          onElementToggle={ onElementToggle }
          onElementUpdate={ onElementUpdate }
        />
        <div className="Total">
          <div>{__('Total')}:</div>
          <div>{total}</div>
          <div>{
            selectedGoods.length > 0 && `${ __('SubTotal') }: ${subTotal}`
          }</div>
        </div>
        { !!selectedGoods.length && (
          <button onClick={ onDeleteSelected }>
            { __('Delete Selected') }
          </button>
        ) }
        <GoodsListForm onAdd={onAdd} categories={ categories } />
      </div>
    )
}
