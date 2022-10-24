import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import './LoginForm.css';


function LoginForm() {
  const dispatch = useDispatch();

  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

//   if (sessionUser) return (
//     <Redirect to="/" />
//   );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        //console.log("trying to login !!!!!!",data)
        // if (data && data.errors) setErrors(data.errors);
        if(data && data.message) setErrors(data.message)
      });
  }

  return (
    <div className='login_form_container'>
        <form onSubmit={handleSubmit} className="login_form">
          <div id='login_title'>
            <h2 >Log in</h2>
          </div>
        <ul className="error_messages">
            {/* {errors.map((error, idx) => <li key={idx}>{error}</li>)} */}
            {errors}
        </ul>
        <div>
          <input
            id='input_username'
            placeholder='Username or Email'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div>
          <input
          id='input_password'
          placeholder='Password'
          htmlFor="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
        </div>
        <button type="submit"
            className='login_in_button'>Log In</button>
        </form>
    </div>
  );
}

export default LoginForm;
