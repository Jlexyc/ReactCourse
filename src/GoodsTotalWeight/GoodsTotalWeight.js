import React, { Component } from 'react'
import "./GoodsTotalWeight.css"
import PropTypes from 'prop-types';

export default class GoodsTotalWeight extends Component {
  render() {
    return (
      <div className="Total">
        <div className="Total_Title" >Total Weidht:</div>
        <div className="Total_Weight" >{this.props.total}</div>
      </div>
    )
  }
}

GoodsTotalWeight.propTypes = {
  total: PropTypes.number
}