/* Import from packages */
import React from 'react';
import PropTypes from 'prop-types';

/* Get Bootstrap Components */
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function DeleteAccountModal(props) {
  return (
    /* Multiple options of closing modal -> clicking away, secondary button, etc. */
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

/* Ensure that props have the right form */
DeleteAccountModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
}