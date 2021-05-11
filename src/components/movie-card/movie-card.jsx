/* Import from packages */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/* Get Components for Routing*/
import { Link } from 'react-router-dom';

/* Get Bootstrap Components */
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

/* Import SCSS */
import './movie-card.scss';

export class MovieCard extends React.Component {

  constructor() {
    super();
    this.state = {
      /* Make whole text readable if necessary */
      readMore: false,
      /* Make cards have the same size */
      maxTextLength: 100,
      /* Show whether movie is favorited */
      favorited: false
    };
  }

  componentDidMount() {
    /* If the movie was favorited by the user, show it */
    const favoriteMovies = JSON.parse(localStorage.getItem('userdata')).FavoriteMovies;
    if (favoriteMovies) {
      const favoritedState = favoriteMovies.includes(this.props.movie._id);
      this.setState({ favorited: favoritedState });
    }
  }

  setReadMore(bool) {
    this.setState({
      readMore: bool
    });
  }

  /* Enable user to easily (un)favorite a movie -> toggle depending on current state*/ 
  updateFavoriteMovieData(currentState) {
    this.handleFavoriteMovieRequest(currentState)
      .then(res => {
        /* If request was successful, update user data in localStorage and state of this movie */
        localStorage.setItem('userdata', JSON.stringify(res.data));
        this.setState({ favorited: !currentState });
      })
      .catch(err => {
        console.log(err);
      });
  }

  /* Request is separate because rest of the (un)favorite process is the same */
  handleFavoriteMovieRequest(currentState) {
    return currentState ?
      axios.delete(
        `https://daniswhoiam-myflix.herokuapp.com/users/${localStorage.getItem('user')}/movies/${this.props.movie._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      :
      axios.patch(
        `https://daniswhoiam-myflix.herokuapp.com/users/${localStorage.getItem('user')}/movies/${this.props.movie._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
  }

  render() {
    const { movie } = this.props;
    const { readMore, maxTextLength, favorited } = this.state;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          {/* Handle how much text is being shown */}
          {
            readMore ?
              <Card.Text>
                {movie.Description}
                <br />
                <Button type="button" variant="link" onClick={() => this.setReadMore(false)}>Read Less &lt;&lt;</Button>
              </Card.Text>
              :
              <Card.Text>
                {movie.Description.substr(0, maxTextLength).concat('...')}
                <br />
                <Button type="button" variant="link" onClick={() => this.setReadMore(true)}>Read more &gt;&gt;</Button>
              </Card.Text>
          }
          <Link to={`/movies/${movie._id}`}>
            <Button className="movie-view-link" variant="primary">Open</Button>
          </Link>
          {/* Display whether movie is favorited or not */}
          {
            favorited ?
              <div className="starOn" onClick={() => this.updateFavoriteMovieData(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <polygon points="12,3 6,21 21,9 3,9 18,21" />
                </svg>
              </div>
              :
              <div className="starOff" onClick={() => this.updateFavoriteMovieData(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <polygon points="12,3 6,21 21,9 3,9 18,21" />
                </svg>
              </div>
          }
        </Card.Body>
      </Card>
    );
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
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    }).isRequired,
    ReleaseYear: PropTypes.string.isRequired,
    Rating: PropTypes.string
  }).isRequired
}