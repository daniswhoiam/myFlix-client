/* Import from packages */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/* Get Components for Routing*/
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

/* Get Bootstrap Components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
import { NavbarHeader } from '../navbar-header/navbar-header';

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

    /* Initiate user and movie states */
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

    /* Part to be reused in multiple views */
    const login = <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

    return (
      <Router className="main-view">

        {/* Header - displayed in all pages besides login and registration */}
        <NavbarHeader onLoggedOut={() => this.onLoggedOut()} />

        <Row className="justify-content-center main-row">
          {/* Main Page / Movie List */}
          <Route exact path="/" render={() => {
            if (!user.Username) return login;
            /* Display empty list while data is fetched from database */
            if (movies.length === 0) return <div />;

            return <MoviesList />;
          }} />

          {/* View of singular movie */}
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user.Username) return login;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* View of singular director */}
          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user.Username) return login;
            if (movies.length === 0) return <div />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* View of singular genre */}
          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user.Username) return login;
            if (movies.length === 0) return <div />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          {/* Registration view */}
          <Route exact path="/register" render={() => {
            if (user.Username) return <Redirect to="/" />;
            return <Col>
              <RegisterView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          }} />

          {/* Profile view */}
          <Route path="/profile/:username" render={({ match, history }) => {
            if (!user.Username) return login;
            /* Do not allow URL with other usernames */
            if (match.params.username !== user.Username) return <Redirect to={`/profile/${user.Username}`} />;
            return <Col>
              <ProfileView onBackClick={() => history.goBack()} onLoggedOut={() => this.onLoggedOut()} />
            </Col>
          }} />
        </Row>

        {/* Footer - displayed in all pages */}
        <Row className="footer-row">
          <Col>
            <p className="footer-text">
              Made with <i className="bi bi-suit-heart-fill"></i> by @daniswhoiam
            </p>
            <div className="social-icons">
              {/* GitHub Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                <a href="https://github.com/daniswhoiam/" aria-label="GitHub Link" target="_blank">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
                </a>
              </svg>
              {/* LinkedIn Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                <a href="https://www.linkedin.com/in/daniil-belazovschi/" aria-label="LinkedIn Link" target="_blank">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </a>
              </svg>
            </div>
          </Col>
        </Row>
      </Router>
    );
  }
}

/* Provide state to component as a prop */
const mapStateToProps = state => {
  return { movies: state.movies, user: state.user };
};

/* Ensure that props have the right form */
MainView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string,
    Password: PropTypes.string,
    Email: PropTypes.string,
    Birth: PropTypes.string,
    FavoriteMovies: PropTypes.array
  }).isRequired,
  setMovies: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
}

/* Connect component with store and export */
export default connect(mapStateToProps, { setMovies, setUser })(MainView);