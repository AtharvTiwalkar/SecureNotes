import { useState } from "react";
import NoteContext from "./noteContext";
//import { useState } from "react";
const host = "http://localhost:5000";
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
  
  //Get all Notes
  const getNotes= async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NWE0ZThkYWI2NDMxNTk5OGNiMmExIn0sImlhdCI6MTcyMDEyMzgxMH0.0VuJ1aoVpIr9dmGy8EmJOBNxlkK0PVhewmYU3XQJmGg",
      },
    });
    const json=await response.json();
    console.log(json);
    setNotes(json);
  };
  //Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NWE0ZThkYWI2NDMxNTk5OGNiMmExIn0sImlhdCI6MTcyMDEyMzgxMH0.0VuJ1aoVpIr9dmGy8EmJOBNxlkK0PVhewmYU3XQJmGg",
      },
      body: JSON.stringify({ title, description, tag }),
      //note: if something come->not a function error etc their may be chance of syntax error
    });
    const json = response.json();
    const note = {
      _id: "66871f5b2c61a42c8281ac0d3",
      user: "6685a4e8dab64315998cb2a1",
      title: title,
      description: description,
      tag: "now or never",
      date: "2024-07-04T22:16:59.642Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete a Note
  const deleteNote = (_id) => {
    console.log("deleting the note with id" + _id);
    const newNote = notes.filter((note) => {
      return note._id != _id;
    });
    setNotes(newNote);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4NWE0ZThkYWI2NDMxNTk5OGNiMmExIn0sImlhdCI6MTcyMDEyMzgxMH0.0VuJ1aoVpIr9dmGy8EmJOBNxlkK0PVhewmYU3XQJmGg",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    //logic to edit at client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote,getNotes }} /*value={{state,update}}*/
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
