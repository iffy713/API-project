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
    <div className='nav_link_bar'>
      <ul>
        <li className="nav_header">
            <NavLink exact to="/" id='nav_home'>
              <div id='airbvb_logo'>
                  <img  id="logo_image" src="http://drive.google.com/uc?export=view&id=1MJTOXHESiifE9Hbtkp54Yy96OFDeCGGn" alt='logo'/>
                  <span id="logo_text">
                    airbvb
                  </span>
              </div>
            </NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
