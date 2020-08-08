import React, { Component } from 'react'
import './GoodsListElement.css'

export default class GoodsListElement extends Component {

    state = {
        id: '',
        title: '',
        weight: '',
        description: '',
        isSelected: false,
    }


    onDelete = (e) => {
        e.stopPropagation()
        this.props.onDelete(this.props.good.id)
    }

    onRawClick = (e) => {
        
        this.props.onRawClick(this.props.good.id)
    }

    onChange = (e) => {
        e.stopPropagation()
        const {id, title, weight, description} =  this.props.good
        this.setState({
            id: id,
            title: title,
            weight: weight,
            description: description,
        })
        this.props.onChange(this.props.good.id)
    }

    onCanсel = (e) => {
        e.stopPropagation()
        this.props.onCanсel()
    }

    stopProp = (e) => {
        e.stopPropagation()
    }

    onSave = (e) => {
        e.stopPropagation()
        this.state.isSelected = this.props.good.isSelected
        this.props.onSave(this.state)
        this.setState({
            id: '',
            title: '',
            weight: '',
            description: '',
            isSelected: false,
        })
    }

    onInputChange = ({ target }) => {
        if (target.name == 'weight'){
            const float_re = /^\d+\.?(\d+)?$/
            if (!float_re.test(target.value)){
                target.value = this.state.weight
            }
        }
        this.setState({
            [target.name]: target.value
        })
    }
    

    render() {
        const { id, title, weight, description, isSelected } = this.props.good
        const title_inp = this.state.title
        const weight_inp = this.state.weight
        const description_inp = this.state.description
        const { onUpdateID } = this.props

        let goodsListClasses = "GoodsListElement"
        if (isSelected){
            goodsListClasses += " selected"
        }

        let onUpdate = onUpdateID === id ? true : false
        let buttonSet
        if (onUpdate){
            buttonSet= 
            <div className="GoodsListElement_Column GoodsListElement_Button_set">
                <button onClick={this.onSave}>Save</button>
                <button onClick={this.onCanсel}>Canсel</button>
            </div>
        }else{
            buttonSet=
            <div className="GoodsListElement_Column GoodsListElement_Button_set">
                <button onClick={this.onChange}>Change</button>
            </div>
        }
        return (
            <div className={goodsListClasses} onClick={this.onRawClick}>
                <div className="GoodsListElement_Column">
                    {onUpdate ? 
                    <input name='title' onClick={this.stopProp} onChange={this.onInputChange} value={title_inp}></input> 
                    : title}</div>
                <div className="GoodsListElement_Column">
                    {onUpdate ? <input name='weight' onChange={this.onInputChange}  
                    onClick={this.stopProp} value={weight_inp}></input> : weight}</div>
                <div className="GoodsListElement_Column GoodsListElement_ColumnDescription">
                    {onUpdate ? <input name='description' onChange={this.onInputChange} 
                    onClick={this.stopProp} value={description_inp}></input> : description}</div>
                {buttonSet}
                <div className="GoodsListElement_Column GoodsListElement_Button">
                    <button onClick={this.onDelete}>Delete</button>
                </div>
            </div>
        )
    }
}
