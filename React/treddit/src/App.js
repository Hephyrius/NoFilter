import React, { Component } from 'react';
import Posts from "./components/Posts";
import Form from "./components/Form";

import {getBalance, getPosts} from "./utils/tronweb";

class App extends Component {
  
  constructor () {
    super();
    this.state = [{
      posts : [],
      postData : getPosts()
    }]
    //getBalance();
    
  }

  componentWillMount() {
    this.setState({
      posts :JSON.parse(localStorage.getItem("Posts"))/*
      posts : [
        {
          title: "Post 1 Title",
          timestamp: "time",
          tags: "tags"
        },
        {
          title: "Post 2 Title",
          timestamp: "time",
          tags: "tags"
        },
        {
          title: "Post 3 Title",
          timestamp: "time",
          tags: "tags"
        }
      ]*/ 
    }
    )
  }

  render() {
    return (
      <div className="App">
        <h1>Treddit App</h1>
        <Form />
        <Posts posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
