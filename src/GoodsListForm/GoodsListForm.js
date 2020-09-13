import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import './GoodsListForm.css';
import PropTypes from 'prop-types';
import CategorySelect from '../CategorySelect/CategorySelect';
import __ from '../Utils/translationsUtils';
import { validateNumericInput } from '../Utils/goodsUtils';
import { updateItem as updateItemAction, addItem as addItemAction } from '../Store/actions/goodsListElementActions';
import { createSelector } from 'reselect'

import { useHistory, useRouteMatch } from 'react-router-dom';

const GoodsListForm = (props) => {
  const categoryDefault = props.defaultCategory;
  const { item } = props

  const [title, setTitle] = useState(item ? item.title : '');
  const [weight, setWeight] = useState(item ? item.weight : '');
  const [description, setDescription] = useState(item ? item.description : '');
  const [category, setCategory] = useState(item ? item.description : categoryDefault);
  const { addItem, updateItem, isLoading } = props;

  const history = useHistory()

  useEffect(() => {
    if(item) {
      setTitle(item.title)
      setWeight(item.weight)
      setDescription(item.description)
      setCategory(item.categories)
    }
  }, [item])

  const onFormSubmit = useCallback((e) => {
    e.preventDefault();
    if(item) {
      updateItem({ ...item, title, weight, description, category }).then(() => {
        history.push('/list');
        setTitle('');
        setWeight('');
        setDescription('');
      })
    } else {
      addItem({ title, weight, description, category }).then(() => {
        history.push('/list');
        setTitle('');
        setWeight('');
        setDescription('');
      })
    }

  }, [item, title, weight, description, category, addItem, updateItem]);

  const onInputChange = useCallback(({target}) => {
    let setter;
    switch (target.name) {
      case 'title':
        setter = setTitle;
        break;
      case 'description':
        setter = setDescription;
        break;
      case 'category':
        setter = setCategory;
        break;
      default:
        break;
    }

    if (typeof setter !== 'function') return;
    setter(target.value);
  }, []);

  const onWeightChange = useCallback(({ target }) => {
    const value = target.value.replace(',', '.');

    if (!validateNumericInput(value)) {
      return;
    }

    setWeight(value);
  }, []);

  return (
    <div>
      <form
        className="GoodsListForm"
        onSubmit={ onFormSubmit }
      >
        <input
          type="text"
          className="GoodsListFormInput"
          placeholder={ __('Title') }
          name="title"
          value={ title }
          onChange={ onInputChange }
        />
        <input
          type="number"
          className="GoodsListFormInput"
          placeholder={ __('Weight') }
          name="weight"
          value={ weight }
          onChange={ onWeightChange }
        />
        <input
          type="text"
          className="GoodsListFormInput"
          placeholder={ __('Description') }
          name="description"
          value={ description }
          onChange={ onInputChange }
        />

        <CategorySelect
          onChange={ onInputChange }
          defaultValue={ category }
          categories={ props.categories }
        />

        {!isLoading && <button className="GoodsListFormButton">{ item ? __('Save') :  __('Add') }</button>}
      </form>
    </div>
  );
};

const items = (state, props) => state.goods
const itemId = (state, props) => props.itemId


const findItem = createSelector(
  [ items, itemId ],
  (items, itemId) => {
    console.log('COMPUTING')
    return items.find((e) => itemId === e.id)
  }
)

GoodsListForm.propTypes = {
  addItem: PropTypes.func,
  categories: PropTypes.array,
  defaultCategory: PropTypes.string,
};

const mapStateToProps = (state, props) => {
  console.log('SOMETHING CHANGED')
  return {
    item: findItem(state, props),
    isLoading: state.addItemLoading,
    error: state.addItemError
  }
}

export default connect(mapStateToProps, { addItem: addItemAction, updateItem: updateItemAction })(GoodsListForm);
