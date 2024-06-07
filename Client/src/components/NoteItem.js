
import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'


const NoteItem = (props) => {
  let context = useContext(noteContext)
  // const {notes}=context;

  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className='col-md-4'>
      <div className="card" >

        <div className="card-body ">
          <h5 className="card-title">{note.title}
            <div className='d-flex justify-content-end'>
              <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id) }}></i>
              <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote(note) }}></i>
            </div>

          </h5>

          <p className="card-text">{note.description}</p>
         
        </div>
      </div>
    </div>
  )
}

export default NoteItem
