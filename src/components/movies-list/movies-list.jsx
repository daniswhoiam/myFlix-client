/* Import from packages */
import React from 'react';

/* Get Bootstrap Components */
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';

/* Redux */
import { useSelector } from 'react-redux';

/* Get Own Components */
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import MovieCard from '../movie-card/movie-card';

/* Get corresponding SCSS file */
import './movies-list.scss';

function MoviesList() {;
  /* Make state available to component */
  const { visibilityFilter, movies, user } = useSelector(state => state);

  /* All movies as initial value if no filter is being used */
  let filteredMovies = movies;

  /* Searchbar that is rendered in all scenarios */
  let searchBar = <Col md={12} style={{ margin: '1em' }}>
    <VisibilityFilterInput />
  </Col>;

  /* Filter movies that match the search term */
  if (visibilityFilter.term && visibilityFilter.term !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.term.toLowerCase()));
  }

  /* Filter movies that are favorites of the user upon request */
  if (visibilityFilter.favoritesOnly) {
    filteredMovies = filteredMovies.filter(m => user.FavoriteMovies.includes(m._id));
  }

  /* Display nothing while fetching from server */
  if (!movies) return <div className="main-view" />;

  /* Display message when filter returns no movies */
  if (filteredMovies.length === 0) return (
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

  /* Display movies that match filter criteria */
  return <>
    {searchBar}
    {
      filteredMovies.map(movie => (
        /* Render column differently based on number of movies to display */
        <Col md={filteredMovies.length > 2 ? 3 : 12 / filteredMovies.length} key={movie._id}>
          <MovieCard movie={movie} />
        </Col>
      ))
    }
  </>;
}

export default MoviesList;