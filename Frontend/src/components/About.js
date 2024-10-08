import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="container mt-5 ">
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="card shadow bg-custom-rose">
                        <div className="card-body">
                            <h2 className="card-title text-center">About SecureNotes</h2>
                            <p className="card-text mt-4">
                                Welcome to <strong>SecureNotes</strong>, your personal digital notebook designed to help you efficiently store, create, and manage your notes. Whether you're jotting down thoughts, keeping track of important information, or organizing your daily tasks, SecureNotes is your go-to solution.
                            </p>
                            <h4 className="mt-4">Features:</h4>
                            <ul className="list-group">
                                <li className="list-group-item bg-custom-rose border-dark">Create new notes with ease and flexibility.</li>
                                <li className="list-group-item bg-custom-rose border-dark">Delete notes you no longer need to keep your notebook organized.</li>
                                <li className="list-group-item bg-custom-rose border-dark">Search through your notes quickly to find exactly what you need.</li>
                                <li className="list-group-item bg-custom-rose border-dark">Edit existing notes to update or change information.</li>
                            </ul>   
                            <h4 className="mt-4">Benefits:</h4>
                            <p>
                                SecureNotes is built to enhance your productivity and ensure that all your important information is just a click away. With a user-friendly interface and intuitive features, managing your notes has never been simpler.
                            </p>
                            <h4 className="mt-4">Get Started:</h4>
                            <p>
                                Experience the convenience of SecureNotes today. Begin by creating your first note and discover how easy it is to keep everything organized.
                            </p>
                            <Link to="/" className="btn btn-primary btn-block mt-4">Get Started</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
