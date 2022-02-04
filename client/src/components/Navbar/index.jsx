import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import logo from "../../assets/images/logo.svg";
import SearchBar from "../SearchBar";

const Navbar = () => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout();
      // navigate("/login")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <nav>
      <div className='nav__absolute'>
        <div className='nav__links'>
          <div className="nav__logo">
          <Link to={`/user/`}><img src={logo} alt="TamTamGo Logo" /></Link>
          </div>
          <div className='nav__options'>
          <Link className='nav__link' to={`/user/songs`}>Songs</Link>
          <Link className='nav__link' to={`/user/playlists`}>Playlists</Link>
          <Link className='nav__link' to={`/user/albums`}>Albums</Link>
          <Link className='nav__link' to={`/user/${user.uid}`}>{user.displayName}</Link>
          <Link className='avatar' to={`user/${user.uid}`}><img className='avatar' src={logo} alt="" /></Link>
          </div>
        </div>
        <div className='nav__buttons'>
          <div className='nav__tittle'>
            Popular Now
          </div>
          <div className='nav__filters'>
            <div className='searchbar__container'>
              <SearchBar />
            </div>
            <div className='nav__filters__button'>
              <button className='button'>I'm feeling lucky!</button>
              <div className='nav__filters__owner'>
                <button className='button__owner left active'>Popular</button>
                <button className='button__owner right'>Mine</button>
              </div>
            </div>
          </div>
        </div>
        <div className='hr'>
          <hr />
        </div>
        <button onClick={handleLogout} className='button__primary'>Log Out</button>
      </div>
    </nav>
  )
}

export default Navbar;