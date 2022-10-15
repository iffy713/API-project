import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
          {/* <NavLink to="/login" className={'nav_links'}>Log In</NavLink> */}
          <LoginFormModal className={"modal_button"} />
          {/* <NavLink to="/signup" className={'nav_links'}>Sign Up</NavLink> */}
          <SignupFormModal className={"modal_button"}/>
      </>
    );
  }

  return (
    <ul className='nav_link_bar'>
      <li>
        <span>
          <NavLink exact to="/" id='nav_home'>Home</NavLink>
        </span>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
