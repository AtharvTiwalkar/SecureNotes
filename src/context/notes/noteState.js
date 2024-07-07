import NoteContext from "./noteContext";
// import { useState } from "react";
const NoteState =(props)=>{
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
    return (
        <NoteContext.Provider /*value={{state,update}}*/>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;