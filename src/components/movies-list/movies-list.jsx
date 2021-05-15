/* Import from packages */
import React from 'react';
import PropTypes from 'prop-types';

/* Get Bootstrap Components */
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

/* Redux */
import { connect } from 'react-redux';

/* Get Own Components */
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import MovieCard from '../movie-card/movie-card';

/* Get corresponding SCSS file */
import './movies-list.scss';

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view"/>;

  return <>
    <Col md={12} style={{margin: '1em'}}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    {filteredMovies.length > 0 ? 
      filteredMovies.map(movie => (
        <Col md={3} key={movie._id}>
          <MovieCard movie={movie} />
        </Col>
      ))
      :
      <Jumbotron>
        <h1>
          Unfortunately, there is no movie that fits your search term.
        </h1>
        <h2>
          Do you want to search for a different movie?
        </h2>
      </Jumbotron>
    }
  </>;
}

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(MoviesList);