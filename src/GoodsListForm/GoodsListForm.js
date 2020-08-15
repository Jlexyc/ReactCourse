import React, { useState, useCallback } from 'react'
import './GoodsListForm.css'

export default function GoodsListForm (props) {
    const {onAdd} = props

    let [state, setState] = useState({
        title: '',
        weight: '',
        description: '',
        isSelected: false,
    })

    const onFormSubmit = useCallback(
        (e) => {
        e.preventDefault()
        onAdd(state)
        setState({
            title: '',
            weight: '',
            description: '',
            isSelected: false,
        })
    },[state])

    const onInputChange = ({ target }) => {

        if (target.name == 'weight'){
            const float_re = /^\d+\.?(\d+)?$/
            if (!float_re.test(target.value)){
                target.value = state.weight
            }
        }
        setState({...state, [target.name]: target.value})
    }

    return (
        <div>
            <form 
                className="GoodsListForm" 
                onSubmit={onFormSubmit}
            >
                <input 
                    className="GoodsListFormInput" 
                    placeholder="Title"
                    name="title"
                    value={state.title}
                    onChange={onInputChange}
                />
                <input 
                    className="GoodsListFormInput" 
                    placeholder="Weight"
                    name="weight"
                    value={state.weight}
                    onChange={onInputChange}
                />
                <input 
                    className="GoodsListFormInput" 
                    placeholder="Description"m
                    name="description"
                    value={state.description}
                    onChange={onInputChange}
                />
                <button className="GoodsListFormButton">Add</button>
            </form>
        </div>
    )
}
