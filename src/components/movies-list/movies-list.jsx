/* Import from packages */
import React, { useReducer } from 'react';
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

  let searchBar = <Col md={12} style={{margin: '1em'}}>
    <VisibilityFilterInput visibilityFilter={visibilityFilter} />
  </Col>;

  if (visibilityFilter.term && visibilityFilter.term !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.term.toLowerCase()));
  }

  if (visibilityFilter.favoritesOnly) {
    let relevantMovieArray = filteredMovies || movies;
    filteredMovies = relevantMovieArray.filter(m => props.user.FavoriteMovies.includes(m._id));
  }

  if (!movies) return <div className="main-view"/>;

  if (filteredMovies.length === 0) return(
    <>
      {searchBar}
      <Jumbotron>
        <h1>
          Unfortunately, there is no movie that fits your search term.
        </h1>
        <h2>
          Do you want to search for a different movie?
        </h2>
      </Jumbotron>
    </>
  );

  return <>
    {searchBar}
    {
      filteredMovies.map(movie => (
        <Col md={filteredMovies.length > 2 ? 3 : 12/filteredMovies.length} key={movie._id}>
          <MovieCard movie={movie} />
        </Col>
      ))
    }
  </>;
}

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,

}

export default connect(mapStateToProps)(MoviesList);