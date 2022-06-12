import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';
import AuthService from '../../services/auth.service';

const Header = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'));
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <header className="app-header">
      <div className="container">
        <div className="app-branding">
          <Link to="/" className="app-title">
            Spring Social
          </Link>
        </div>
        <div className="app-options">
          <nav className="app-nav">
            {currentUser ? (
              <ul>
                <li>
                  <NavLink to={'/home'}>Home</NavLink>
                </li>
                <li>
                  <NavLink to="/profile">{currentUser.username}</NavLink>
                </li>
                <li>
                  <a onClick={logOut}>Logout</a>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <NavLink to={'/home'}>Home</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/register">Sign Up</NavLink>
                </li>
              </ul>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;
