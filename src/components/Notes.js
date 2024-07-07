import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div className="row">
      <h2 className="my-3">Your Notes</h2>
      {notes.map((note) => {
        return <Noteitem note={note}/>/*note.title*/;
      })}
    </div>
  );
};

export default Notes;
