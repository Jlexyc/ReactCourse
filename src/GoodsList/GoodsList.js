import React, { Component } from 'react'
import GoodsListElement from '../GoodsListElement/GoodsListElement'
import PropTypes from 'prop-types';

export default class GoodsList extends Component {
  onDelete = (id) => {
    this.props.onDelete(id)
  }

  onToggle = (id) => {
    this.props.onToggle(id)
  }

  onSaveItem = (newElement, id) => {
    this.props.onSaveItem(newElement, id)
  }

  render() {
    const { goods, category } = this.props
    return (
      <div>
        {Array.isArray(goods) && goods.map((good) => {
          return (
            <GoodsListElement
              category={category}
              good={good}
              key={good.id}
              onDelete={this.onDelete}
              onToggle={this.onToggle}
              onSaveItem={this.onSaveItem}
            />
          )
        })}
      </div>
    )
  }
}

GoodsList.defaultProps = {
  goods: [],
  category: []
}

GoodsList.propTypes = {
  goods: PropTypes.array,
  category: PropTypes.array,
  onDelete: PropTypes.func,
  onToggle: PropTypes.func,
  onSaveItem: PropTypes.func,
}