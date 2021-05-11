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
import './register-view.scss';

export function RegisterView(props) {
  /* Initialize necessary state variables  */
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [lastChanged, setLastChanged] = useState('');

  /* Updater functions */
  const updateForm = (currentForm, key, value) => {
    setForm(() => {
      return {
        ...currentForm,
        [key]: value
      }
    })
  };

  const updateErrors = (currentErrors, key, value) => {
    setErrors(() => {
      return {
        ...currentErrors,
        [key]: value
      }
    })
  };

  /* Validation cycle after each change to a field */
  useEffect(realtimeValidation, [lastChanged, JSON.stringify(form)]);

  const setField = (field, value) => {
    /* Only change value of current field */
    updateForm(form, field, value);
    /* Maintain lastChanged value to currently edited field */
    setLastChanged(field);
  };

  const checkFormValidity = () => {
    const { username, password, email, birth } = form;
    const newErrors = {};

    /* Require username to exist and to only have alphanumeric values */
    if (!username || username === '') newErrors.username = 'Please enter a username.';
    if (/\W/g.test(username)) newErrors.username = 'Your chosen username is invalid. Please do not use special characters.';

    /* Require password value */
    if (!password || password === '') newErrors.password = 'Please enter a password.';

    /* Require email value and validate by checking @ sign */
    if (!email || email === '') newErrors.email = 'Please enter an e-mail address.';
    if (!/@/g.test(email)) newErrors.email = 'Please enter a valid e-mail address.';

    /* Require birthday value */
    if (!birth) newErrors.birth = 'Please enter your birthday.';

    /* Returns object with errors for all wrong fields */
    return newErrors;
  };

  /* Defined with function keyword to be able to use it in useEffect and place it down here */
  function realtimeValidation () {
    if (lastChanged) {
      /* Get current error(s) for the currently edited field */
      const newError = checkFormValidity()[lastChanged];
      updateErrors(errors, lastChanged, newError);
    }
  };

  /* Function to send data to server to register */
  const handleSubmit = (e) => {
    e.preventDefault();

    /* If there are errors, display errors and stop submit */
    const newErrors = checkFormValidity();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    /* Send a request to the server to create a new user */
    axios.post('https://daniswhoiam-myflix.herokuapp.com/users', {
      Username: form.username,
      Password: form.password,
      Email: form.email,
      Birth: form.birth
    })
      .then(res => {
        /* const data = res.data;
        window.open('/', '_self'); */

        /* Log-in if request was successful */
        loginAfterRegister(form.username, form.password);
      })
      .catch(err => {
        /* Display errors from server-side validation */
        const errorResponse = err.response.data;
        const endOfPrefix = errorResponse.lastIndexOf(': ');
        /* Only display relevant part of error message */
        if (endOfPrefix !== -1) {
          const message = errorResponse.substr(endOfPrefix);
          if (message.includes('username')) {
            setErrors({ username: message });
          } else if (message.includes('email')) {
            setErrors({ email: message });
          }
        }
      });
  };

  /* Enable auto-login after successful registration */
  const loginAfterRegister = (user, pw) => {
    /* Send a request to the server for authentication */
    axios.post('https://daniswhoiam-myflix.herokuapp.com/login', {
      Username: user,
      Password: pw
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
          setErrors({ username: errorMessage.message });
        } else if (errorMessage.field === 'password') {
          setErrors({ password: errorMessage.message });
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
                required
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
                required
                type="password"
                onChange={e => setField('password', e.target.value)}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>E-Mail Address:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                type="email"
                onChange={e => setField('email', e.target.value)}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label>Date of Birth:</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                required
                type="date"
                onChange={e => setField('birth', e.target.value)}
                isInvalid={!!errors.birth}
              />
              <Form.Control.Feedback type="invalid">
                {errors.birth}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        <Link to={"/"}>
          <Button variant="outline-secondary">Back to Log-In</Button>
        </Link>
      </Col>
    </Row>

  );
}

/* Ensure that props have the right form */
RegisterView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}