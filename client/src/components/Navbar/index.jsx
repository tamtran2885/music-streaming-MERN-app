import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import logo from "../../assets/images/logo.svg";
import SearchBar from "../SearchBar";

const Navbar = (props) => {
    const { page, handleMine, handlePopular, setSearchWord} = props;
    const navigate = useNavigate();
    const { user, logout } = useAuth()
    const userId = localStorage.getItem("userId");

    // console.log(JSON.stringify(user));
    // console.log(user)

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("token")
            localStorage.removeItem("userId")
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
                        <Link className='nav__link' to={userId ? `/user/${userId}` : "/"}>{user && user.email}</Link>
                        <Link className='avatar' to={""}><img className='avatar' src={logo} alt="" />
                            <div className='float__menu'>
                                <Link className='nav__link link' to={userId ? `user/${userId}` : "/"}>Account details</Link>
                                <button onClick={handleLogout} className='nav__link logout'>Log Out</button>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='nav__buttons'>
                    <div className='nav__tittle'>
                        {page && page}
                    </div>
                    <div className='nav__filters'>
                        <div className='searchbar__container'>
                            <SearchBar  />
                        </div>
                        <div className='nav__filters__button'>
                            <button className='button'>I'm feeling lucky!</button>
                            <div className='nav__filters__owner'>
                                <button className='button__owner left active' onClick={handlePopular}>Popular</button>
                                <button className='button__owner right' onClick={handleMine}>Mine</button>
                                {/* {page && page === "Songs" ? (<button className='button__owner right' onClick={handleFav}>Mine</button>) : (<di></di>)} */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='hr'>
                    <hr />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;