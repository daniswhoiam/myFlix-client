/* Import from packages */
import React from 'react';
import PropTypes from 'prop-types';

/* Get Bootstrap Components */
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

/* Redux */
import { useSelector } from 'react-redux';

/* Get corresponding SCSS file */
import './navbar-header.scss';

/* Get Assets */
import logo from '../../assets/img/full_logo_small.png';

export function NavbarHeader(props) {
  const { onLoggedOut } = props;
  /* Make state available to component */
  const user = useSelector(state => state.user);

  return (
    <>
      {/* Only display if user is logged in */}
      { user.Username &&
        <Navbar bg="light" expand="lg" fixed="top">
          <Navbar.Brand href="/">
            <Image src={logo} />
          </Navbar.Brand>
          {/* Hamburger menu for smaller screen sizes */}
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

/* Ensure that props have the right form */
NavbarHeader.propTypes = {
  onLoggedOut: PropTypes.func.isRequired
}