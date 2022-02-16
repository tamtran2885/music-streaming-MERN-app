import React from 'react';
import { Link } from 'react-router-dom';
import star from '../../assets/images/star.svg';
import staractive from "../../assets/images/staractive.svg";

const CreatedPlaylist = ({playlist}) => {
  const userId = sessionStorage.getItem("userId");
  const {title, thumbnail, _id, followedBy} = playlist;

  const checkFollow = (userId) => {
    if (followedBy && followedBy.filter((item) => item.firebaseUser === userId).length === 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <Link className='playlist__absolute' to={`/playlist/${_id}`} style={{ background: `url(${thumbnail && thumbnail}) no-repeat center center`}}>
        <div className='playlist__follow'>
        {checkFollow(userId) ? (
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
          <h3 className='playlist__tittle'>{title && title}</h3>
        <div>
        </div>
      </Link>
    </>
  )
}

export default CreatedPlaylist;