import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
  Redirect
} from "react-router-dom";

import GoodsList from '../GoodsList/GoodsList';
import GoodsListForm from '../GoodsListForm/GoodsListForm';
import __ from '../Utils/translationsUtils';
import { deleteSelected } from '../Store/actions/goodsListElementActions';
import { getGoods } from '../Resources/goods'
import * as actions from '../Store/actions/goodsListElementActions';

import './App.css';
import About from '../About/About';

const App = (props) => {
  const { total, subtotal, selectedItems, deleteSelected } = props;

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actions.getGoods())
  }, [])

  return (
    <BrowserRouter>
      <div className="Container">
        <div className="Menu">
          <div className="MenuItem">
            <Link to="/list">List</Link>
          </div>
          <div className="MenuItem">
            <Link to="/create">Create</Link>
          </div>
          <div className="MenuItem">
            <Link to="/about">About</Link>
          </div>
          <div className="MenuItem">
            <Link to="/help">Help</Link>
          </div>
        </div>
        <div className="Title">{ __('Fridge') }</div>
        <Switch>
          <Route exact path='/'>
            <Redirect to={{ pathname: '/list'}} />
          </Route>
          <Route path='/list'>
            <div>
              <GoodsList />
              <div className="Total">
                <div>{__('Total')}:</div>
                <div>{total}</div>
                <div>
                  { !!subtotal && `${ __('SubTotal') }: ${subtotal}`}
                </div>
              </div>
            </div>
          </Route>
          
          { !!selectedItems.length && (
            <button onClick={ deleteSelected }>
              { __('Delete Selected') }
            </button>
          ) }
          <Route exact path='/create'>
            <GoodsListForm />
          </Route>
          <Route path='/create/:id'
                 render={({ match }) => {
                   return <GoodsListForm itemId={match.params.id}/>
                 }}
          />
          <Route path='/about'>
            <About />
          </Route>
          <Route path='*'>
            <div>Sorry, page not found. 404</div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

App.propTypes = {
  total: PropTypes.number,
  subtotal: PropTypes.number,
  selectedItems: PropTypes.array,
  deleteSelected: PropTypes.func,
};

const mapStateToProps = ({ total, subtotal, selectedItems }) => {
  return { total, subtotal, selectedItems };
};

export default connect(mapStateToProps, { deleteSelected, getGoods })(App);
