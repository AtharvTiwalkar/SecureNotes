import React, { useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useState } from "react";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    getNotes()
  }, [])  //[] means no of times to run
  const ref = useRef(null);//with the help of useRef we can give the reference to the component or div or element 
  const refClose = useRef(null);


  const [note, setNote] = useState({ id: " ", title: " ", description: " ", tag: " " })

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, title: currentNote.title, description: currentNote.description, tag: currentNote.tag })
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })//... it means ovewrite the content 
  }
  const handleClick = (e) => {
    console.log("Updating the Notes", note)
    editNote(note.id, note.title, note.description, note.tag)
    refClose.current.click();
  }

  return (
    <>
      <AddNote />


      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className="container">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} name="title" onChange={onChange} minLength={5} required  />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange} minLength={5} required  />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" value={note.tag} className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                  </div>
                </form>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" ref={refClose} class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={handleClick} class="btn btn-primary">Update Notes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="container">
          {notes.length == 0 && "No notes to display"}
        </div>
        {
          notes.map((note) => {
            return <Noteitem key={note._id} note={note} updateNote={updateNote} /> /*note.title*/;
          })
        }

      </div>


    </>
  );
};

export default Notes;
