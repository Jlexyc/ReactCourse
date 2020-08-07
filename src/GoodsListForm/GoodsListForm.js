import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

import './GoodsListForm.css';

import { downDropList } from '../Mocks/GoodsMock'

export default class GoodsListForm extends Component {

    state = {
        title: '',
        weight: '',
        description: '',
        value: 'important',
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        if(this.state.weight === '') {
            alert('you have to put a number in cell description ')
            return this.setState({
                title: '',
                weight: '',
                description: '',
                value: 'important'
            })
        }
        this.props.onAdd(this.state)
        this.setState({
            title: '',
            weight: '',
            description: '',
            value: 'important'
        })
    }

    onInputChange = ({ target }) => {
        this.setState({
            [target.name]: target.value

        })
    }

    onChangeValue = ({ target }) => {
        this.setState({
            value: target.value
        })
    };

    render() {
        const { title, weight, description } = this.state

        const option = downDropList.map(( { id, name, label }) => {
            return (
                <option key={id} value={label}>
                    {name}
                </option>
            );
        })

        return (
            <div className="cell">
                <form 
                    className="GoodsListForm" 
                    onSubmit={this.onFormSubmit}
                >
                    <input 
                        type="text"
                        className="GoodsListFormInput" 
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={this.onInputChange}
                    />
                    <input 
                        type="number"
                        className="GoodsListFormInput" 
                        placeholder="Weight"
                        name="weight"
                        value={weight}
                        onChange={this.onInputChange}
                    />
                    <input 
                        type="text"
                        className="GoodsListFormInput" 
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={this.onInputChange}
                    />
                    <select name="choose" onChange={this.onChangeValue}> 
                        {option}
                    </select>
                    <button className="GoodsListFormButton">Add</button>
                </form>
            </div>
        )
    }
}

GoodsListForm.propTypes = {
    onAdd: PropTypes.func
};
