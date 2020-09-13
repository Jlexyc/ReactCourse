import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CategorySelect from '../CategorySelect/CategorySelect';
import { getCategory } from '../Utils/categoriesUtils';
import __ from '../Utils/translationsUtils';
import { validateNumericInput } from '../Utils/goodsUtils';
import * as actions from '../Store/actions/goodsListElementActions';
import './GoodsListElement.css';
import { removeItem } from '../Resources/goods'
import { useHistory } from 'react-router-dom';

const GoodsListElement = (props) => {
  const { item, updateItem, deleteItem, setItemSelected, unsetItemSelected,
    selected, categories } = props;
  const { id, title, weight, description, category = 'uncategorized' } = item;
  const [editing, setEditing] = useState(false);
  const [titleState, setTitle] = useState(title);
  const [weightState, setWeight] = useState(weight);
  const [descriptionState, setDescription] = useState(description);
  const [categoryState, setCategory] = useState(category);

  const toggleFunc = selected ? unsetItemSelected : setItemSelected;

  const history = useHistory()

  const onElementEdit = useCallback((e) => {
    e.stopPropagation();
    history.push('/create/' + id)
  }, []);

  const onInputChange = useCallback(({ target }) => {
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

  const onElementSave = useCallback((e) => {
    e.stopPropagation();
    setEditing(false);
    updateItem(id, {
      title: titleState,
      weight: weightState,
      description: descriptionState,
      category: categoryState,
    });
  }, [
    id,
    titleState,
    weightState,
    descriptionState,
    categoryState,
    updateItem,
  ]);

  const onElementDelete = useCallback((e) => {
    e.stopPropagation();
    removeItem(id).then((res) => {
      console.log('res: ', res)
      if(res.success) {
        deleteItem(id)
      } else {
        alert('BAD', 'Very Bad')
      }
    })
  }, [id]);

  const onElementToggle = useCallback(() => {
    if (!editing) {
      toggleFunc(id);
    }
  }, [editing, toggleFunc, id]);

  const onRowAction = useCallback((e) => {
      onElementEdit(e);
  }, [editing, onElementSave, onElementEdit]);

  const elementClassName = selected ?
    'GoodsListElement isSelected' : 'GoodsListElement';
  const titleColumnContent = editing ?
    <input type="text"
      defaultValue={ title }
      name="title"
      onChange={ onInputChange }
    /> :
    title;
  const weightColumnContent = editing ?
    <input type="number"
      defaultValue={ weight }
      name="weight"
      onChange={ onWeightChange }
    /> :
    weight;
  const descriptionColumnContent = editing ?
    <input type="text"
      defaultValue={ description }
      name="description"
      onChange={ onInputChange }
    /> :
    description;
  const categoryColumnContent = editing ?
    <CategorySelect
      categories={ categories }
      defaultValue={ category }
      onChange={ onInputChange }
    /> :
    getCategory(category, 'slug', categories)?.name;

  return (
    <div className={ elementClassName } onClick={ onElementToggle }>
      <div className="GoodsListElement_Column">{ titleColumnContent }</div>
      <div className="GoodsListElement_Column">{ weightColumnContent }</div>
      <div className={ 'GoodsListElement_Column ' +
        'GoodsListElement_ColumnDescription' }>
        { descriptionColumnContent }
      </div>
      <div className="GoodsListElement_Column">{ categoryColumnContent }</div>
      <div className="GoodsListElement_Column GoodsListElement_Button">
        <button onClick={ onRowAction }>
          { __(editing ? 'Save' : 'Edit' ) }
        </button>
        <button onClick={ onElementDelete }>{ __('Delete') }</button>
      </div>
    </div>
  );
};

GoodsListElement.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    weight: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
  }),
  categories: PropTypes.array,
  selected: PropTypes.bool,
  updateItem: PropTypes.func,
  deleteItem: PropTypes.func,
  setItemSelected: PropTypes.func,
  unsetItemSelected: PropTypes.func,
};

export default connect(null, actions)(GoodsListElement);
