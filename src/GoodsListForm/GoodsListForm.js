import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import './GoodsListForm.css';

import { downDropList } from '../Mocks/GoodsMock'

export default function GoodsListForm({ onAdd }) {

    const [form, setForm] = useState({
        title: '',
        weight: '',
        description: '',
        value: 'important',
    })

    const onFormSubmit = useCallback(
        (e) => {
        e.preventDefault()
        if (form.weight === '') {
            alert('you have to put a number in cell description ')
            setForm({
                title: '',
                weight: '',
                description: '',
                value: 'important'
            })
        }
        onAdd(form)
        setForm({
            title: '',
            weight: '',
            description: '',
            value: 'important'
        })
    },
    [onAdd, form]
    )

    const onInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

        const onChangeValue = (e) => {
            setForm({
                ...form,
                value: e.target.value
            })
        }

        const option = downDropList.map(({ id, name, label }) => {
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
                    onSubmit={onFormSubmit}
                >
                    <input
                        type="text"
                        className="GoodsListFormInput"
                        placeholder="Title"
                        name="title"
                        value={form.title}
                        onChange={onInputChange}
                    />
                    <input
                        type="number"
                        className="GoodsListFormInput"
                        placeholder="Weight"
                        name="weight"
                        value={form.weight}
                        onChange={onInputChange}
                    />
                    <input
                        type="text"
                        className="GoodsListFormInput"
                        placeholder="Description"
                        name="description"
                        value={form.description}
                        onChange={onInputChange}
                    />
                    <select name="choose" onChange={onChangeValue}>
                        {option}
                    </select>
                    <button className="GoodsListFormButton">Add</button>
                </form>
            </div>
        )
    }

    GoodsListForm.propTypes = {
        onAdd: PropTypes.func
    }
