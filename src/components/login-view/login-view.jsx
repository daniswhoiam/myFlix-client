import React, { useState } from 'react';
import { RegisterView } from '../register-view/register-view';
import PropTypes from 'prop-types';

import './login-view.scss';

export function LoginView(props) {
  /* Initialize necessary state variables  */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [registration, setRegistration] = useState(false);

  /* Function for sending the credentials to verify */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call this.props.onLoggedIn(username) */
    /* Temporary solution */
    props.onLoggedIn(username);
  };

  /* If someone wants to register, display registration form. Also enable immediate log-in after valid registration. (Temporary Implementation) */
  if (registration) return <RegisterView onLoggedIn={props.onLoggedIn} />;

  return (
    <>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label >
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </form>
      <button onClick={() => setRegistration(true)}>No account yet? Click here to register</button>
    </>
  );
}

/* Ensure that props have the right form */
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
}