import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash-can my-1 mx-3" onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted successfully", "success");
            }}></i>
            <i className="fa-solid fa-pen-to-square my-1 mx-2" onClick={() => {
              updateNote(note);
            }}></i>
          </div>

          <p className="card-text">
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
