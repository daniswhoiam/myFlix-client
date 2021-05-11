/* Import from packages */
import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

/* Import SCSS */
import './director-view.scss';

export function DirectorView(props) {
  return (
    <Row>
      <Col>
        <h1>{props.director.Name}</h1>
        <div className="director-birthday">
          <span className="label">Birthday: </span>
          <span className="value">{props.director.Birth.substring(0, 10)}</span>
        </div>
        <div className="director-death">
          <span className="label">Death: </span>
          <span className="value">{props.director.Death || "-"}</span>
        </div>
        <p>{props.director.Bio}</p>
        <Button onClick={() => { props.onBackClick(); }}>Back</Button>
      </Col>
    </Row>
  );
}

/* Ensure that props have the right form */
DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string,
    Birth: PropTypes.string,
    Death: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
}