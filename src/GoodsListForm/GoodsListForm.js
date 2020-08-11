import React, { Component } from "react";
import PropTypes from "prop-types";

import "./GoodsListForm.css";

export default class GoodsListForm extends Component {
  state = { title: "", weight: "", description: "" };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.editField.id !== prevProps.editField.id) {
      this.setState({ ...this.props.editField });
    }
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    if (this.props.editField.edit) {
      const editField = { ...this.state };
      this.props.editElement(editField);
    } else {
      if (this.state.description && this.state.title && this.state.weight) {
        this.props.onAdd(this.state);
      } else return;
    }

    this.setState({
      description: "",
      edit: false,
      id: "",
      selected: false,
      title: "",
      weight: "",
    });
  };

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { title, weight, description } = this.state;
    return (
      <div>
        <form className="GoodsListForm" onSubmit={this.onFormSubmit}>
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
          <button className="GoodsListFormButton">Add</button>
        </form>
      </div>
    );
  }
}
GoodsListForm.defaultProps = {
  editField: {},
};

GoodsListForm.propTypes = {
  onAdd: PropTypes.func,
  editField:PropTypes.object,
  editElement:PropTypes.func,

};