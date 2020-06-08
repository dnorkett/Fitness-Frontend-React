import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Activity = props => (
    <tr>
      <td>{props.activity.activity}</td>
      <td>{props.activity.caloriesPerHour}</td>
      <td>
        <Link to={"/edit/"+props.activity._id}>edit</Link> | <a href="#" onClick={() => { props.deleteActivity(props.activity._id) }}>delete</a>
      </td>
    </tr>
  )


export default class CreateActivity extends Component {
    constructor(props){        
        super(props);

        this.state = {
            activity: '',
            caloriesPerHour: 0,
            activities: []
        }

        this.onChangeActivity = this.onChangeActivity.bind(this);
        this.onChangecaloriesPerHour = this.onChangecaloriesPerHour.bind(this);
        this.onSubmit = this.onSubmit.bind(this);    
        this.activityList = this.activityList.bind(this);
        this.deleteActivity = this.deleteActivity.bind(this);
    }


    componentDidMount() {
        axios.get('http://localhost:5000/calories/')
            .then(res => {
                this.setState({activities: res.data})
            })
            .catch(err => console.log('Error: ' + err))
    }


    onChangeActivity(e){
        this.setState({
            activity: e.target.value
        });
    }

    onChangecaloriesPerHour(e){
        this.setState({
            caloriesPerHour: e.target.value
        });
    }

    
    onSubmit(e) {
        e.preventDefault();

        const calories = {
            activity: this.state.activity,
            caloriesPerHour: this.state.caloriesPerHour
        }
        
        axios.post('http://localhost:5000/calories/add', calories)
            .then(res => console.log(res.data));

        this.setState({
            activity: '',
            caloriesPerHour: 0
        });
    }


    deleteActivity(id) {
        axios.delete('http://localhost:5000/calories/' + id)
            .then(res => console.log(res.data));

        this.setState({
            activities: this.state.activities.filter(el => el._id !== id)
        })
    }


    activityList() {
        return this.state.activities.map(currentactivity => {
          return <Activity activity={currentactivity} deleteActivity={this.deleteActivity} key={currentactivity._id}/>;
        })
      }


    render() {
        return (
            <div>
              <h3>Create Activity</h3>
              <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                  <label>Activity: </label>
                  <input  type="text"
                      required
                      className="form-control"
                      value={this.state.activity}
                      onChange={this.onChangeActivity}
                      />
                  <label>Calories per Hour: </label>
                  <input  type="number"
                      required
                      className="form-control"
                      value={this.state.caloriesPerHour}
                      onChange={this.onChangecaloriesPerHour}
                      />
                </div>
                <div className="form-group">
                  <input type="submit" value="Create Activity" className="btn btn-primary" />
                </div>
              </form>
              <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Activity</th>
                  <th>Calories per Hour</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { this.activityList() }
              </tbody>
            </table>
            </div>
          )
    }
}