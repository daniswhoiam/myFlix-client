/* Import from packages */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/* Get Components for Routing*/
import { Link } from 'react-router-dom';

/* Get Bootstrap Components */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

/* Get corresponding SCSS file */
import './login-view.scss';

export function LoginView(props) {
  /* Initialize necessary state variables  */
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [lastChanged, setLastChanged] = useState('');

  /* Validation cycle after each change to a field */
  useEffect(realtimeValidation, [lastChanged, JSON.stringify(form)]);

  const setField = (field, value) => {
    /* Only change value of current field */
    setForm({
      ...form,
      [field]: value
    });

    /* Maintain lastChanged value to currently edited field */
    setLastChanged(field);
  };

  const checkFormValidity = () => {
    const { username, password } = form;
    const newErrors = {};

    /* Require username to be entered */
    if (!username || username === '') newErrors.username = 'Please enter your username.';

    /* Require password to be entered */
    if (!password || password === '') newErrors.password = 'Please enter your password.';

    /* Returns object with errors for all wrong fields */
    return newErrors;
  };

  /* Defined with function keyword to be able to use it in useEffect and place it down here */
  function realtimeValidation () {
    if (lastChanged) {
      const newErrors = checkFormValidity();

      /* Only change error state of the lastChanged field */
      setErrors({
        ...errors,
        [lastChanged]: newErrors[lastChanged]
      });
    }
  };


  /* Function for sending the credentials to verify */
  const handleSubmit = (e) => {
    e.preventDefault();

    /* If there are errors, display errors and stop submit */
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
      .then(res => {
        /* Log-in if request was successful */
        const data = res.data;
        props.onLoggedIn(data);
      })
      .catch(err => {
        /* Display errors from server-side validation */
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
          /* Disable standard HTML5 validation */
          noValidate
          onSubmit={handleSubmit}
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