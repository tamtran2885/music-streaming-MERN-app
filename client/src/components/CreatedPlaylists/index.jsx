import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import CreatedPlaylist from '../CreatedPlaylist';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import MusicPlayer from '../../components/MusicPlayer';

const CreatedPlaylists = ({totalMyPlaylists, followingPlaylists}) => {

  const [myCreatedPlaylists, setMyCreatedPlaylists] = useState([])
  const [myFollowingPlaylists, setMyFollowingPlaylists] = useState([])
  useEffect(() => {
    setMyCreatedPlaylists(totalMyPlaylists)
    setMyFollowingPlaylists(followingPlaylists)
  }, [setMyCreatedPlaylists, totalMyPlaylists, followingPlaylists])

  // console.log(myFollowingPlaylists)

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
          <Link to="/playlist/add">
          <button>Create a playlist</button>
          </Link>
        </div>
        <Droppable className='droppable__absolute' droppableId="droppable-1">
          {(provided, _) => (
            <div className='droppable__container' ref={provided.innerRef} {...provided.droppableProps}>
              {myCreatedPlaylists && myCreatedPlaylists.map((playlist, index) => (
                <div key={playlist._id} className='droppable__single'>
                  <Draggable className='draggable__absolute' key={playlist._id} draggableId={'draggable-'+playlist.rating} index={index}>
                    {(provided, snapshot) => (
                      <div className='createdplaylists__container'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style, boxShadow: snapshot.isDragging ? "0 0 0.5rem #666" : "none"}}
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
                  <Draggable className='draggable__absolute' key={playlist._id} draggableId={'draggable-'+playlist.rating} index={index}>
                    {(provided, snapshot) => (
                      <div className='createdplaylists__container'
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style, boxShadow: snapshot.isDragging ? "0 0 0.5rem #666" : "none"}}
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
    </div>
    
    <MusicPlayer />
  </>
  )
}

export default CreatedPlaylists;