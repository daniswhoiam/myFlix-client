/* Import from packages */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

/* Import SCSS */
import './login-view.scss';

export function LoginView(props) {
  /* Initialize necessary state variables  */
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [lastChanged, setLastChanged] = useState('');

  useEffect(() => {
    if (lastChanged) {
      const newErrors = checkFormValidity();

      setErrors({
        ...errors,
        [lastChanged]: newErrors[lastChanged]
      });
    }
  }, [lastChanged, form]);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    });

    setLastChanged(field);
  }

  const checkFormValidity = () => {
    const { username, password } = form;
    const newErrors = {};

    if (!username || username === '') newErrors.username = 'Please enter your username.';

    if (!password || password === '') newErrors.password = 'Please enter your password.';

    return newErrors;
  }

  /* Function for sending the credentials to verify */
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = checkFormValidity();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    /* Send a request to the server for authentication */
    axios.post('https://daniswhoiam-myflix.herokuapp.com/login', {
      Username: form.username,
      Password: form.password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(err => {
        const errorMessage = err.response.data.info;
        if (errorMessage.field === 'username') {
          setErrors({username: errorMessage.message});
        } else if (errorMessage.field === 'password') {
          setErrors({password: errorMessage.message});
        }
      });
  };

  return (
    <Row>
      <Col className="form-holder">
        <Form
          noValidate
          onSubmit={(e) => handleSubmit(e)}
        >
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                onChange={e => setField('username', e.target.value)}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                onChange={e => setField('password', e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
        <Link to="/register">
          <Button variant="outline-secondary" >No account yet? Click here to register</Button>
        </Link>
      </Col>
    </Row>
  );
}

/* Ensure that props have the right form */
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}