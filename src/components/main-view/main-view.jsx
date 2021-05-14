/* Import from packages */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/* Get Components for Routing*/
import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';

/* Get Bootstrap Components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

/* Redux */
import { connect } from 'react-redux';

import { setMovies, setUser } from '../../actions/actions';

/* Get Own Components */
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../register-view/register-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import MoviesList from '../movies-list/movies-list';

/* Get corresponding SCSS file */
import './main-view.scss';

class MainView extends React.Component {

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      /* Make sure to maintain state even if user refreshes page */
      this.props.setUser(JSON.parse(localStorage.getItem('user')));
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    /* Store user data in localStorage */
    localStorage.setItem('user', JSON.stringify(authData.user));
    localStorage.setItem('token', authData.token);

    this.props.setUser(authData.user);
    this.getMovies(localStorage.getItem('token'));
  }

  /* Asynchronously get movies from API */
  getMovies(token) {
    axios.get('https://daniswhoiam-myflix.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        // Assign the result to the state
        this.props.setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  /* Clear state and redirect to home page after logout */
  onLoggedOut() {
    localStorage.clear();
    window.location.href = "/";
    this.props.setUser({});
  }

  render() {
    let { movies, user } = this.props;

    /* Parts to be reused in multiple views */
    const login = <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    const logoutButton = <Row>
      <Col>
        <Button variant="outline-primary" onClick={() => { this.onLoggedOut() }}>Logout</Button>
        <Link to={`/profile/${user.Username}`}>
          <Button variant="link">My Profile</Button>
        </Link>
      </Col>
    </Row>;

    return (
      <Router className="main-view">
        <Row className="justify-content-center">
          <Route exact path="/" render={() => {
            if (!user.Username) return login;
            /* Display empty list while data is fetched from database */
            if (movies.length === 0) return <div />;

            return <MoviesList movies={movies}/>;
          }} />
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user.Username) return login;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user.Username) return login;
            if (movies.length === 0) return <div />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user.Username) return login;
            if (movies.length === 0) return <div />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route exact path="/register" render={() => {
            if (user.Username) return <Redirect to="/" />
            return <Col>
              <RegisterView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          }} />
          <Route path="/profile/:username" render={({ history }) => {
            if (!user.Username) return login;
            return <Col>
              <ProfileView onBackClick={() => history.goBack()} onLoggedOut={() => this.onLoggedOut()} />
            </Col>
          }} />
        </Row>
        {/* Only show logoutButton if user is logged in */}
        {user.Username && logoutButton}
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return { movies: state.movies, user: state.user };
}

MainView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birth: PropTypes.string,
    FavoriteMovies: PropTypes.array
  }).isRequired
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);