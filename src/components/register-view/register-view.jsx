import React, { useState } from 'react';
import axios from 'axios';

import './register-view.scss';

export function RegisterView(props) {
  /* Initialize necessary state variables  */
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  /* Function to send data to server to register */
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://daniswhoiam-myflix.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birth: birthday
    })
    .then(res => {
      console.log(res);
      /* Temporary Solution to log-in user immediately*/
      props.onLoggedIn(res.data.Username);
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label >
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        E-Mail Address:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}/>
      </label>
      <label>
        Date of Birth:
        <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)}/>
      </label>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </form>
  );
}