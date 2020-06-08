import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from './api';


const User = props => (
    <tr>
      <td>{props.user.username}</td>      
      <td>
        <a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a>
      </td>
    </tr>
  )


export default class CreateUser extends Component {
    constructor(props){        
        super(props);

        this.state = {
            username: '',
            users: []
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);    
        this.userList = this.userList.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }


    componentDidMount() {
        axios.get(API_URL + 'users/')
            .then(res => {
                this.setState({users: res.data})
            })
            .catch(err => console.log('Error: ' + err))
    }


    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }

    
    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
        }
        
        axios.post(API_URL + 'users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            username: ''
        });
    }


    deleteUser(id) {
/*         axios.delete(API_URL + 'users/' + id)
            .then(res => console.log(res.data));

        this.setState({
            users: this.state.users.filter(el => el._id !== id)
        }) */
        console.log('Not yet implemented');
    }


    userList() {
        return this.state.users.map(currentuser => {
          return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id}/>;
        })
      }


    render() {
        return (
            <div>
              <h3>Create New User</h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                  <label>Username: </label>
                  <input  type="text"
                      required
                      className="form-control"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      />
                </div>
                <div className="form-group">
                  <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
              </form>
              <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>User</th>                  
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.userList() }
              </tbody>
            </table>
            </div>
          )
    }
}