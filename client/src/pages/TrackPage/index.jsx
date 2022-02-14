import React from "react";
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Genres from '../../components/Genres';
import Albums from '../../components/Albums';
import MusicPlayer from '../../components/MusicPlayer';
import TrackRows from "../../components/TrackRows";
import upload from "../../assets/images/upload.svg";
import close from "../../assets/images/close.svg";

import { useAuth } from "../../context/authContext";

const TrackPage = () => {
    const { user } = useAuth();

    // const token = user.accessToken;
    // console.log(token)


    return (
      <>
        <div className='dashboard__background'>
          <Navbar page="Songs" />
          <div className='tracks__absolute'>
            <div className='tracks__display'>
              <div className="tracks__title">
                <h2 className="tittle">Uploaded</h2>
                <Link className='link' to="/track/add">
                  <button className="button">Upload Song</button>
                  <img className="upload" src={upload} alt="Upload" />
                </Link>
              </div>
              <TrackRows />
            </div>
            <div className='dashboard__side'>
              <Genres />
              <Albums />
            </div>
          </div>
          <div className="songs__modal__absolute">
            <div className="songs__modal__background">
              <div className="sogs__modal__container">
                <h1 className="header">Add New Track</h1>
                <div className="close"><img src={close} alt="Close the modal" /></div>
                <div className="form__container">
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
                        <button className="button" type="submit">Submit</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <MusicPlayer />
      </div>
    </>
    )
}

export default TrackPage;