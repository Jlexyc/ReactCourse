import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './GoodsListForm.css';

import * as formActions from '../Store/actions/formActions';
import * as goodsActions from '../Store/actions/goodsActions';

const GoodsListForm = (props) => {

    const { title, weight, description } = props.form;

    const onFormSubmit = useCallback(
        (e) => {
            e.preventDefault()
            if (weight === '') {
                alert('you have to put a number in cell description ')
                return props.formActions.clearForm()
            }
            props.goodsActions.addItem(props.form)
        },
        [props.form, props.formActions, props.goodsActions, weight]
    )

    const onInputChange = (e) => {
        props.formActions.updateForm({
            [e.target.name]: e.target.value
        })
    }

    const onChangeValue = (e) => {
        props.formActions.updateForm({
            value: e.target.value
        })
    }

    const option = props.downDropList.map(({ id, name, label }) => {
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
                    value={title}
                    onChange={onInputChange}
                />
                <input
                    type="number"
                    className="GoodsListFormInput"
                    placeholder="Weight"
                    name="weight"
                    value={weight}
                    onChange={onInputChange}
                />
                <input
                    type="text"
                    className="GoodsListFormInput"
                    placeholder="Description"
                    name="description"
                    value={description}
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

const mapStateToProps = state => {
    return {
        form: state.form,
        downDropList: state.downDropList.downDropList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        formActions: bindActionCreators(formActions, dispatch),
        goodsActions: bindActionCreators(goodsActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsListForm)


