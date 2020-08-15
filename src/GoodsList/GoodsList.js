import React, { Component } from 'react'
import GoodsListElement from '../GoodsListElement/GoodsListElement'
import PropTypes from 'prop-types';

export default function GoodsList(props){
    const { goods, onUpdateID, onDelete, onRawClick, onChange, onCanсel, onSave} = props

    // onDelete = (id) => {
    //     this.props.onDelete(id)
    // }

    // onRawClick = (id) => {
    //     this.props.onRawClick(id)
    // }

    // onChange = (id) => {
    //     this.props.onChange(id)
    // }

    // onCanсel = () => {
    //     this.props.onCanсel()
    // }

    // onSave = (data) => {
    //     this.props.onSave(data)
    // }
    
    return (
        <div>
            {Array.isArray(goods) && goods.map( (good) => {
            return (
                <GoodsListElement 
                    good={good} 
                    key={good.id}
                    onDelete={onDelete}
                    onRawClick={onRawClick}
                    onChange={onChange}
                    onCanсel={onCanсel}
                    onSave={onSave}
                    onUpdateID={onUpdateID}
                />
            )
            })}
        </div>
    )
}

GoodsList.defaultProps = {
    goods: []
}

GoodsList.propTypes = {
    goods: PropTypes.array
}