import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './GoodsChangeForm.css';

import * as formChangeActions from '../Store/actions/formChangeActions';
import * as goodsActions from '../Store/actions/goodsActions';

const GoodsChangeForm = (props) => {

    const { title, weight, description } = props.changeForm;

    const onInputChange = (e) => {
        props.formChangeActions.changeForm({
            [e.target.name]: e.target.value
        })
    }

    const onFormSubmit = useCallback(
        (e) => {
            e.preventDefault()
            if (weight === '') {
                alert('you have to put a number in cell description ')
                return props.formChangeActions.clearForm()
            }
            props.goodsActions.onChange(props.changeForm)
        },
        [ props.formChangeActions, props.goodsActions, props.changeForm, weight]
    )

    const onChangeValue = (e) => {
        props.formChangeActions.changeForm({
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
    if (!props.goods.changeId) {
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
                    value={title}
                    onChange={onInputChange}
                />
                <input
                    type="number"
                    className="ChangeFormItem"
                    placeholder="Weight"
                    name="weight"
                    value={weight}
                    onChange={onInputChange}
                />
                <input
                    type="text"
                    className="ChangeFormItem"
                    placeholder="Description"
                    name="description"
                    value={description}
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

const mapStateToProps = state => {
    return {
        changeForm: state.changeForm,
        downDropList: state.downDropList.downDropList,
        goods: state.goods
    }
}

const mapDispatchToProps = dispatch => {
    return {
        formChangeActions: bindActionCreators(formChangeActions, dispatch),
        goodsActions: bindActionCreators(goodsActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodsChangeForm)