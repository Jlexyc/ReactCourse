import React from 'react';
import { useSelector } from 'react-redux';

import './Counter.css';

export default function Counter() {

    const total = useSelector(state => state.goods.total)
    const local = useSelector(state => state.goods.local)

        return (
            <div className="Counter">
                <div>Total:</div>
                <div>{total}</div>
                <div>Chose:</div>
                <div>{local}</div>
            </div>
        )
};

