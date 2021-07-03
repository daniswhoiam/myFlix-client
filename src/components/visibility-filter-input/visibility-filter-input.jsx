/* Import from packages */
import React from 'react';

/* Get Bootstrap Components */
import Form from 'react-bootstrap/Form';

/* Redux */
import { useSelector, useDispatch } from 'react-redux';

import { setFilter } from '../../actions/actions';

/* Get corresponding SCSS file */
import './visibility-filter-input.scss';

function VisibilityFilterInput() {
  const visibilityFilter = useSelector(state => state.visibilityFilter);
  const dispatch = useDispatch();

  return (
    <div className="filter-form">
      {/* Search input field */}
      <Form.Control
        onChange={e => dispatch(setFilter({ term: e.target.value }))}
        value={visibilityFilter.term}
        placeholder="Search for a movie..."
      />

      {/* Search icon */}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
      </svg>

      {/* Switch to show favorited movies only */}
      <Form.Check
        type="switch"
        id="switch"
        label="Show my favorite movies only"
        onChange={e => dispatch(setFilter({ favoritesOnly: e.target.checked }))}
      />
    </div>
  );
}


export default VisibilityFilterInput;