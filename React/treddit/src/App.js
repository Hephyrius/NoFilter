import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Posts from "./components/Posts";
import Form from "./components/Form";
import SiteHeader from "./components/SiteHeader";
import "./bootstrap.css";
import {getBalance, getPosts} from "./utils/tronweb";

class App extends Component {
  
  constructor () {
    super();
    this.state = [{
      posts : [],
      postData : getPosts()
    }]
    
  }

  render() {
    return (
      <Router>   
      <div className="App">
        <SiteHeader />

        <div className="FormArea">
        <Route path="/new-post" component={newpost} />
        </div>

        <Route path="/" exact component={Home} />
      </div>
      </Router>
    );
  }
}

const Home = () => <Posts />;
const newpost = () => <Form />

export default App;
