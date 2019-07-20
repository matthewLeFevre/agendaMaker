import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

function Header() {
  const [navOpen, toggleNav] = useState(false);
  function toggle() {
    toggleNav(!navOpen);
  }
  return(
    <header className="header">
      <div className="header__container">
        <div className="header-logo">
          <span className="header-logo__icon">
            <i className="fas fa-alarm-clock"></i>
          </span>
          <span className="header-logo__text">
            Agenda Maker
          </span>
        </div>
        <div onClick={toggle} className="header-toggle">
          <i className="fas fa-bars"></i>
        </div>
      </div>
      <nav className={`nav ${navOpen ? 'open' : ''}`}>
        <NavLink onClick={toggle} className="nav__link" to="/">Home</NavLink>
        <NavLink onClick={toggle} className="nav__link" to="/CreateAgenda">Create Agenda</NavLink>
      </nav>
    </header>
  );
}

export default Header;