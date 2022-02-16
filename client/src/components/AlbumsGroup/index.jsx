import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Album from '../Album';

import {connect, useDispatch} from "react-redux";
import {getAlbums} from "../../redux/dashboard/actions";


const Albums = ({albums}) => {
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(getAlbums());
  }, [dispatch])

  const albumsInfo = albums.data;
  // console.log(albumsInfo);

  return (
    <>
    <div className='albums__group'>
      Here show albums
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