import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './GoodsChangeForm.css';

import { downDropList } from '../Mocks/GoodsMock';

export default class GoodsChangeForm extends Component {

    state = {
        title: '',
        weight: '',
        description: '',
        value: 'important',
    };

    onInputChange = ({ target }) => {
        this.setState({
            [target.name]: target.value
        })
    };

    onFormSubmit = (e) => {
        e.preventDefault();
        if(this.state.weight === '') {
            alert('you have to put a number in cell description ')
            return this.setState({
                title: '',
                weight: '',
                description: '',
                value: 'important'
            })
        }
        this.props.onChange(this.state)
        this.setState({
            title: '',
            weight: '',
            description: '',
            value: 'important',
        })
    };

    onChangeValue = ({ target }) => {
        this.setState({
            value: target.value
        })
    };


    render() {
        const { title, weight, description } = this.state;

        const option = downDropList.map(( { id, name, label }) => {
            return (
                <option key={id} value={label}>
                    {name}
                </option>
            );
        })

        if(!this.props.changeId) {
            return <div className="cell"></div>
        }

        return (
            <div className="cell">
                <form className="ChangeForm warning" onSubmit={this.onFormSubmit}>
                    <input
                        type="text"
                        className="ChangeFormItem"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={this.onInputChange}
                    />
                    <input
                        type="number"
                        className="ChangeFormItem"
                        placeholder="Weight"
                        name="weight"
                        value={weight}
                        onChange={this.onInputChange}
                    />
                    <input
                        type="text"
                        className="ChangeFormItem"
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={this.onInputChange}
                    />
                    <select name="choose" onChange={this.onChangeValue}>
                        {option}
                    </select>
                    <button className="ChangeFormButton">Change</button>
                </form>
            </div>
        )
    }
}

GoodsChangeForm.propTypes = {
    changeId: PropTypes.string,
    onChange: PropTypes.func

};