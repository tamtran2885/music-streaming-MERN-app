import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import logo from "../../assets/images/logo.svg";
import SearchBar from "../SearchBar";

const Navbar = (props) => {
    const { page, handleMine, handlePopular, mongoUser } = props;
    const navigate = useNavigate();
    const { user, logout } = useAuth()

    // console.log(JSON.stringify(user));
    // console.log(user)

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login")
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <nav>
            <div className='nav__absolute'>
                <div className='nav__links'>
                    <div className="nav__logo">
                        <Link to={`/`}><img src={logo} alt="TamTamGo Logo" /></Link>
                    </div>
                    <div className='nav__options'>
                        <Link className='nav__link' to="/track">Songs</Link>
                        <Link className='nav__link' to={`/playlist`}>Playlists</Link>
                        <Link className='nav__link' to={`/user/albums`}>Albums</Link>
                        <Link className='nav__link' to={user ? `/user/${user.uid}` : "/"}>{mongoUser.firstName} Profile</Link>
                        {/* <Link className='nav__link' to={user ? `/user/${user.uid}` : "/"}>{user && user.email}</Link> */}
                        <Link className='avatar' to={user ? `user/${user.uid}` : "/"}><img className='avatar' src={mongoUser.profile ? mongoUser.profile : logo} alt="" /></Link>
                    </div>
                </div>
                <div className='nav__buttons'>
                    <div className='nav__tittle'>
                        {page && page}
                    </div>
                    <div className='nav__filters'>
                        <div className='searchbar__container'>
                            <SearchBar />
                        </div>
                        <div className='nav__filters__button'>
                            <button className='button'>I'm feeling lucky!</button>
                            <div className='nav__filters__owner'>
                                <button className='button__owner left active' onClick={handlePopular}>Popular</button>
                                <button className='button__owner right' onClick={handleMine}>Mine</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='hr'>
                    <hr />
                </div>
                <button onClick={handleLogout} className='button__primary logout'>Log Out</button>
            </div>
        </nav>
    )
}

export default Navbar;