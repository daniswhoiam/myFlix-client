/* Import from packages */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

/* Get Bootstrap Components */
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

/* Redux */
import { useSelector } from 'react-redux';

/* Get Own Components */
import { DeleteAccountModal } from './delete-account-modal';

/* Get corresponding SCSS file */
import './profile-view.scss';

function ProfileView(props) {
  /* Initialize necessary state variables  */
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(false);
  const [lastChanged, setLastChanged] = useState('');
  /* Make state available to component */
  const user = useSelector(state => state.user);

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
    const { username, password, email } = form;
    const newErrors = {};

    /* Do not require a new username, but if it is there make sure there are only alphanumeric values */
    if (username && username !== '' && /\W/g.test(username)) newErrors.username = 'Please enter a valid username (only alphanumerical values).';

    /* Require a password to be entered (new or old) -> cannot retrieve current password from localStorage */
    if (!password || password === '') newErrors.password = 'Please type in your current or a new password.';

    /* Do not require a new email address, but if it is there make sure it is valid (contains @) */
    if (email && email !== '' && !/@/g.test(email)) newErrors.email = 'Please enter a valid e-mail address (must contain "@").';

    /* Returns object with errors for all wrong fields */
    return newErrors;
  };

  /* Defined with function keyword to be able to use it in useEffect and place it down here */
  function realtimeValidation() {
    if (lastChanged) {
      /* Get current error(s) for the currently edited field */
      const newError = checkFormValidity()[lastChanged];
      updateErrors(errors, lastChanged, newError);
    }
  };

  /* Function to send data to server to change user data */
  const handleSubmit = (e) => {
    e.preventDefault();

    /* If there are errors, display errors and stop submit */
    const newErrors = checkFormValidity();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    axios.put(
      `https://daniswhoiam-myflix.herokuapp.com/users/${user.Username}`,
      {
        /* If no input, take standard values -> due to how API is designed */
        Username: form.username || user.Username,
        Password: form.password,
        Email: form.email || user.Email
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .then(res => {
        /* Update localStorage because it is the source for maintaining state (see MainView) */
        localStorage.setItem('user', JSON.stringify(res.data));
        /* Change URL to match right username */
        window.location.href = `/profile/${res.data.Username}`;
        alert('Successfully updated your data.');
      })
      .catch(err => {
        if (!err.response) {
          console.log(err);
          return;
        }

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

  /* Handle account deletion */
  const deleteAccount = () => {
    axios.delete(
      `https://daniswhoiam-myflix.herokuapp.com/users/${user.Username}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    )
      .then(res => {
        /* If request successful, log out user and redirect to homepage */
        props.onLoggedOut();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Row>
        <Col className="form-holder">
          <Form
            /* Disable standard HTML5 validation */
            noValidate
            onSubmit={handleSubmit}
          >
            {/* Username handling */}
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder={user.Username}
                  onChange={e => setField('username', e.target.value)}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
              <Form.Text muted>Here you can see your current username. To change it, type in a new one.</Form.Text>
            </Form.Group>

            {/* Password handling */}
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

            {/* Email Handling */}
            <Form.Group controlId="formEmail">
              <Form.Label>E-Mail Address:</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="email"
                  placeholder={user.Email}
                  onChange={e => setField('email', e.target.value)}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
              <Form.Text muted>Here you can see your current e-mail address. To change it, type in a new one.</Form.Text>
            </Form.Group>

            {/* Date of birth handling */}
            <Form.Group>
              <Form.Label>Date of Birth: </Form.Label>
              <Form.Control plaintext readOnly defaultValue={user.Birth.substr(0, 10)} />
            </Form.Group>

            {/* Submit button */}
            <Button type="submit">Update profile</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        {/* Go to previous view */}
        <Col className="back-col">
          <Button onClick={() => { props.onBackClick(); }}>Back</Button>
        </Col>

        {/* If user wants to delete account, ask again to make sure */}
        <Col className="delete-col" >
          <Button variant="outline-primary" onClick={() => setModal(true)}>Delete your account</Button>
        </Col>
      </Row>

      {/* Display modal if it is triggered */}
      {modal && <DeleteAccountModal closeModal={() => setModal(false)} deleteAccount={deleteAccount} />}
    </>
  );
}

/* Ensure that props have the right form */
ProfileView.propTypes = {
  onBackClick: PropTypes.func.isRequired,
  onLoggedOut: PropTypes.func.isRequired
}

/* Connect component with store and export */
export default ProfileView;