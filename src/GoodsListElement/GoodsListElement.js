import React, { Component } from 'react'
import './GoodsListElement.css'
import { getCategory } from '../Utils/categoryUtils'
import PropTypes from 'prop-types';

export default class GoodsListElement extends Component {
  state = {
    isEditing: false,
    title: "",
    weight: "",
    description: "",
    categoryName: "",
    disabled: true
  }

  onDelete = () => {
    this.props.onDelete(this.props.good.id)
  }

  onToggle = () => {
    this.props.onToggle(this.props.good.id);
  }

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value
    })
  }

  onEditItem = () => {
    const { title, weight, description, categoryName } = this.props.good
    this.setState({
      isEditing: true,
      title: title,
      weight: weight,
      categoryName: categoryName,
      description: description,
      disabled: false
    })
  }

  onSaveItem = () => {
    this.props.onSaveItem(this.state, this.props.good.id)
    this.setState({
      isEditing: false,
      disabled: true
    })
  }
  render() {
    const { isEditing, disabled } = this.state
    const { title, weight, description, categoryName } = this.props.good
    const { category } = this.props
    const inputTitle = <input
      onChange={this.onInputChange}
      name="title"
      className="GoodsListElement_Column GoodsListElement_Column_Title"
      defaultValue={title}
    />
    const inputWeight = <input
      onChange={this.onInputChange}
      name="weight"
      className="GoodsListElement_Column GoodsListElement_Column_Weight"
      defaultValue={weight}
    />
    const inputDescription = <input
      onChange={this.onInputChange}
      name="description"
      className="GoodsListElement_Column GoodsListElement_Column_Description"
      defaultValue={description}
    />
    const choseCategory = <select
      onChange={this.onInputChange}
      name="categoryName"
      className="GoodsListElement_Column GoodsListElement_Column_Category"
      defaultValue={categoryName}>
      <option value="0" >Chose category</option>
      {category.map((item) => <option key={item.id} value={item.categoryName}> {item.categoryName} </option>)}
    </select>
    return (
      <div className="GoodsListElement">
        <input name="title" type="checkbox" onClick={this.onToggle} />
        {isEditing ? inputTitle : <div className="GoodsListElement_Column GoodsListElement_Column_Title">{title}</div>}
        {isEditing ? inputWeight : <div className="GoodsListElement_Column GoodsListElement_Column_Weight">{weight}</div>}
        {isEditing ? inputDescription : <div className="GoodsListElement_Column GoodsListElement_Column_Description">{description}</div>}
        {isEditing ? choseCategory : <div className="GoodsListElement_Column GoodsListElement_Column_Category">{getCategory(categoryName)}</div>}

        <div className="GoodsListElement_Column GoodsListElement_Button">
          <button onClick={this.onEditItem}>Edit</button>
        </div>
        <div className="GoodsListElement_Column GoodsListElement_Button">
          <button onClick={this.onSaveItem} disabled={disabled} >Save</button>
        </div>
        <div className="GoodsListElement_Column GoodsListElement_Button">
          <button onClick={this.onDelete}>Delete</button>
        </div>
      </div>
    )
  }
}

GoodsListElement.propTypes = {
  onSaveItem: PropTypes.func,
  onDelete: PropTypes.func,
  onToggle: PropTypes.func,
  title: PropTypes.string,
  weight: PropTypes.number,
  description: PropTypes.string,
  categoryName: PropTypes.string
};