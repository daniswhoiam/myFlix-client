/* Import from packages */
import React from 'react';
import PropTypes from 'prop-types';
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
              <span className="value">{movie.Director.Name}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-genre">
              <span className="label">Genre: </span>
              <span className="value">{movie.Genre.Name}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => { onBackClick(null); }}>Back</Button>
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