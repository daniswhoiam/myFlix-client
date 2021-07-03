import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER } from '../actions/actions';

/* Reducer for visibilityFilter */
function visibilityFilter(state = { term: '', favoritesOnly: false }, action) {
  switch (action.type) {
    case SET_FILTER:
      /* If a search term is being written, update without influence on favorite switch */
      if ('term' in action.value) {
        let { favoritesOnly } = state;
        return {
          term: action.value.term,
          favoritesOnly: favoritesOnly
        }
      /* If favorite switch is being used, update without influence on current search term */
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

/* Reducer for movies */
function movies(state = [], action) {
  switch(action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

/* Reducer for user */
function user(state = {}, action) {
  switch(action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

/* Combine reducers */
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user
});

/* Export combined reducers */
export default moviesApp;