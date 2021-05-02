import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

export class MovieCard extends React.Component {

  constructor() {
    super();
    this.state = {
      readMore: false,
      maxTextLength: 100
    };
  }

  setReadMore(bool) {
    this.setState({
      readMore: bool
    });
  }

  render() {
    const { movie } = this.props;
    const { readMore, maxTextLength } = this.state;

    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
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