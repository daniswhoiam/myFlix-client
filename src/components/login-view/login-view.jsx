/* Import from packages */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/* Import own views */
import { RegisterView } from '../register-view/register-view';

/* Import SCSS */
import './login-view.scss';
import axios from 'axios';

export function LoginView(props) {
  /* Initialize necessary state variables  */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [registration, setRegistration] = useState(false);

  /* Function for sending the credentials to verify */
  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://daniswhoiam-myflix.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(() => {
        console.log('Something went wrong with the log-in.');
      });
  };

  /* If someone wants to register, display registration form. Also enable immediate log-in after valid registration. (Temporary Implementation) */
  if (registration) return <RegisterView onLoggedIn={props.onLoggedIn} setRegistration={setRegistration} />;

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
          <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
        </Form>
        <Button variant="outline-secondary" onClick={() => setRegistration(true)}>No account yet? Click here to register</Button>
      </Col>
    </Row>
  );
}

/* Ensure that props have the right form */
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}