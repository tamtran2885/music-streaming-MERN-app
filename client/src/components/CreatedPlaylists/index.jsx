import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import CreatedPlaylist from '../CreatedPlaylist';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';

const CreatedPlaylists = ({myPlaylists}) => {

  const [myCreatedPlaylists, setMyCreatedPlaylists] = useState([])
  useEffect(() => {
    setMyCreatedPlaylists(myPlaylists)
  }, [setMyCreatedPlaylists, myPlaylists])

  console.log(myCreatedPlaylists)

  return (
    <>
        <DragDropContext 
            onDragEnd={(param) => {
                const srcI = param.source.index;
                const desI = param.destination?.index;
                myCreatedPlaylists.splice(desI, 0, myCreatedPlaylists.splice(srcI, 1)[0]);
                console.log(param)
            }}
        >
            <div className='playlists__absolute'>
                <div className='playlists__tittle'>
                <h2> Created Playlists</h2>
                <Link className='link' to={`/user/playlists`}>See All</Link>
                </div>
                    <Droppable droppableId="droppable-1">
                        {(provided, _) => (
                            <div className='playlists__container' ref={provided.innerRef} {...provided.droppableProps}>
                                {myCreatedPlaylists && myCreatedPlaylists.map((playlist, index) => (
                                    <div className='playlist__container' key={playlist._id}>
                                        <Draggable key={playlist._id} draggableId={'draggable-'+playlist.rating} index={index}>
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{ ...provided.draggableProps.style, boxShadow: snapshot.isDragging ? "0 0 0.5rem #666" : "none"}}
                                                    >
                                                    <CreatedPlaylist key={playlist._id} playlist={playlist} />
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
    </>
  )
}

export default CreatedPlaylists;