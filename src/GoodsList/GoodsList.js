import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import GoodsListElement from '../GoodsListElement/GoodsListElement';
import * as goodsActions from '../Store/actions/goodsActions';

export default function GoodsList() {

    const dispatch = useDispatch();
    const goods = useSelector(state => state.goods.list, shallowEqual)

    const onDeleteItem = useCallback(
        (id) => {
            dispatch(goodsActions.onDelete(id))
        },
        [dispatch],
    )

    const onCounter = useCallback(
        (id) => {
            dispatch(goodsActions.onCounter(id))
        }, 
        [dispatch]
    )

    const getId = useCallback(
        (id) => {
            dispatch(goodsActions.getId(id))
        }, 
        [dispatch]
    )

    const element = Array.isArray(goods) && goods.map(({ id, ...good }) => {
        return (
            <GoodsListElement
                good={good}
                key={id}
                onDelete={() => onDeleteItem(id)}
                onCounter={() => onCounter(id)}
                getId={() => getId(id)}
            />
        )
    })

    return (
        <div>
            {element}
        </div>
    )
}

GoodsList.defaultProps = {
    goods: []
}

GoodsList.propTypes = {
    goods: PropTypes.array,
    onDelete: PropTypes.func,
    onCounter: PropTypes.func,
    getId: PropTypes.func,
}