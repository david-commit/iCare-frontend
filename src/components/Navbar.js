import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch('/logout', { method: 'DELETE' }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <header>
      <nav>
        <div>
          <Link className='logo' to='/'>
            <span className='i-logo'>i</span>Care
          </Link>
        </div>
        <div>
          {user ? (
            <button className='nav-menu' onClick={handleLogoutClick}>
              Logout
            </button>
          ) : (
            <>
              <NavLink className='nav-menu' to='/signup'>
                Signup
              </NavLink>
              <NavLink className='nav-menu' to='/login'>
                Login
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
