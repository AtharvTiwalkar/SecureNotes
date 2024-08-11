import React, { useState } from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';

const AddNote = (props) => {
  
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note,setNote]=useState({title:" ",description:" ",tag:" "})

  const handleClick=(e)=>{
    e.preventDefault();//this is the function use to prevent default page reloading 
    addNote(note.title,note.description,note.tag);
    setNote({title:" ",description:" ",tag:" "})
    props.showAlert("Added successfully","success");
  }

  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})//... it means ovewrite the content 
  }

  return (
    <>
    <div>
     <h2 className='my-3'>Add a Note</h2> 
      <form className='my-0'>
        <div className="mb-3 ">
          <label htmlFor="title" className="form-label" >Title</label>
          <textarea type="text" autocomplete="off" className="form-control bg-custom-orange border-dark" id="title" name="title" onChange={onChange} value={note.title} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label" >Description</label>
          <textarea type="text" autocomplete="off" className="form-control bg-custom-orange border-dark" id="description" name="description" onChange={onChange} value={note.description}  />
          <div id="emailHelp" className="form-text">Enter atleast 5 characters.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <textarea type="text" autocomplete="off" className="form-control bg-custom-orange border-dark" id="tag" name="tag" onChange={onChange} value={note.tag}/>
        </div>

        <button type="submit" disabled={note.title.length<5||note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
    </div>
    </>
    
  )
}

export default AddNote
