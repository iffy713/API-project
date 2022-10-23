import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import './SignupForm.css';


function SignupForm() {
  const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);


//   if (sessionUser) return <Redirect to="/" />;


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
        .catch(async (res) => {
          const data = await res.json();
        //   console.log(data)
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signup_form_container">
      <form onSubmit={handleSubmit} className="signup_form">
        <div id='signup_title'>
          <h2>Sign Up</h2>
        </div>
        <ul className="error_messages">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div>
            <input
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
        </div>
        <div>
            <input
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
        </div>
        <div>
            <input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>
        <div>
            <input
              placeholder="User Name"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
        </div>
        <div>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </div>
        <div>
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
        </div>
        <div>
          <button type="submit" className="signup_button">Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
