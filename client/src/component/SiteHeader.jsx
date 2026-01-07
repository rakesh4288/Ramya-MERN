import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/react.svg';

const SiteHeader = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top navBg" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="logo" className='App-logo'/>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/employee-list">Employee List</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/create-new-employee">Create Employee</NavLink>
                        </li>
                        
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </Link>

                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" to="#">Action</Link>
                                </li>
                                
                                <li>
                                    <Link className="dropdown-item" to="#">Another action</Link>
                                </li>
                                
                                <li>
                                    <Link className="dropdown-item" to="#">Something else here</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default SiteHeader;