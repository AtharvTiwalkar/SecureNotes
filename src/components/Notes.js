import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, setNotes,getNotes } = context;
  useEffect(()=>{
    getNotes()
  },[])  //[] means no of times to run

  return (
    <>
      <AddNote/>
      <div className="row">
        <h2 className="my-3">Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} /> /*note.title*/;
        })}
      </div>
    </>
  );
};

export default Notes;
