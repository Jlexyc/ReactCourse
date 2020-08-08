import React, { Component } from 'react'
import GoodsListElement from '../GoodsListElement/GoodsListElement'
import PropTypes from 'prop-types';

export default class GoodsList extends Component {
    onDelete = (id) => {
        this.props.onDelete(id)
    }

    onRawClick = (id) => {
        this.props.onRawClick(id)
    }

    onChange = (id) => {
        this.props.onChange(id)
    }

    onCanсel = () => {
        this.props.onCanсel()
    }

    onSave = (data) => {
        this.props.onSave(data)
    }
    
    render() {
        const { goods, onUpdateID} = this.props
        return (
            <div>
                {Array.isArray(goods) && goods.map( (good) => {
                return (
                    <GoodsListElement 
                        good={good} 
                        key={good.id}
                        onDelete={this.onDelete}
                        onRawClick={this.onRawClick}
                        onChange={this.onChange}
                        onCanсel={this.onCanсel}
                        onSave={this.onSave}
                        onUpdateID={onUpdateID}
                    />
                )
                })}
            </div>
        )
    }
}

GoodsList.defaultProps = {
    goods: []
}

GoodsList.propTypes = {
    goods: PropTypes.array
}