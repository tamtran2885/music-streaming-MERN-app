import React from 'react';
import { Link } from 'react-router-dom';
import star from '../../assets/images/star.svg';
import staractive from "../../assets/images/staractive.svg";

const Playlist = (playlist) => {
  const userId = sessionStorage.getItem("userId");
  const uid = userId;

  const { title, thumbnail, _id, followedBy } = playlist.playlist;

  const checkFollow = (uid) => {
    if (followedBy && followedBy.filter((item) => item.firebaseUser === uid).length === 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <div>
        <Link className='playlist__absolute' to={`/playlist/${_id}`} style={{ background: `url(${thumbnail && thumbnail}) no-repeat center center` }}>
          <div className='playlist__follow'>
            {checkFollow(uid) ? (
              <img
                className="song__like__icon"
                src={staractive}
                alt=""
              />
            ) : (
              <img
                className="song__like__icon"
                src={star}
                alt=""
              />
            )}
          </div>
          <div>
            {playlist.playlist && (
              <>
                <h3 className='playlist__tittle'>{title && title}</h3>
                {/*<img className='playlist__background' src={thumbnail && thumbnail} alt="playlist"/>*/}
              </>
            )}
          </div>
        </Link>
      </div>
    </>
  )
}

export default Playlist;