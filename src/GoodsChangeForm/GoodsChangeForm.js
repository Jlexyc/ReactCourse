import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import './GoodsChangeForm.css';

import { downDropList } from '../Mocks/GoodsMock';

export default function GoodsChangeForm({ changeId, onChange }) {

    const [form, setForm] = useState({
        title: '',
        weight: '',
        description: '',
        value: 'important'
    })

    const onInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onFormSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (form.weight === '') {
                alert('you have to put a number in cell description ')
                setForm({
                    title: '',
                    weight: '',
                    description: '',
                    value: 'important'
                })
            }
            onChange(form)
            setForm({
                title: '',
                weight: '',
                description: '',
                value: 'important',
            })
        },
        [onChange, form ],
    )

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

    if (!changeId) {
        return <div className="cell"></div>
    }

    return (
        <div className="cell">
            <form className="ChangeForm warning" onSubmit={onFormSubmit}>
                <input
                    type="text"
                    className="ChangeFormItem"
                    placeholder="Title"
                    name="title"
                    value={form.title}
                    onChange={onInputChange}
                />
                <input
                    type="number"
                    className="ChangeFormItem"
                    placeholder="Weight"
                    name="weight"
                    value={form.weight}
                    onChange={onInputChange}
                />
                <input
                    type="text"
                    className="ChangeFormItem"
                    placeholder="Description"
                    name="description"
                    value={form.description}
                    onChange={onInputChange}
                />
                <select name="choose" onChange={onChangeValue}>
                    {option}
                </select>
                <button className="ChangeFormButton">Change</button>
            </form>
        </div>
    )

}

GoodsChangeForm.propTypes = {
    changeId: PropTypes.string,
    onChange: PropTypes.func

};