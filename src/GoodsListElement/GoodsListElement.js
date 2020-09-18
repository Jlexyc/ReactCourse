import React from 'react';
import PropTypes from 'prop-types';

import './GoodsListElement.css';

export default function GoodsListElement(props) {

    const { title, weight, description, value } = props.good
    const { onCounter, onDelete, getId } = props
    
        let className = 'GoodsListElement';
        let changeValue = value;

        if(value === 'important') {
            className += ` ${value}`
            changeValue = 'Important'
        } else {
            className = 'GoodsListElement'
            changeValue = 'Not important'
        }

        return (
            <React.Fragment>
                <h2>{changeValue}</h2>
                <div className={className} >
                <input type="checkbox" onClick={onCounter} />
                    <div className="GoodsListElement_Column">
                        {title}
                    </div>
                    <div className="GoodsListElement_Column">
                        {weight}
                    </div>
                    <div className="GoodsListElement_Column GoodsListElement_ColumnDescription">
                        {description}
                    </div>
                    <div className="GoodsListElement_Column GoodsListElement_Button">
                        <button onClick={getId}>Change</button>
                        <button onClick={onDelete}>Delete</button>
                    </div>
                </div>
            </React.Fragment>
        )
}

GoodsListElement.propTypes = {
    good: PropTypes.object,
    onDelete: PropTypes.func,
    onCounter: PropTypes.func,
    getId: PropTypes.func,
}



