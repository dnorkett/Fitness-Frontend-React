import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { API_URL } from './api';

console.log(API_URL)

export default class AddEntry extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            description: '',            
            duration: 0,
            date: new Date(),
            users: [],
            caloriesLookup: [],
            descriptions: []
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);        
    }


    componentDidMount() {
        axios.get(API_URL + 'users')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                        username: res.data[0].username
                    });
                }
            });

        axios.get(API_URL + 'calories')
            .then(res => {
                if (res.data.length > 0) {                    
                    this.setState({
                        caloriesLookup: res.data
                    })
                    this.setState({
                        descriptions: res.data.map(description => description.activity),
                        description: res.data[0].activity
                    })
                }
            });
    }


    onChangeUsername(e){
        this.setState({
            username: e.target.value
        });
    }


    onChangeDescription(e){
        this.setState({
            description: e.target.value
        });
    }


    onChangeDuration(e){
        this.setState({
            duration: e.target.value
        });
    }


    onChangeDate(date){
        this.setState({
            date: date
        });
    }


    onSubmit(e) {
        e.preventDefault();

        let caloriesPerHour = 0;
        
        this.state.caloriesLookup.forEach(item => {
            if (item.activity === this.state.description) {
                caloriesPerHour = item.caloriesPerHour;
            }
        });      
        
        let caloriesBurned = Math.floor(this.state.duration * caloriesPerHour / 60);        

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
            calories: caloriesBurned
        }

        
        axios.post(API_URL + 'exercises/add', exercise)
        .then(res => console.log(res.data));

        window.location = '/';          //back to home
    }


    render() {
        return (
            <div>
              <h3>Add New Entry</h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                  <label>Username: </label>
                  <select 
                      required
                      className="form-control"
                      value={this.state.username}
                      onChange={this.onChangeUsername}>
                      {
                        this.state.users.map((user) => {
                          return (
                            <option key={user} value={user}>
                                {user}
                            </option>
                        )})
                      }
                  </select>
                </div>
                <div className="form-group"> 
                  <label>Description: </label>
                  <select 
                      required
                      className="form-control"
                      value={this.state.description}
                      onChange={this.onChangeDescription}>
                      {
                        this.state.descriptions.map((description) => {
                          return (
                            <option key={description} value={description}>
                                {description}
                            </option>
                        )})
                      }
                  </select>
                </div>
                <div className="form-group">
                  <label>Duration (in minutes): </label>
                  <input 
                      type="text" 
                      className="form-control"
                      value={this.state.duration}
                      onChange={this.onChangeDuration}
                      />
                </div>
                <div className="form-group">
                  <label>Date: </label>
                  <div>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                  />
                  </div>
                </div>
        
                <div className="form-group">
                  <input type="submit" value="Add Entry" className="btn btn-primary" />
                </div>
              </form>
            </div>
        )
    }
}