import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { HashRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/notes/noteState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useState } from "react";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000)
  }
  return (
    <>
      <NoteState>
        <HashRouter>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} > </Route>
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} />} ></Route>
            </Routes>
          </div>
        </HashRouter>
      </NoteState>
    </>
  );
}

export default App;
