import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

//Import individual components
import Navbar from "./components/navbar.component";
import ExerciseLog from "./components/exercise-log.component";
import EditEntry from "./components/edit-entry.component";
import AddEntry from "./components/add-entry.component";
import Users from "./components/users.component";
import Activities from "./components/activities.component";


function App() {
  return (
    <Router>
      <div className="container">      
        <Navbar />
        <br />
        <Route path="/" exact component={ExerciseLog} />
        <Route path="/edit/:id" component={EditEntry} />
        <Route path="/create" component={AddEntry} />
        <Route path="/user" component={Users} />      
        <Route path="/calories" component={Activities} />
      </div>
    </Router>
  );
}

export default App;
