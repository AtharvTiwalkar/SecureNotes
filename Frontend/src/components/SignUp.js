import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {

  const [credentials, setCredentials] = useState({ name: " ", email: " ", password: " ", cpassword: " " });
  let navigate = useNavigate();


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch('https://inotebook-frontend-backend-5.onrender.com/api/auth/createuser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    })
    const json = await response.json();
    if (json.success) {
      //Save the auth token and redirect
      console.log(json);
      localStorage.setItem('token', json.authtoken)
      navigate('/')
      props.showAlert("Account created successfully","success")
    } else {
      console.log(json);
      props.showAlert(json.error,"danger")
    }

  }
  return (
    <div onSubmit={handleSubmit}>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" autocomplete="off" className="form-control bg-custom-orange border-dark" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" autocomplete="off" className="form-control bg-custom-orange border-dark" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" minLength={1} required/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" autocomplete="off" className="form-control bg-custom-orange border-dark" name="password" onChange={onChange} id="password" minLength={5} required />
          <div id="emailHelp" className="form-text">Password should be of 5 character and try to keep it strong.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" autocomplete="off" className="form-control bg-custom-orange border-dark" name="cpassword" onChange={onChange} id="cpassword" minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
