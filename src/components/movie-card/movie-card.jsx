import React from 'react';
import PropTypes from 'prop-types';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return <div className="movie-card" onClick={() => { onMovieClick(movie); }}>{movie.Title}</div>;
  }
}

/* Ensure that props have the right form */
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      Birth: PropTypes.instanceOf(Date).isRequired,
      Death: PropTypes.instanceOf(Date)
    }).isRequired,
    ReleaseYear: PropTypes.number.isRequired,
    Rating: PropTypes.number
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}