/* Import from packages */
import React from 'react';
import PropTypes from 'prop-types';

/* Get Bootstrap Components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

/* Import SCSS */
import './genre-view.scss';

export function GenreView(props) {
  return (
    <Row>
      <Col>
        <h1>{props.genre.Name}</h1>
        <p>{props.genre.Description}</p>
        <Button onClick={() => { props.onBackClick(); }}>Back</Button>
      </Col>
    </Row>
  );
}

/* Ensure that props have the right form */
GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
}