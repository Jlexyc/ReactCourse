import React, { useState, useCallback } from 'react'
import './GoodsListElement.css'
import PropTypes from 'prop-types';

export default function GoodsListElement(props) {

    let { id, title, weight, description, isSelected} = props.good
    let { onCanсel, onSave, onChange, onRawClick, onDelete, onUpdateID }  = props

    let [state, setState] = useState({
        id: '',
        title: '',
        weight: '',
        description: '',
        isSelected: false,
    })

    const onDeleteElem = useCallback(
        (e) => {
            e.stopPropagation()
            onDelete(id);
        },
        [onDelete, id],
    )

    const onRawClickElem = useCallback(
        (e) => {
            e.stopPropagation()
            onRawClick(id)
    },[id, onRawClick])

    const onChangeElem = useCallback((e) => {
        e.stopPropagation()
        setState({...state,
            id: id,
            title: title,
            weight: weight,
            description: description,
        })
        onChange(id)
    },[state, id, title, weight, description, isSelected])

    const onCanсelElem = useCallback((e) => {
        e.stopPropagation()
        onCanсel()
    })

    const stopProp = (e) => {
        e.stopPropagation()
    }

    const onSaveElem = useCallback(
        (e) => {
        e.stopPropagation()
        state.isSelected = isSelected
        onSave(state)
        setState({
            id: '',
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
        let newState = {...state, [target.name]: target.value}
        setState(newState)
    }
    

    let goodsListClasses = "GoodsListElement"
    if (isSelected){
        goodsListClasses += " selected"
    }
    let onUpdate = onUpdateID === id ? true : false
    let buttonSet
    if (onUpdate){
        buttonSet= 
        <div className="GoodsListElement_Column GoodsListElement_Button_set">
            <button onClick={onSaveElem}>Save</button>
            <button onClick={onCanсelElem}>Canсel</button>
        </div>
    }else{
        buttonSet=
        <div className="GoodsListElement_Column GoodsListElement_Button_set">
            <button onClick={onChangeElem}>Change</button>
        </div>
    }
    return (
        <div className={goodsListClasses} onClick={onRawClickElem}>
            <div className="GoodsListElement_Column">
                {onUpdate ? 
                <input name='title' onClick={stopProp} onChange={onInputChange} value={state.title}></input> 
                : title}</div>
            <div className="GoodsListElement_Column">
                {onUpdate ? <input name='weight' onChange={onInputChange}  
                onClick={stopProp} value={state.weight}></input> : weight}</div>
            <div className="GoodsListElement_Column GoodsListElement_ColumnDescription">
                {onUpdate ? <input name='description' onChange={onInputChange} 
                onClick={stopProp} value={state.description}></input> : description}</div>
            {buttonSet}
            <div className="GoodsListElement_Column GoodsListElement_Button">
                <button onClick={onDeleteElem}>Delete</button>
            </div>
        </div>
    )
}


// GoodsListElement.propTypes = {
//     good: PropTypes.objectOf(PropTypes.shape({
//         id: PropTypes.string,
//         title: PropTypes.string,
//         weight: PropTypes.number,
//         description: PropTypes.string,
//         isSelected: PropTypes.bool,
//     }))
// }
