import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import GoodsListElement from '../GoodsListElement/GoodsListElement';
import { getGoods } from '../Resources/goods'
import * as actions from '../Store/Actions/goodsListElementActions';

const GoodsList = (props) => {
  const goods = useSelector(state => state.goods, shallowEqual)
  const selectedItems = useSelector(state => state.selectedItems, shallowEqual)

  const dispatch = useDispatch()

  useEffect(() => {
    getGoods().then(res => {
      dispatch(actions.getGoods(res))
    })
  }, [])

  return (
    <div>
      { goods.map((item) => {
        const selected = selectedItems.indexOf(item.id) >= 0;
        return (
          <GoodsListElement
            item={ item }
            key={ item.id }
            selected={ selected }
          />
        );
      }) }
    </div>
  );
};

GoodsList.defaultProps = {
  goods: [],
  selectedItems: [],
};

GoodsList.propTypes = {
  goods: PropTypes.array,
  selectedItems: PropTypes.array,
};

export default GoodsList

