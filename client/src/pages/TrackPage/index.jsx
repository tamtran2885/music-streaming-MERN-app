import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Genres from '../../components/Genres';
import Albums from '../../components/Albums';
import TrackRows from "../../components/TrackRows";
import Modal from "react-modal"
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
  const [state, setState] = useState("");




  useEffect(() => {
    if (!loggedToken) {
      navigate("/login")
    }
    if (loggedToken) {
      setTimeout(async () => {
        dispatch(getAllTracks());
        dispatch(getTracksByUser(userId));
        dispatch(getFavTracksByUser(userId));
      }, 1000)
    }
  }, [dispatch, loggedToken, navigate, userId])

  useEffect(() => {
    setTotalTracks(allTracks);
  }, [allTracks])

  const handlePopular = () => {
    // console.log("allTracks")
    setTotalTracks(allTracks);
    setState("popular")
    navigate("/track")
  };

  const handleMine = () => {
    // console.log("myTracks")
    setTotalTracks(myTracks)
    setState("mine")
    navigate("/track")
  };

  const handleFav = () => {
    setTotalTracks(favTracksByUser)
    setState("fav")
    navigate("/track")
  }


  const searchTracks = async () => {
    if (searchWord.trim()) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/tracks/search?searchQuery=${searchWord || "none"}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      ).then((response) => {
        // console.log(response)
        setTotalTracks(response.data.data);
        navigate(`/track?searchQuery=${searchWord || "none"}`);
      })
    } else {
      navigate("/track")
    }

  }


  //? STATE FOR MODAL
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [openModalTwo, setOpenModalTwo] = useState(false)


  const modalOneOpen = () => {
    setModalIsOpen(true)
    setOpenModalTwo(false)
  }
  const modalTwoOpen = () => {
    setModalIsOpen(false)
    setOpenModalTwo(true)
  }

  const resetModalStyle = (() => {
    // Styles
    const initial = null

    const overlay = {
      position: initial,
      top: initial,
      left: initial,
      right: initial,
      bottom: initial,
      backgroundColor: initial,
      WebkitOverflowScrolling: initial,
      zIndex: initial,
    }

    const content = {
      position: initial,
      top: initial,
      left: initial,
      right: initial,
      bottom: initial,
      border: initial,
      background: initial,
      overflow: initial,
      borderRadius: initial,
      outline: initial,
      padding: initial,
    }

    return { overlay, content }
  })

  // console.log(state)

  return (
    <>
      <div className='dashboard__background'>
        <Navbar page="Songs" handleMine={handleMine} handlePopular={handlePopular} handleFav={handleFav} searchWord={searchWord} setSearchWord={setSearchWord} searchTracks={searchTracks} />
        <div className='tracks__absolute'>
          <div className='tracks__display'>
            <div className="tracks__title">
              <h2 className="tittle">Uploaded</h2>
              {/* <Link className='link' to="/track/add"> */}
              <button className="button" onClick={modalOneOpen}>Upload Song</button>
              <img className="upload" src={upload} alt="Upload" />
              {/* </Link> */}
            </div>
            <TrackRows totalTracks={totalTracks} state={state} />
          </div>
          <div className='dashboard__side'>
            <Genres />
            <Albums />
          </div>
        </div>
        <Modal isOpen={modalIsOpen} style={resetModalStyle()}>
          <div className="songs__modal__background">

            <div className="songs__modal__container">
              <h1 className="header">Add New Track</h1>
              <div className="close"><img src={close} onClick={() => setModalIsOpen(false)} alt="Close the modal" /></div>
              <div className="form__container ">
                <form className="form" encType="multipart/form-data">
                  <div className="form__items">
                    <div className="drag__area">
                      <h3>Drag your track here</h3>
                      <p>or</p>
                      <label htmlFor="track"><p className='file'>Select a file</p></label>
                      <input
                        type="file"
                        className="form__input"
                        placeholder="Url"
                        name="urlTrack"
                        id="track"
                      />
                    </div>
                    <div className="form__inputs">
                      <input
                        type="text"
                        className="form__input"
                        placeholder="Title"
                        name="title"
                      />
                      {/*errors.title && <p>{errors.title}</p>*/}
                      <input
                        type="text"
                        className="form__input"
                        placeholder="Album"
                        name="album"
                      />
                      <input
                        type="text"
                        className="form__input"
                        placeholder="Artist"
                        name="artist"
                      />
                      <label htmlFor="genre">Genre: </label>
                      <select name="genre"
                      >
                        {/*genreOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))*/}
                      </select>
                      {/*errors.genre && <p>{errors.genre}</p>*/}
                      <button className="button" type="button" onClick={modalTwoOpen}>Next</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>

        <Modal isOpen={openModalTwo} className="songs__modal__absolute">
          <div className="songs__modal__background">
            <div className="songs__modal__container">
              <div className="form__container ">
                <form className="form" encType="multipart/form-data">
                  <h1 className="header">Add a photo for the track</h1>
                  <div className="close"><img src={close} onClick={() => setOpenModalTwo(false)} alt="Close the modal" /></div>

                  <div className="form__items__cover">
                    <div className="drag__area">
                      <h3>Drag the track's cover here</h3>
                      <p>or</p>
                      <label htmlFor="track"><p className='file'>Select a file</p></label>
                      <input
                        type="file"
                        className="form__input"
                        placeholder="Url"
                        name="urlTrack"
                        id="track"
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

        </Modal>




      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    allTracks: state.track.allTracks,
    myTracks: state.track.myTracks,
    favTracksByUser: state.track.favTracksByUser,
  }
}

const reduxHoc = connect(mapStateToProps)

export default reduxHoc(TrackPage);