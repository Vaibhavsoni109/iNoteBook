import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext'
const Addnote = () => {
  let context = useContext(noteContext)
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })
  }

  const onChange = (e) => {
    setNote({
      ...note, [e.target.name]: e.target.value
    })
  }
  return (
    <div className='container my-4'>

      <h1>Add a Note</h1>
      <div className="mb-3 my-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name='title' onChange={onChange} minLength={3} required value={note.title} />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Enter Your note here</label>
        <textarea className="form-control" id="description" name='description' rows="3" onChange={onChange} minLength={5} required value={note.description}></textarea>

      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">Enter Your tag</label>
        <input type='text' className="form-control" id="tag" name='tag' rows="3" onChange={onChange} value={note.tag} />

      </div>
      <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>

    </div>
  )
}

export default Addnote
