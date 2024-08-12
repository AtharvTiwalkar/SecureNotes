import { useState } from "react";
import NoteContext from "./noteContext";
import Loader from "../../components/Loader";

//import { useState } from "react";
const host = "https://inotebook-frontend-backend-5.onrender.com";
const NoteState = (props) => {
  // const s1={
  //     "name":"Atharv",
  //     "class":"ty"
  // }
  // const [state,setState]=useState(s1);
  // const update=()=>{
  //     setTimeout(()=>{
  //         setState({
  //             "name":"Harish",
  //             "class":"12th"
  //         })
  //     },1000)
  // }
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
//loader
  const [loading, setLoading] = useState(false);



  //Get all Notes
  const getNotes = async () => {
    await setLoading(true);
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
    setLoading(false);
  };
  //Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),//hardcoding of the auth token is not proper way use local storage 
      },
      
      body: JSON.stringify({ title, description, tag }),
      //note: if something come->not a function error etc their may be chance of syntax error
    });
    const note = await response.json();

    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = async (_id) => {
    //API calls
    const response = await fetch(`${host}/api/notes/deletenote/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },

    });
    console.log(response);
    console.log("deleting the note with id" + _id);
    const newNote = notes.filter((note) => {
      return note._id !== _id;
    });
    setNotes(newNote);

  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log(response);

    //logic to edit at client
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {

      if (newNotes[index]._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, getNotes, editNote }} /*value={{state,update}}*/
    >
      {loading && <Loader />}
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
