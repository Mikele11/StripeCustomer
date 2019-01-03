import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Create from './components/Create';
import List from './components/List';



ReactDOM.render(
    <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/create' component={Create} />
        <Route path='/list' component={List} />
      </div>
    </Router>,
  document.getElementById('root')
);


