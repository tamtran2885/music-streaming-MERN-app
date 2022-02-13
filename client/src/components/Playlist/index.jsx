import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import star from '../../assets/images/star.svg';
import staractive from "../../assets/images/staractive.svg";
import { useAuth } from "../../context/authContext";
import { useDispatch } from "react-redux";
import { unfollowPlaylist, followPlaylist, getAllPlaylists, getPlaylistsByUser } from "../../redux/playlist/actions";

const Playlist = (playlist) => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const userId = localStorage.getItem("userId");
    const uid = userId;

    const {title, thumbnail, _id, followedBy } = playlist.playlist;

    const checkFollow = (uid) => {
        if (followedBy && followedBy.filter((item) => item.firebaseUser === uid).length === 0) {
          return false;
        } else {
          return true;
        }
    };

    // console.log(checkFollow(uid))

    const [follow, setFollow] = useState(checkFollow(uid));

    const handleToggle = () => {
      if (follow) {
        dispatch(unfollowPlaylist(_id, uid));
        dispatch(getAllPlaylists());
        dispatch(getPlaylistsByUser(uid));
        setFollow(!follow);
      } else {
        dispatch(followPlaylist(_id, uid));
        dispatch(getAllPlaylists());
        dispatch(getPlaylistsByUser(uid));
        setFollow(!follow);
      }
    };

  return (
    <>
      <div>
        <Link className='playlist__absolute' to={`/playlist/${_id}`} style={{ background: `url(${thumbnail && thumbnail}) no-repeat center center`}}>
          <div className='playlist__follow'>
          {/* <img src={star} alt="" /> */}
            {follow ? (
              <img
                className="song__like__icon"
                src={staractive}
                alt=""
                onClick={handleToggle}
              />
              ) : (
              <img
                className="song__like__icon"
                src={star}
                alt=""
                onClick={handleToggle}
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