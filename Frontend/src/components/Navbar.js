import React from 'react'
// import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'

function Navbar() {
  let navigate=useNavigate()
  let location = useLocation();
  
  let handleLogout=(e)=>{
    e.preventDefault();//when sometime page doesn't change use this 
    localStorage.removeItem('token')
    navigate('/login')
    
  }

  // useEffect(()=>{
  //   console.log(location.pathname);
  // },[location]);

  return (
    <div>
  <nav className="navbar navbar-expand-lg bg-custom-purple ">
    <div className="container-fluid"> 
      <Link className="navbar-brand text-dark" to="/">SecureNotes</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""} `} to="/">YourNotes</Link>
          </li>
          <li className="nav-item ">
            <Link className={`nav-link ${location.pathname === "/AddNote" ? "active" : ""} `} aria-current="page" to="/AddNote">AddNote</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""} `} to="/about">About</Link>
          </li>
        </ul>
        
        {!localStorage.getItem('token') ? (
          <form className="d-flex" role="search">
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary" to="/signup" role="button">SignUp</Link>
          </form>
        ) : (
          <button className="btn btn-primary" onClick={handleLogout} role="button">LogOut</button>
        )}
      </div>
    </div>
  </nav>
</div>

  )
}

export default Navbar
