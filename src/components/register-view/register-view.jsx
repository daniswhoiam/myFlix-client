/* Import from packages */
import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './register-view.scss';

export function RegisterView(props) {
  /* Initialize necessary state variables  */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

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
        /* const data = res.data;
        window.open('/', '_self'); */
        loginAfterRegister(username, password);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const loginAfterRegister = (user, pw) => {
    axios.post('https://daniswhoiam-myflix.herokuapp.com/login', {
      Username: user,
      Password: pw
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(() => {
        console.log('Something went wrong with the log-in.');
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
        <Link to={"/"}>
          <Button variant="outline-secondary">Back to Log-In</Button>
        </Link>
      </Col>
    </Row>

  );
}
