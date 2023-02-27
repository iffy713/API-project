import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css';


function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
    <div className="button_container">
      <button onClick={openMenu}
        id="user_circle"
      >
        <i className="fa-solid fa-bars" />
        <i className="fa-solid fa-circle-user" />
      </button>
    </div>
      {showMenu && (
        <ul className="profile-dropdown">
          {/* <div id='menu-top-ctn'>
              <li className="show_menu_element">
                Hello, <span style={{'fontWeight':"700"}}>{user.username.toUpperCase()}</span>
              </li>
              <li className="show_menu_element">{user.email}</li>
          </div> */}
          <div id="menu-middle-ctn">
            <div className="nav-menu-links-ctn">
              <li id="manage_listings" className="show_menu_element">
                <NavLink className={'nav_listing_reviews'} exact to={'/my-account/hosts'}>Manage Listings</NavLink>
              </li>
            </div>
            <div className="nav-menu-links-ctn">
              <li id="manage_reviews" className="show_menu_element">
                <NavLink className={'nav_listing_reviews'} exact to={'/my-account/reviews'}>Manage Reviews</NavLink>
              </li>
            </div>
            <div className="nav-menu-links-ctn">
              <li className="show_menu_element">
                <NavLink className={'nav_listing_reviews'} exact to={'/my-account/bookings'}>Manage Bookings</NavLink>
              </li>
            </div>
            <div id="menu-bottom-ctn">
              <div className="nav-menu-links-ctn" id="log-out-btn-ctn">
                <li className="show_menu_element" onClick={logout}>
                  Log Out
                </li>
              </div>
            </div>
          </div>
              {/* <li className="show_menu_element">
                <button onClick={logout} id="log_out_button">Log Out</button>
              </li> */}

        </ul>
      )}
    </>
  );
}

export default ProfileButton;
