/* Import from packages */
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './register-view.scss';

export function RegisterView(props) {
  /* Initialize necessary state variables  */
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  /* Function to send data to server to register */
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://daniswhoiam-myflix.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birth: birthday
    })
    .then(res => {
      console.log(res);
      /* Temporary Solution to log-in user immediately*/
      props.onLoggedIn(res.data.Username);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <Row>
      <Col className="form-holder">
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>E-Mail Address:</Form.Label>
            <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date of Birth:</Form.Label>
            <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
          </Form.Group>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
        <Button variant="outline-secondary" onClick={() => props.setRegistration(false)}>Back to Log-In</Button>
      </Col>
    </Row>
   
  );
}

/* Ensure that props have the right form */
RegisterView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}