import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../register-view/register-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
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

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    /* Userdata item as workaround for missing GET userdata endpoint */
    localStorage.setItem('userdata', JSON.stringify(authData.user));
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
    localStorage.clear();
    window.location.href = "/";
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, user } = this.state;

    const login = <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    const logoutButton = <Row>
      <Col>
        <Button variant="outline-primary" onClick={() => { this.onLoggedOut() }}>Logout</Button>
        <Link to={`/profile/${user}`}>
          <Button variant="link">My Profile</Button>
        </Link>
      </Col>
    </Row>;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (!user) return login;
            /* Display empty list while data is fetched from database */
            if (movies.length === 0) return <div />;

            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ));
          }} />
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return login;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return login;
            if (movies.length === 0) return <div />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return login;
            if (movies.length === 0) return <div />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route exact path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegisterView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          }} />
          <Route path="/profile/:username" render={() => {
            if (!user) return login;
            return <Col>
              <ProfileView />
            </Col>
          }} />
        </Row>
        {user && logoutButton}
      </Router>
    );
  }
}