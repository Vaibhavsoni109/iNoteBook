import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
// import Images from './Images';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const navigate = useNavigate();
  useEffect(() => {

    if (localStorage.getItem('token')) {

      // console.log(localStorage.getItem('token'))
      getNotes();
      //eslint-disable-next-line
    }
    else {
      navigate('/login')
    }
  }, []);


  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const onChange = (e) => {
    setNote({
      ...note, [e.target.name]: e.target.value
    })
  }
  const handleClick = (e) => {
    console.log("updating notes", note);
    e.preventDefault();
    setShowModal(false)
    editNote(note.id, note.etitle, note.edescription, note.etag)

  }

  const updateNote = (currentnote) => {
    setShowModal(true); // Set showModal state to true to open the modal
    setNote({ id: currentnote._id, etitle: currentnote.title, edescription: currentnote.description, etag: currentnote.tag });
  };

  return (
    <>
      <Addnote />

      {/* Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Edit</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="mb-3 my-3">
                <label htmlFor="etitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name='etitle' placeholder="name@example.com" value={note.etitle} onChange={onChange} minLength={3} required />
              </div>
              <div className="mb-3">
                <label htmlFor="edescription" className="form-label">Enter Your note here</label>
                <textarea className="form-control" id="edescription" value={note.edescription} name='edescription' rows="3" onChange={onChange} minLength={5} required ></textarea>

              </div>
              <div className="mb-3">
                <label htmlFor="etag" className="form-label">Enter Your tag</label>
                <input type='text' className="form-control" value={note.etag} id="etag" name='etag' rows="3" onChange={onChange} />

              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              <button disabled={note.etitle.length < 3 || note.edescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick} >Update changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h1>Your notes</h1>
        {notes.length === 0 && "no notes to display"}
        {notes.map((note) => (
          <NoteItem key={note._id} updateNote={updateNote} note={note} />
        ))}
      </div>
      <h2>Image section Comming Soon......</h2>
      {/* <div className='my-4'>
        <h2>Images here</h2>
        <Images/>
      </div> */}
    </>
  );
};

export default Notes;
