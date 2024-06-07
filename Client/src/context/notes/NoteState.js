import React, { useState } from "react";
import NoteContext from "./noteContext";


// import { useState } from "react";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const noteinitial = []
  const [notes, setNotes] = useState(noteinitial)

  // get all note 
  const getNotes = async () => {
    // API call 
    const url = `${host}/api/notes/fetchallnotes`
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json)

    setNotes(json)
  }


  // Add a note 

  const addNote = async (title, description, tag) => {
    // API call 
    const url = `${host}/api/notes/addnote`
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    // console.log(json)
    console.log("adding a new note");
    // const note = {

    //   "title": title,
    //   "description": description,
    //   "tag": tag,

    // };
    setNotes(notes.concat(note))
  }


  // Delete a note
  const deleteNote = async (id) => {
    console.log("deleting the node with id" + id)

    const url = `${host}/api/notes/deletenote/${id}`

    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },


    });
    console.log("note deleted of id" + id)
    const json = response.json();
    console.log(json)
    const newNotes = notes.filter(note => {
      return note._id !== id
    })
    setNotes(newNotes)

  }

  //edit a note
  const editNote = async (id, title, description, tag) => {
    // API call
    const url = `${host}/api/notes/updatenote/${id}`
    console.log(id);
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },

      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
  
        break;
      }
      setNotes(newNotes)
    }

  }
  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }} >
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;