import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import AlbumsGroup from '../../components/AlbumsGroup';
import { useNavigate } from "react-router-dom"

import { connect, useDispatch } from "react-redux";
import axios from 'axios';

const Albums = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [mongoUser, setMongoUser] = useState({});
    const loggedToken = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        if (!loggedToken) {
            navigate("/login")
        }
        if (loggedToken) {
            setTimeout(async () => {
                APIcall(loggedToken, userId);
            }, 1000)
        }
    }, [dispatch]);

    const APIcall = async (loggedToken, userId) => {
        const userReq = await axios.get(`/api/user/${userId}`, {
            headers: {
                Authorization: 'Bearer ' + loggedToken,
            },
        });
        setMongoUser(userReq.data);
    };

    return (
        <>
            <div className='dashboard__background'>
                <Navbar page="Albums" mongoUser={mongoUser} />
                <div className='dashboard__absolute'>
                    <div className='albums__display'>
                        <div className='albums__row'>
                            <div className='albums__container'>
                                <div className='album__tittle'>
                                    <h2 className='tittle'>Top Albums</h2>
                                </div>
                                <div className='albums__space'>
                                    <AlbumsGroup />
                                </div>
                            </div>
                        </div>
                        <div className='albums__row'>
                            <div className='albums__container'>
                                <div className='album__tittle'>
                                    <h2 className='tittle'>My Albums</h2>
                                    <button className='button'>+</button>
                                </div>
                                <div className='albums__space'>
                                    <AlbumsGroup />
                                </div>
                            </div>
                            <div className='albums__container'>
                                <div className='album__tittle'>
                                    <h2 className='tittle'>My Following Albums</h2>
                                </div>
                                <div className='albums__space'>
                                    <AlbumsGroup />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        allTracks: state.track.allTracks,
        myTracks: state.track.myTracks,
        allPlaylists: state.playlist.allPlaylists,
        myPlaylists: state.playlist.myPlaylists,
    }
}

const reduxHoc = connect(mapStateToProps)

export default reduxHoc(Albums);
