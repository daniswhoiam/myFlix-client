/* Import from packages */
import React from 'react';
import PropTypes from 'prop-types';

/* Get Components for Routing*/
import { Link } from 'react-router-dom';

/* Get Bootstrap Components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

/* Import SCSS */
import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <div className="movie-poster">
              <img src={movie.ImagePath} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-director">
              <span className="label">Director: </span>
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="link">{movie.Director.Name}</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-genre">
              <span className="label">Genre: </span>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="link">{movie.Genre.Name}</Button>
              </Link>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => { onBackClick(); }}>Back</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
  }
}

/* Ensure that props have the right form */
MovieView.propTypes = {
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
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
}