import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Counter.css';

export default class Counter extends Component {

    render() {
        return (
            <div className="Counter">
                <div>Total:</div>
                <div>{this.props.total}</div>
                <div>Chose:</div>
                <div>{this.props.resultCounter}</div>
            </div>
        )
    }
};

Counter.propTypes = {
    resultCounter: PropTypes.number,
    total: PropTypes.number
}

