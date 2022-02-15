import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Genres from '../../components/Genres';
import Albums from '../../components/Albums';
import TrackRows from "../../components/TrackRows";
import upload from "../../assets/images/upload.svg";
import { getFavTracksByUser, getAllTracks, getTracksByUser } from "../../redux/track/actions";
import close from '../../assets/images/close.svg';
import { connect, useDispatch } from "react-redux";
import axios from "axios";

const TrackPage = ({ favTracksByUser, myTracks, allTracks }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedToken = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId");

  const [totalTracks, setTotalTracks] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    if (!loggedToken) {
      navigate("/login")
    }
    if (loggedToken) {
      setTimeout(async () => {
        dispatch(getAllTracks());
        dispatch(getTracksByUser(userId));
        dispatch(getFavTracksByUser(userId));
      }, 3000)
    }
  }, [dispatch])

  useEffect(() => {
    setTotalTracks(allTracks);
  }, [allTracks])

  const handlePopular = () => {
    // console.log("allTracks")
    setTotalTracks(allTracks)
    navigate("/track")
  };

  const handleMine = () => {
    // console.log("myTracks")
    setTotalTracks(myTracks)
    navigate("/track")
  };

  const handleFav = () => {
    setTotalTracks(favTracksByUser)
    navigate("/track")
  }


  const searchTracks = async () => {
    if (searchWord.trim()) {
      // dispatch fetch search tracks
      // dispatch(getTracksBySearch(searchWord));
      const searchTracks = await axios.get(
        `/api/tracks/search?searchQuery=${searchWord || "none"
        }`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      // console.log(searchTracks.data)
      // setTotalTracks(searchTracks.data);
      navigate(`/ track ? searchQuery = ${searchWord || "none"} `);
    } else {
      navigate("/track")
    }
  }

  return (
    <>
      <div className='dashboard__background'>
        <Navbar page="Songs" handleMine={handleMine} handlePopular={handlePopular} handleFav={handleFav} searchWord={searchWord} setSearchWord={setSearchWord} searchTracks={searchTracks} />
        <div className='tracks__absolute'>
          <div className='tracks__display'>
            <div className="tracks__title">
              <h2 className="tittle">Uploaded</h2>
              <Link className='link' to="/track/add">
                <button className="button">Upload Song</button>
                <img className="upload" src={upload} alt="Upload" />
              </Link>
            </div>
            <TrackRows totalTracks={totalTracks} />
          </div>
          <div className='dashboard__side'>
            <Genres />
            <Albums />
          </div>
          <TrackRows totalTracks={totalTracks} />
        </div>
        <div className='dashboard__side'>
          <Genres />
          <Albums />
        </div>
      </div>
      <div className="songs__modal__absolute modal__hide">
        <div className="songs__modal__background">
          <div className="sogs__modal__container">
            <h1 className="header">Add New Track</h1>
            <div className="close"><img src={close} alt="Close the modal" /></div>
            <div className="form__container ">
              <form className="form" onSubmit={""} encType="multipart/form-data">
                <div className="form__items">
                  <div className="drag__area">
                    <h3>Drag your track here</h3>
                    <p>or</p>
                    <label for="track"><p className='file'>Select a file</p></label>
                    <input
                      type="file"
                      className="form__input"
                      placeholder="Url"
                      name="urlTrack"
                      id="track"
                      onChange={""}
                    />
                  </div>
                  <div className="form__inputs">
                    <label for="file"><p className='file'>Track's cover</p></label>
                    <input
                      type="file"
                      className="form__input"
                      placeholder="Thumbnail"
                      name="photoTrack"
                      id="file"
                      onChange={""}
                    />
                    <input
                      type="text"
                      className="form__input"
                      placeholder="Title"
                      name="title"
                      value={""}
                      onChange={""}
                    />
                    {/*errors.title && <p>{errors.title}</p>*/}
                    <input
                      type="text"
                      className="form__input"
                      placeholder="Album"
                      name="album"
                      value={""}
                      onChange={""}
                    />
                    <input
                      type="text"
                      className="form__input"
                      placeholder="Artist"
                      name="artist"
                      value={""}
                      onChange={""}
                    />
                    <label htmlFor="genre">Genre: </label>
                    <select name="genre"
                      value={""}
                      onChange={""}>
                      {/*genreOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))*/}
                    </select>
                    {/*errors.genre && <p>{errors.genre}</p>*/}
                    <button className="button" type="button">Next</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="form__container modal__hide">
              <form className="form" onSubmit={""} encType="multipart/form-data">
                <div className="form__items__cover">
                  <div className="drag__area">
                    <h3>Drag the track's cover here</h3>
                    <p>or</p>
                    <label for="track"><p className='file'>Select a file</p></label>
                    <input
                      type="file"
                      className="form__input"
                      placeholder="Url"
                      name="urlTrack"
                      id="track"
                      onChange={""}
                    />
                  </div>
                  <div className="form__inputs">
                    <button className="button" type="button">Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

const mapStateToProps = state => {
  return {
    allTracks: state.track.allTracks.data,
    myTracks: state.track.myTracks.data,
    favTracksByUser: state.track.favTracksByUser,
  }
}

const reduxHoc = connect(mapStateToProps)

export default reduxHoc(TrackPage);