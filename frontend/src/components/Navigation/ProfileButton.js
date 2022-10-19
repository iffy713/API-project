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
      <button onClick={openMenu}
        id="user_circle"
      >
        <i className="fa-solid fa-circle-user" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="show_menu_element">{user.username}</li>
          <li className="show_menu_element">{user.email}</li>
          <li>
            <NavLink exact to={'/spots/current'}>Manage My Spots</NavLink>
          </li>
          <li className="show_menu_element">
            <button onClick={logout} id="log_out_button">Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
