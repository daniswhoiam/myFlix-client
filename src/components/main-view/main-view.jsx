import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    } 
  }

  /* When a movie is clicked, this function is invoked and updates the state of the selectedMovie property to that movie */
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://daniswhoiam-myflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        // Assign the result to the state
        this.setState({
          movies: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
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
        <Row>
          <Col>
            <Button variant="outline-primary" onClick={() => {this.onLoggedOut()}}>Logout</Button>
          </Col>
        </Row>
      </div>
    );
  }
}