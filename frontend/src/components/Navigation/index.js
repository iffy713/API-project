import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
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
        <span>
          <NavLink to="/login" className={'nav_links'}>Log In</NavLink>
        </span>
        <span>
          <NavLink to="/signup" className={'nav_links'}>Sign Up</NavLink>
        </span>
      </>
    );
  }

  return (
    <ul className='nav_link_bar'>
      <li>
        <span>
          <NavLink exact to="/" className={'nav_links'}>Home</NavLink>
        </span>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
