import Notes from "./Notes";
import noteContext from "../context/notes/noteContext";

export default function Home(props) {
  const {showAlert}=props;
  return (
    <div className="container my-4">
        <Notes showAlert={showAlert}/>
    </div>
  )
}
