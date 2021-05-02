/* Import from packages */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { DeleteAccountModal } from './delete-account-modal';

/* Import SCSS */
import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor() {
    super();
    const userdata = JSON.parse(localStorage.getItem('userdata'));
    this.state = {
      newUsername: userdata.Username,
      newPassword: "",
      newEmail: userdata.Email,
      birth: userdata.Birth,
      modal: false
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let username = this.state.newUsername;
    let password = this.state.newPassword;
    let email = this.state.newEmail;
    axios.put(
      `https://daniswhoiam-myflix.herokuapp.com/users/${localStorage.getItem('user')}`,
      {
        Username: username,
        Password: password,
        Email: email
      },
      {headers: { 
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      }}
    )
      .then(res => {
        console.log('Successfully updated user data.');
      })
      .catch(err => {
        console.log(err);
      });
  }

  deleteAccount() {
    axios.delete(
      `https://daniswhoiam-myflix.herokuapp.com/users/${localStorage.getItem('user')}`,
      {headers: { 
        Authorization: `Bearer ${localStorage.getItem('token')}` 
      }}
    )
    .then(res => {
      localStorage.clear();
      window.location.href="/";
    })
    .catch(err => {
      console.log(err);
    });
  }

  updateUsername = e => this.setState({ newUsername: e });
  updatePassword = e => this.setState({ newPassword: e });
  updateEmail = e => this.setState({ newEmail: e });
  closeModal = () => this.setState({ modal: false});

  render() {
    const { newUsername, newEmail, birth, modal } = this.state;

    return (
      <>
        <Row>
          <Col className="form-holder">
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" placeholder={newUsername} onChange={e => this.updateUsername(e.target.value)} />
                <Form.Text muted>Here you can see your current username. To change it, type in a new one.</Form.Text>
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control required type="password" onChange={e => this.updatePassword(e.target.value)} />
                <Form.Text muted>Here, please type either your current password or a new one if you want to change your current one. (required)</Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>E-Mail Address:</Form.Label>
                <Form.Control type="email" placeholder={newEmail} onChange={e => this.updateEmail(e.target.value)} />
                <Form.Text muted>Here you can see your current e-mail address. To change it, type in a new one.</Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Date of Birth: </Form.Label>
                <Form.Control plaintext readOnly defaultValue={birth.substr(0, 10)} />
              </Form.Group>
              <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="outline-primary" onClick={() => this.setState({ modal: true})}>Delete your account</Button>
          </Col>
        </Row>
        {modal && <DeleteAccountModal closeModal={() => this.closeModal()} deleteAccount={() => this.deleteAccount()} />}
      </>
    );
  }
}
