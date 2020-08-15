import React, {Component} from 'react';
import { connect } from 'react-redux'
import './GoodsListForm.css';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux'

import CategorySelect from '../CategoriesSelect/CategorySelect';
import __ from '../Utils/translationsUtils';
import { validateNumericInput } from '../Utils/goodsUtils';
import * as formActions from '../Store/actions/formActions';
import * as goodsActions from '../Store/actions/goodsActions';


class GoodsListForm extends Component {
  constructor(props) {
    super(props);
    
    this.onFormSubmit = (e) => {
      e.preventDefault();
      this.props.goodsActions.addItem(this.props.form)
    };

    this.onInputChange = ({target}) => {
      this.props.formActions.updateForm({
        [target.name]: target.value,
      })
    };

    this.onWeightChange = ({ target }) => {
      const value = target.value.replace(',', '.');
      if (!validateNumericInput(value)) {
        return;
      }
      this.props.formActions.updateForm({
        [target.name]: value,
      })
    };
  }

  render() {
    console.log('this.props: ', this.props)
    const {title, weight, description} = this.props.form;
    return (
      <div>
        <form
          className="GoodsListForm"
          onSubmit={this.onFormSubmit}
        >
          <input
            type="text"
            className="GoodsListFormInput"
            placeholder={ __('Title') }
            name="title"
            value={title}
            onChange={this.onInputChange}
          />
          <input
            type="number"
            className="GoodsListFormInput"
            placeholder={ __('Weight') }
            name="weight"
            value={weight}
            onChange={this.onWeightChange}
          />
          <input
            type="text"
            className="GoodsListFormInput"
            placeholder={ __('Description') }
            name="description"
            value={description}
            onChange={this.onInputChange}
          />

          <CategorySelect
            onChange={ this.onInputChange }
            categories={ this.props.categories }
          />

          <button className="GoodsListFormButton">{ __('Add') }</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('REDUX STATE: ', state)
  return {
    form: state.form,
    categories: state.categories.list,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    formActions: bindActionCreators(formActions, dispatch),
    goodsActions: bindActionCreators(goodsActions, dispatch),
  }
}

GoodsListForm.propTypes = {
  onAdd: PropTypes.func,
  categories: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(GoodsListForm)