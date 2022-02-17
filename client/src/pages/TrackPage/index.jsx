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
import trackValidation from "../../utils/validation/trackValidation"
import genreOptions from "./genreOptions.js";



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

  const [values, setValues] = useState({
    title: "",
    reproductions: "",
    artist: "",
    album: "",
    genre: "",
    duration: "",
    photoTrack: "",
    urlTrack: "",
    firebaseUser: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {

    setErrors(trackValidation(values))

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("album", values.album);
    formData.append("artist", values.artist);
    formData.append("genre", values.genre);
    formData.append("urlTrack", values.urlTrack);
    formData.append("firebaseUser", userId); // Firebase Identifier
    // console.log(Object.fromEntries(formData.entries()));

    try {
      const track = await axios.post(`${process.env.REACT_APP_API_URL}/api/tracks`, formData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })

      sessionStorage.setItem("trackId", track.data.track._id)
      console.log(track.data.track._id)

    } catch (e) {
      console.log(e.message);
    }
  }

  const handleSubmitThumbnail = async () => {
    try {
      const formData = new FormData()
      formData.append("photoTrack", values.photoTrack);

      await axios.put(`${process.env.REACT_APP_API_URL}/api/tracks/uploadThumbnail/${sessionStorage.getItem("trackId")}`, formData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      navigate("/")
    } catch (e) {
      console.log(e.message);
    }
  }

  const onChange = (name) => (e) => {
    const value = name === "photoTrack" || name === "urlTrack" ? e.target.files[0] : e.target.value;
    setValues({ ...values, [name]: value })
  }
  const modalOneOpen = () => {
    setModalIsOpen(true)
    setOpenModalTwo(false)

  }
  const modalTwoOpen = () => {
    // SEND TRACK + INFO
    handleSubmit()
    setModalIsOpen(false)
    setOpenModalTwo(true)
  }

  const uploadThumbnail = () => {
    handleSubmitThumbnail()
    setOpenModalTwo(false)
  }

  const onChangeThumbnail = (name) => (e) => {
    const value = name === "photoTrack" ? e.target.files[0] : e.target.value;
    setValues({ ...values, [name]: value })
  }

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
        <Modal isOpen={modalIsOpen} className="songs__modal__absolute">
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
                        onChange={onChange("urlTrack")}
                      />
                    </div>
                    <div className="form__inputs">
                      <input
                        type="text"
                        className="form__input"
                        placeholder="Title"
                        name="title"
                        value={values.title}
                        onChange={onChange("title")}

                      />
                      {errors.title && <p>{errors.title}</p>}
                      <input
                        type="text"
                        className="form__input"
                        placeholder="Album"
                        name="album"
                        value={values.album}

                        onChange={onChange("album")}
                      />
                      {errors.album && <p>{errors.album}</p>}

                      <input
                        type="text"
                        className="form__input"
                        placeholder="Artist"
                        name="artist"
                        value={values.artist}
                        onChange={onChange("artist")}
                      />
                      {errors.artist && <p>{errors.artist}</p>}

                      <label htmlFor="genre">Genre: </label>
                      <select name="genre"
                      >
                        {genreOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                      {errors.genre && <p>{errors.genre}</p>}
                      <button className="button" type="submit" onClick={modalTwoOpen}>Next</button>
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
                        name="photoTrack"
                        id="track"
                        onChange={onChangeThumbnail("photoTrack")}
                      />
                    </div>
                    <div className="form__inputs">
                      <button className="button" type="submit" onClick={uploadThumbnail}>Submit</button>
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