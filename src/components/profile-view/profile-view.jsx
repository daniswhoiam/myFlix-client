/* Import from packages */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { DeleteAccountModal } from './delete-account-modal';

/* Import SCSS */
import './profile-view.scss';

export function ProfileView() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userdata')));
  const [modal, setModal] = useState(false);
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
  };

  const checkFormValidity = () => {
    const { username, password, email } = form;
    const newErrors = {};

    if (username && username !== '' && /\W/g.test(username)) newErrors.username = 'Please enter a valid username (only alphanumerical values).';

    if (!password || password === '') newErrors.password = 'Please type in your current or a new password.';

    if (email && email !== '' && !/@/g.test(email)) newErrors.email = 'Please enter a valid e-mail address (must contain "@").';

    return newErrors;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = checkFormValidity();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios.put(
      `https://daniswhoiam-myflix.herokuapp.com/users/${localStorage.getItem('user')}`,
      {
        Username: form.username || userData.Username,
        Password: form.password,
        Email: form.email || userData.Email
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .then(res => {
        localStorage.setItem('userdata', JSON.stringify(res.data));
        localStorage.setItem('user', res.data.Username);
        window.location.href = `/profile/${localStorage.getItem('user')}`;
        alert('Successfully updated your data.');
      })
      .catch(err => {
        console.log(err);
      });
  }

  const deleteAccount = () => {
    axios.delete(
      `https://daniswhoiam-myflix.herokuapp.com/users/${localStorage.getItem('user')}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .then(res => {
        localStorage.clear();
        window.location.href = "/";
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <>
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
                  placeholder={userData.Username}
                  onChange={e => setField('username', e.target.value)}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
              <Form.Text muted>Here you can see your current username. To change it, type in a new one.</Form.Text>
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
              <Form.Text muted>Here, please type either your current password or a new one if you want to change your current one. (required)</Form.Text>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>E-Mail Address:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="email"
                  placeholder={userData.Email}
                  onChange={e => setField('email', e.target.value)}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
              <Form.Text muted>Here you can see your current e-mail address. To change it, type in a new one.</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of Birth: </Form.Label>
              <Form.Control plaintext readOnly defaultValue={userData.Birth.substr(0, 10)} />
            </Form.Group>
            <Button type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="outline-primary" onClick={() => setModal(true)}>Delete your account</Button>
        </Col>
      </Row>
      {modal && <DeleteAccountModal closeModal={() => setModal(false)} deleteAccount={deleteAccount} />}
    </>
  );
}