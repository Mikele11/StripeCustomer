import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <button class="btn btn-primary"><Link to="/create">add customer</Link></button>
        <button class="btn btn-primary"><Link to="/list">List</Link></button>
      </div>
    );
  }
}

export default App;
