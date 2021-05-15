/* Import from packages */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/* Get Components for Routing*/
import { Link } from 'react-router-dom';

/* Get Bootstrap Components */
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

/* Get corresponding SCSS file */
import './navbar-header.scss';

import logo from '../../assets/img/full_logo_small.png';

export function NavbarHeader(props) {
  const { user, onLoggedOut } = props;

  return (
    <>
    { user.Username &&
      <Navbar bg="light" expand="lg" fixed="top">
        <Navbar.Brand href="/">
          <Image src={logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ml-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
          >
            <Nav.Link href="/">Movies</Nav.Link>
            <Nav.Link href={`/profile/${user.Username}/`}>My Profile</Nav.Link>
            <Button variant="outline-primary" onClick={onLoggedOut}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    }
    </>
  );
}

/* TODO: User prop für Profile Link und um nur bei eingeloggtem Zustand zu zeigen (oder das in anderem View klären)*/
/* Optional: Movies view nur mit Favorite movies */
/* Styling von Navbar verändern */
/* TODO: log-Out Button in Navbar */