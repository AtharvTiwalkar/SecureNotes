import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddNote from "./AddNote";

export default function Home(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="container my-4">
      <AddNote showAlert={props.showAlert} />
    </div>
  );
}
