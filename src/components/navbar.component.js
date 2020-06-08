import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
        //review bootstrap docs later to modify css, placeholder from documentation below modified to work with react        
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">NorkettFit</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Exercise Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Add Log Entry</Link>
          </li>
          <li className="navbar-item">
          <Link to="/calories" className="nav-link">Activities</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Users</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}