import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import logo from "../../assets/images/logo.svg";
import SearchBar from "../SearchBar";

const Navbar = (props) => {
    const { page, handleMine, handlePopular, handleFav, searchWord, setSearchWord, searchTracks, userProfile, playlistInfo } = props;
    const navigate = useNavigate();
    const { user, logout } = useAuth()
    const userId = sessionStorage.getItem("userId");

    const handleLogout = async () => {
        try {
            await logout();
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("userId")
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
                        <Link className='nav__link' to={userId ? `/user/${userId}` : "/"}>{user && user.email}</Link>
                        <div className='avatar' to={""}><img className='avatar' src={logo} alt="" />
                            <div className='float__menu'>
                                <Link className='nav__link link' to={userId ? `/user/edit/${userId}` : "/"}>Account details</Link>
                                <button onClick={handleLogout} className='nav__link logout'>Log Out</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='nav__buttons'>
                    <div className='nav__tittle'>
                        {userProfile ? userProfile.firstName && userProfile.lastName : playlistInfo ? playlistInfo.title : page && page}
                    </div>
                    <div className='nav__filters'>
                        <div className='searchbar__container'>
                            <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} searchTracks={searchTracks} />
                        </div>
                        <div className='nav__filters__button'>
                            <button className='button'>I'm feeling lucky!</button>
                            <div className='nav__filters__owner'>
                                <button className='button__owner left active' onClick={handlePopular}>Popular</button>
                                <button className='button__owner right' onClick={handleMine}>Mine</button>
                                {page && page === "Songs" ? (<button className='button__owner right fav' onClick={handleFav}>Fav</button>) : (<div></div>)}
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