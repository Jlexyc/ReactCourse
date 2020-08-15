import React, { useCallback } from 'react'
import GoodsListElement from '../GoodsListElement/GoodsListElement';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import * as goodsActions from  '../Store/actions/goodsActions'

export default function GoodsList(props) {

    const { onElementToggle, onElementUpdate, onDelete } = props;

    const dispatch = useDispatch()

    const goods = useSelector(state => {
      console.log(state)
      return state.goods.list
    }, shallowEqual)
    const categories = useSelector(state => state.categories.list, shallowEqual)
    const selectedItems = useSelector(state => state.goods.selectedList, shallowEqual)

    const toggleItem = useCallback(
      (id) => {
         dispatch(goodsActions.selectItem(id))
      }
      ,[dispatch, goodsActions]
    )

    const deleteItem = useCallback(
      (id) => {
         dispatch(goodsActions.deleteItem(id))
      }
      ,[dispatch, goodsActions]
    )

    return (
        <div>
        {Array.isArray(goods) && goods.map( (item) => {
          const selected = selectedItems.indexOf(item.id) >= 0;
          return (
            <GoodsListElement
              item={ item }
              categories={ categories }
              key={ item.id }
              selected={ selected }
              onSave={ onElementUpdate }
              onDelete={ deleteItem }
              onToggle={ toggleItem }
            />
          );
        })}
      </div>
    )
}

GoodsList.defaultProps = {
    goods: [],
    selectedItems: [],
  };
  
GoodsList.propTypes = {
    goods: PropTypes.array,
    categories: PropTypes.array,
    selectedItems: PropTypes.array,
    onDelete: PropTypes.func,
    onElementToggle: PropTypes.func,
    onElementUpdate: PropTypes.func,
};
  