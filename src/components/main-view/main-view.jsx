import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    }
  }

  /* After component is loaded get movie data */
  componentDidMount() {
    axios.get('https://daniswhoiam-myflix.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /* When a movie is clicked, this function is invoked and updates the state of the selectedMovie property to that movie */
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the user property in state to that particular user */
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user } = this.state;

    /* If there is no user, the LoginView is rendered, */
    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    /* Display empty list while data is fetched from database */
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        <Row className="justify-content-md-center">
        {selectedMovie ? 
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          : movies.map(movie =>
            <Col key={movie._id} md={3}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={movie => { this.setSelectedMovie(movie); }} />
            </Col>
          )
        }
        </Row>
      </div>
    );
  }
}