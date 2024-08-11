import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';




const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })//... it means ovewrite the content 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://inotebook-frontend-backend-5.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        }
        )
        const json = await response.json()
        console.log(json);
        if (json.success) {
            //Save the auth token and redirect
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Logged in successfully", "success")
            navigate('/')

        } else {
            props.showAlert("Invalid credentials", "danger");
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" autocomplete="off" className="form-control bg-custom-orange border-dark" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" minLength={1} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>                
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" autocomplete="off" name="password" onChange={onChange} value={credentials.password} className="form-control bg-custom-orange border-dark" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>

            </form>
        </div>
    )
}

export default Login
