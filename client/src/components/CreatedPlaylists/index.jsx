import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CreatedPlaylist from '../CreatedPlaylist';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import close from '../../assets/images/close.svg';
import upload from "../../assets/images/upload.svg";
import Modal from "react-modal"
import axios from "axios"

const CreatedPlaylists = ({ totalMyPlaylists, followingPlaylists }) => {
  const [myCreatedPlaylists, setMyCreatedPlaylists] = useState([])
  const [myFollowingPlaylists, setMyFollowingPlaylists] = useState([])

  useEffect(() => {
    setMyCreatedPlaylists(totalMyPlaylists)
    setMyFollowingPlaylists(followingPlaylists)
  }, [setMyCreatedPlaylists, totalMyPlaylists, followingPlaylists])

  // console.log(myFollowingPlaylists)

  const navigate = useNavigate()

  //? OPEN MODAL
  const [openModal, setOpenModal] = useState(false);


  const [values, setValues] = useState({
    title: "",
    description: "",
    thumbnail: "",
    numberSongs: "",
    followers: "",
    rating: "",
    tracks: [],
    followedBy: []
  });

  // // const [errors, setErrors] = useState({});


  const handleSubmit = async () => {

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("thumbnail", values.thumbnail);
    formData.append("firebaseUser", sessionStorage.getItem("userId"));
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/playlists`, formData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      setOpenModal(false)
      navigate("/playlists")
    } catch (error) {
      console.error(error.message);
    }
  }

  const onChange = (name) => (e) => {
    const value = name === "thumbnail" ? e.target.files[0] : e.target.value;
    setValues({ ...values, [name]: value })

  }

  return (
    <><div className='created__playlists__absolute'>
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          myCreatedPlaylists.splice(desI, 0, myCreatedPlaylists.splice(srcI, 1)[0]);
          console.log(param)
        }}
      >
        <div className='playlists__absolute'>
          <div className='playlist__tittle'>
            <h2>My Playlist</h2>
            <div>
              <button onClick={() => setOpenModal(true)}>Create a playlist</button>
              <img className="upload" src={upload} alt="Upload" />
            </div>
          </div>
          <Droppable className='droppable__absolute' droppableId="droppable-1">
            {(provided, _) => (
              <div className='droppable__container' ref={provided.innerRef} {...provided.droppableProps}>
                {myCreatedPlaylists && myCreatedPlaylists.map((playlist, index) => (
                  <div key={playlist._id} className='droppable__single'>
                    <Draggable className='draggable__absolute' key={playlist._id} draggableId={'draggable-' + playlist.rating} index={index}>
                      {(provided, snapshot) => (
                        <div className='createdplaylists__container'
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ ...provided.draggableProps.style, boxShadow: snapshot.isDragging ? "0 0 0.5rem #666" : "none" }}
                        >
                          <div className='playlists__container'>
                            <div className='playlist__container'>
                              <CreatedPlaylist key={playlist._id} playlist={playlist} />
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          myFollowingPlaylists.splice(desI, 0, myFollowingPlaylists.splice(srcI, 1)[0]);
          console.log(param)
        }}
      >
        <div className='playlists__absolute'>
          <div className='playlists__tittle'>
            <h2>My Following Playlists</h2>
          </div>
          <Droppable className='droppable__absolute' droppableId="droppable-1">
            {(provided, _) => (
              <div className='droppable__container' ref={provided.innerRef} {...provided.droppableProps}>
                {myFollowingPlaylists && myFollowingPlaylists.map((playlist, index) => (
                  <div key={playlist._id} className='droppable__single'>
                    <Draggable className='draggable__absolute' key={playlist._id} draggableId={'draggable-' + playlist.rating} index={index}>
                      {(provided, snapshot) => (
                        <div className='createdplaylists__container'
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{ ...provided.draggableProps.style, boxShadow: snapshot.isDragging ? "0 0 0.5rem #666" : "none" }}
                        >
                          <div className='playlists__container'>
                            <div className='playlist__container'>
                              <CreatedPlaylist key={playlist._id} playlist={playlist} />
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  </div>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      <Modal isOpen={openModal} className="songs__modal__absolute">
        <div className="songs__modal__absolute">
          <div className="songs__modal__background">
            <div className="songs__modal__container">
              <h1 className="header">Create a new Playlist</h1>
              <div className="close" ><img src={close} alt="Close the modal" /></div>
              <div className="form__container ">
                <form className="form" encType="multipart/form-data">
                  <div className="form__items">
                    <div className="drag__area">
                      <h3>Drag the playlist's cover here</h3>
                      <p>or</p>
                      <label for="cover"><p className='file'>Select a file</p></label>
                      <input
                        type="file"
                        className="form__input"
                        placeholder="Url"
                        name="thumbnail"
                        id="cover"
                        // value={values.thumbnail}
                        onChange={onChange("thumbnail")}
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
                      {/*errors.title && <p>{errors.title}</p>*/}

                      <button className="button playlist__button" type="submit" onClick={handleSubmit} >Create</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
    </>
  )
}

export default CreatedPlaylists;