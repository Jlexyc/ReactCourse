import React, { Component } from "react";
import PropTypes from "prop-types";

import "./GoodsListElement.css";

export default class GoodsListElement extends Component {
  onDelete = (e) => {
    e.stopPropagation();
    this.props.onDelete(this.props.good.id);
  };
  onSelected = () => {
    this.props.onSelected(this.props.good.id);
  };
  onEdit = (e) => {
    e.stopPropagation();
    this.props.onEdit(this.props.good.id);
  };

  render() {
    const { title, weight, description, selected } = this.props.good;

    return (
      <div
        className={`GoodsListElement ${selected ? "GoodsListElementGrey" : ""}`}
        onClick={this.onSelected}
      >
        <div className="GoodsListElement_Column">{title}</div>
        <div className="GoodsListElement_Column">{weight}</div>
        <div className="GoodsListElement_Column GoodsListElement_ColumnDescription">
          {description}
        </div>
        <div className="GoodsListElement_Column GoodsListElement_Button">
          <button onClick={this.onEdit}>Edit</button>
          <button onClick={this.onDelete}>Delete</button>
        </div>
      </div>
    );
  }
}
GoodsListElement.defaultProps = {
  good: {},
};

GoodsListElement.propTypes = {
  good: PropTypes.object,
  onDelete: PropTypes.func,
  onSelected:PropTypes.func,
  onEdit:PropTypes.func,

};