import React from 'react';
// import { Link } from 'react-router-dom';
// import star from '../../assets/images/star.svg'

const CreatedPlaylist = ({playlist}) => {

    const {title, thumbnail} = playlist;
    console.log(playlist)

  return (
    <>
      <div className='playlist__absolute'>
        <div className='playlist__absolute' to={`/user/playlist`}>
            <div>
            {playlist && (
                <>
                <h3 className='playlist__tittle'>{title && title}</h3>
                    <img className='playlist__background' src={thumbnail && thumbnail} alt="playlist" style={{ width: "250px",  height: "150px"}}/>
                </>
            )}
            </div>
            {/* <div className='playlist__follow'>
                <img src={star} alt="" />
            </div> */}
        </div>
      </div>
    </>
  )
}

export default CreatedPlaylist;