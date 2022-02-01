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
              <img src={logo} alt="TamTamGo Logo" width='100px' />
          </div>
          <div className='nav__options'>
          <Link to={`/user/songs`}>Songs</Link>
          <Link to={`/user/playlists`}>Playlists</Link>
          <Link to={`/user/albums`}>Albums</Link>
          <Link to={`/user/${user.uid}`}>{user.displayName}</Link>
          <img src="" alt="" />
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
                <button className='button active'>Popular</button>
                <button className='button'>Mine</button>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>
    </nav>
  )
}

export default Navbar;