import React, { Component } from 'react';
import Posts from "./components/Posts";
import {getBalance} from "./utils/tronweb";

class App extends Component {
  
  constructor () {
    super();
    this.state = [{
      posts : []
    }]
    getBalance();
  }

  componentWillMount() {
    this.setState({
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
      ]
    }

    )
  }

  render() {
    return (
      <div className="App">
        Treddit App
        <Posts posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
