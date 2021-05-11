import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function DeleteAccountModal(props) {
  return (
    <Modal show={true} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Your account will be deleted permanently.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.closeModal}>No, keep my account.</Button>
        <Button variant="primary" onClick={props.deleteAccount}>Yes, delete my account.</Button>
      </Modal.Footer>
    </Modal>
  );
}