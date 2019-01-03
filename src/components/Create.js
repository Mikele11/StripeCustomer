import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      description: '',
      balance:0,
      customers:[],
      exist: false,
    };
  }

  componentDidMount () {
    axios.get('/list')
    .then(res => {
      this.setState({ customers: res.data.data });
    })
    .catch((error) => {
      console.log('error',error)
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();

    const {  email, description, balance, customers } = this.state;
    let exist = false;
    for (let i=0; i<customers.length; i++) {
      if (email === customers[i].email) {
        this.setState({ exist: true });
        exist = true;
        break;
      } else {
        this.setState({ exist: false });
        exist = false;
      }
    } 
    console.log('exist',exist)
    if (!exist) {
      axios.post('/create', {  email, description, balance})
      .then((result) => {
        this.props.history.push("/")
      });

    }
  }

  render() {
    const { email, description, balance, exist } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Add customer
            </h3>
          </div>
          <div className="panel-body">
            <h4><Link to="/"><span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>Back</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="author">Customer email:</label>
                <input type="text" className="form-control" name="email" value={email} onChange={this.onChange} placeholder="email" />
              </div>
              <div className="form-group">
                <label for="author">Short Description:</label>
                <input type="text" className="form-control" name="description" value={description} onChange={this.onChange} placeholder="description" />
              </div>
              <div className="form-group">
                <label for="author">Balance:</label>
                <input type="number" className="form-control" name="balance" value={balance} onChange={this.onChange} placeholder="balance" />
              </div>
              { exist ? 
                <div className="form-group butt">
                  <div className="exist">
                    Customer with the same email already exist
                  </div>                    
                  <div className="addBtn">
                    <button type="submit" className="addCust btn">Add Customer</button>
                  </div>
                </div> :
                <div className="form-group">
                  <button type="submit" className="addCustLeft btn">Add Customer</button>
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Create;