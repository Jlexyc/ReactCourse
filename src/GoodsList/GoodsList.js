import React, { useEffect, useState } from 'react';
import { connect, useSelector, useDispatch, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import GoodsListElement from '../GoodsListElement/GoodsListElement';

const GoodsList = (props) => {
  const goods = useSelector(state => state.goods, shallowEqual)
  const selectedItems = useSelector(state => state.selectedItems, shallowEqual)

  const error = useSelector(state => state.getGoodsError)
  const isLoading = useSelector(state => state.getGoodsLoading)

  return (
    <div>
      { isLoading && <div>...loading</div>}
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
      {error && <div>ERROR: {error}</div>}
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

