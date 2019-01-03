import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class List extends Component {

  constructor() {
    super();
    this.state = {
      customers: []
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

  render() {
    const { customers } = this.state;
    console.log('..',customers)
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Customer List
            </h3>
          </div>
          <div class="panel-body">
          <table id="tableUsers">
            <thead>
                <tr>
                  <th>Customer email</th>
                  <th>Description</th>
                  <th>Balance</th>
                  <th>Created on</th>
                </tr>
            </thead>
            <tbody>
              {
                customers.map((customer,index)  => 
                  <tr>
                    <th>{customer.email}</th> 
                    <th>{customer.description}</th> 
                    <th>{customer.account_balance}</th> 
                    <th>{customer.created}</th> 
                  </tr>
                )
              }
            </tbody>
          </table>
          </div>
        </div>
      </div>
    );
  }
}
export default List;