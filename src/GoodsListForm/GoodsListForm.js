import React, { Component } from 'react'
import './GoodsListForm.css'
import PropTypes from 'prop-types';

export default class GoodsListForm extends Component {

  state = {
    title: '',
    weight: '',
    description: '',
    categoryName: ''
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    this.props.onAdd(this.state)
    this.setState({
      title: '',
      weight: '',
      description: '',
      categoryName: ''
    })
  }

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  render() {
    const { title, weight, description, categoryName } = this.state
    const { category } = this.props
    return (
      <div>
        <form
          className="GoodsListForm"
          onSubmit={this.onFormSubmit}
        >
          <input
            className="GoodsListFormInput"
            placeholder="Title"
            name="title"
            value={title}
            onChange={this.onInputChange}
          />
          <input
            className="GoodsListFormInput"
            placeholder="Weight"
            name="weight"
            value={weight}
            onChange={this.onInputChange}
          />
          <input
            className="GoodsListFormInput"
            placeholder="Description"
            name="description"
            value={description}
            onChange={this.onInputChange}
          />
          <select className="GoodsListFormInput" name="categoryName" value={categoryName} onChange={this.onInputChange}>
            <option value="0" >Chose category</option>
            {category.map((item) => <option key={item.id} value={item.categoryName}> {item.categoryName} </option>)}
          </select>
          <button className="GoodsListFormButton">Add</button>
        </form>
      </div>
    )
  }
}

GoodsListForm.propTypes = {
  onAdd: PropTypes.func,
  category: PropTypes.array
}