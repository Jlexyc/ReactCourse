import React, { Component } from 'react'
import "./SelectedItemWeight.css"

export default class SelectedItemWeigt extends Component {
  render() {
    return (
      <div className="SubTotal">
        <div className="SubTotal_Title" >Selected Total Weidht:</div>
        <div className="SubTotal_Weight" >{this.props.totalWeightSelectedItem}</div>
      </div>
    )
  }
}