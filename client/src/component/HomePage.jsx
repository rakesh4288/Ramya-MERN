import React from "react";
import { Link } from "react-router-dom";
import AppImages from "../assets";

const HomePage = () => {
    return (
        <div id="home-page">
            <section className="pageHeader">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h5 className="pageHeading"> Ramya MERN </h5>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h6>Node.js is an open source server environment.</h6>
                        <h6>Node.js allows you to run the JavaScript on the server side.</h6>
                        <br /><br />
                        <h5>What is Node.js?</h5>
                        <ul>
                            <li>Node.js is an open source server environment</li>
                            <li>Node.js is free to use</li>
                            <li>Node.js runs on various platforms like <i>Windows, Linux, Unix, Mac OS X, etc.</i></li>
                            <li>Node.js uses JavaScript on the server side</li>
                        </ul>

                        <div className="alert alert-warning">
                            Node.js uses asynchronous programming!
                        </div>
                    </div>

                    <div className="col-md-6">
                        <img src={AppImages.nodeJsTech} alt="node-js" className="img-fluid" /> <br/><br/>
                        <div className="alert alert-success">
                            import 'bootstrap-icons/font/bootstrap-icons.css'; <br />
                            <Link to="https://icons.getbootstrap.com/" target="_blank">
                                https://icons.getbootstrap.com/
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="bg-primary" />

            <section className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h4>Why Node.js?</h4>
                        <p className="alert alert-info">
                            A common task for a web server can be to open a file on the server and return the content to the client.
                        </p>

                        <h6>Here is how PHP or ASP handles a file request:</h6>
                        <ol>
                            <li>Sends the task to the computer's file system.</li>
                            <li>Waits while the file system opens and reads the file.</li>
                            <li>Returns the content to the client.</li>
                            <li>Ready to handle the next request.</li>
                        </ol>

                        <h6>Here is how Node.js handles a file request:</h6>
                        <ol>
                            <li>Sends the task to the computer's file system.</li>
                            <li>Ready to handle the next request.</li>
                            <li>When the file system has opened and read the file, the server returns the content to the client.</li>
                        </ol>

                        <p>Node.js eliminates the waiting, and simply continues with the next request.</p>
                        <p>Node.js runs single-threaded, non-blocking, asynchronous programming, which is very memory efficient.</p>
                    </div>
                </div>

                <hr />

                <div className="row">
                    <div className="col-md-6">
                        <h5>What Can Node.js Do?</h5>
                        <ul>
                            <li>Node.js can generate dynamic page content</li>
                            <li>Node.js can create, open, read, write, delete, and close files on the server</li>
                            <li>Node.js can collect form data</li>
                            <li>Node.js can add, delete, modify data in your database</li>
                        </ul>
                    </div>

                    <div className="col-md-6">
                        <h5>What is a Node.js File?</h5>
                        <ul>
                            <li>Node.js files contain tasks that will be executed on certain events</li>
                            <li>A typical event is someone trying to access a port on the server</li>
                            <li>Node.js files must be initiated on the server before having any effect</li>
                            <li>Node.js files have extension ".js"</li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage;