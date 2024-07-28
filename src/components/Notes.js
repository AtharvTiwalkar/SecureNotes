import React, { useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  let navigate=useNavigate();

  
  useEffect(() => {
    
    if(localStorage.getItem('token')){
      getNotes()
    }else{
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []) 
  
  //[] means no of times to run
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
    props.showAlert("Updated successfully","success")
  }

  return (
    <>
      
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Your Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label" minLength={5} required>Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} name="title" onChange={onChange}   />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label" minLength={5} required>Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChange}   />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" value={note.tag} className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.title.length<5||note.description.length<5} onClick={handleClick} className="btn btn-primary">Update Notes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {
          notes.map((note) => {
            return <Noteitem key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote} /> /*note.title*/;
          })
        }
        {/* sometime try to clear the cache of the browser if getting errro */}
      </div>


    </>
  );
};

export default Notes;
