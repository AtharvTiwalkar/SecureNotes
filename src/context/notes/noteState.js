import { useState } from "react";
import NoteContext from "./noteContext";
//import { useState } from "react";
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
  const notesInitial = [
    {
      _id: "66871f5b2c61a42c8281c0d3",
      user: "6685a4e8dab64315998cb2a1",
      title: "be consistent",
      description: "will become best i am the best",
      tag: "now or never",
      date: "2024-07-04T22:16:59.642Z",
      __v: 0,
    },
    {
      _id: "66871f5b2c61a42c8281c0d5",
      user: "6685a4e8dab64315998cb2a1",
      title: "be consistent",
      description: "will become best i am the best",
      tag: "now or never",
      date: "2024-07-04T22:16:59.924Z",
      __v: 0,
    },
  ];
  const [notes,setNotes]=useState(notesInitial)
  return (
    <NoteContext.Provider value={{notes}}/*value={{state,update}}*/>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
