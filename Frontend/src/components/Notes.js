import React, { useContext, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();


  useEffect(() => {

    if (localStorage.getItem('token')) {
      getNotes()
    } else {
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
    props.showAlert("Updated successfully", "success")
  }

  return (
    <>

      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content  bg-custom-purple text-dark">
            <div className="modal-header border-dark">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Your Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <form>
                  <div className="mb-3 ">
                    <label htmlFor="title" className="form-label" minLength={5} required>Title</label>
                    <textarea type="text" className="form-control border-dark bg-custom-purple   " id="title" value={note.title} name="title" onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label" minLength={5} required>Description</label>
                    <textarea type="text" className="form-control border-dark bg-custom-purple  " id="description" value={note.description} name="description" onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" value={note.tag} className="form-label">Tag</label>
                    <textarea type="text" className="form-control border-dark bg-custom-purple  " id="tag" name="tag" value={note.tag} onChange={onChange} />
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer border-dark ">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.title.length < 5 || note.description.length < 5} onClick={handleClick} className="btn btn-primary">Update Notes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        {notes.length === 0 ? (
          <div className="container text-center my-5 no-notes-container">
            <h1 className="quote animate__animated animate__fadeIn">
              "Every great achievement begins with a blank page. Let your thoughts flow, and your ideas take shape. The first step is always the hardest, but it's also the most important. Start your journey now."
            </h1>
            <button
              className="btn btn-gradient mt-4 animate__animated animate__pulse animate__infinite"
              onClick={() => navigate('/AddNote')}
            >
              Add Your First Note
            </button>
          </div>
        ) : null}


        {
          notes.map((note) => {
            return <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} /> /*note.title*/;
          })
        }

      </div>
      <div className="container">
        {notes.length ? (<button
          className="btn btn-gradient mt-4 animate__animated animate__pulse animate__infinite"
          onClick={() => navigate('/AddNote')} // Adjust the navigation logic as needed
        >
          Add Note
        </button>
        ) : null}
      </div>


    </>
  );
};

export default Notes;
