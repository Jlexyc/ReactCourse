import React, { Component } from 'react'
import GoodsListElement from '../GoodsListElement/GoodsListElement'
import PropTypes from 'prop-types';

export default class GoodsList extends Component {

    
    render() {
        const { goods, onDelete, onCounter, getId} = this.props;

        const element =  Array.isArray(goods) && goods.map( ({ id, ...good }) => {
            return (
                <GoodsListElement 
                    good={good} 
                    key={id}
                    onDelete={() => onDelete(id)}
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