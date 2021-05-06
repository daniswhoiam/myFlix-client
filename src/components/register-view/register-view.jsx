/* Import from packages */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

import './register-view.scss';

export function RegisterView(props) {
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
    const { username, password, email, birth } = form;
    const newErrors = {};

    if (!username || username === '') newErrors.username = 'Please enter a username.';
    if (/\W/g.test(username)) newErrors.username = 'Your chosen username is invalid. Please do not use special characters.';

    if (!password || password === '') newErrors.password = 'Please enter a password.';

    if (!email || email === '') newErrors.email = 'Please enter an e-mail address.';
    if (!/@/g.test(email)) newErrors.email = 'Please enter a valid e-mail address.';

    if (!birth || typeof birth !== date ) newErrors.birth = 'Please enter your birthday.';

    return newErrors;
  }

  /* Function to send data to server to register */
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = checkFormValidity();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

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
        <Form
          noValidate
          onSubmit={(e) => handleSubmit(e)}
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