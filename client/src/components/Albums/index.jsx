import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Album from '../Album';

import { connect, useDispatch } from "react-redux";
import { getAlbums } from "../../redux/dashboard/actions";


const Albums = ({ albums }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAlbums());
  }, [dispatch])

  const albumsInfo = albums.data;
  // console.log(albumsInfo);

  return (
    <>
      <div className='albums__absolute'>
        <div className='albums__tittle'>
          <h2>Albums</h2>
          <Link className='link' to={`/user/albums`}>See All</Link>
        </div>
        <div className='albums__container'>
          {albumsInfo && albumsInfo.map((album) => (
            <div key={album._id}><Album key={album._id} album={album} /></div>
          ))}
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    albums: state.dashboard.albums
  }
}

const reduxHoc = connect(mapStateToProps)

export default reduxHoc(Albums);