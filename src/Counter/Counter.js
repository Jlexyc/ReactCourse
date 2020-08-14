import React from 'react';
import PropTypes from 'prop-types';

import './Counter.css';

export default function Counter({total, resultCounter}) {

        return (
            <div className="Counter">
                <div>Total:</div>
                <div>{total}</div>
                <div>Chose:</div>
                <div>{resultCounter}</div>
            </div>
        )
};

Counter.propTypes = {
    resultCounter: PropTypes.number,
    total: PropTypes.number
}

