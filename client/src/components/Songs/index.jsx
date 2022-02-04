import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Song from '../Song'

import { connect, useDispatch } from "react-redux";
import { getTracks } from "../../redux/dashboard/actions";
import { useAuth } from '../../context/authContext';


const Songs = ({ tracks }) => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const token = user.accessToken
  useEffect(() => {
    if (token) {
      dispatch(getTracks());
    }

  }, [dispatch])

  const tracksInfo = tracks.data

  return (
    <>
      <div className='songs__absolute'>
        <div className='songs__tittle'>
          <h2>Songs</h2>
          <Link className='link' to={`/user/songs`}>See All</Link>
        </div>
        <div className='songs__container'>
          {tracksInfo && tracksInfo.map((track) => (
            <div key={track.id}><Song key={track.id} track={track} /></div>
          ))}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    tracks: state.dashboard.tracks
  }
}

const reduxHoc = connect(mapStateToProps)

export default reduxHoc(Songs);