import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER } from '../actions/actions';

function visibilityFilter(state = { term: '', favoritesOnly: false }, action) {
  switch (action.type) {
    case SET_FILTER:
      if ('term' in action.value) {
        let { favoritesOnly } = state;
        return {
          term: action.value.term,
          favoritesOnly: favoritesOnly
        }
      } else if ('favoritesOnly' in action.value) {
        let { term } = state;
        return {
          term: term,
          favoritesOnly: action.value.favoritesOnly
        }
      }
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch(action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = {}, action) {
  switch(action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user
});

export default moviesApp;