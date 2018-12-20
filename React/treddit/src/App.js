import React, { Component } from 'react';
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
    //getBalance();
    
  }

  componentWillMount() {
    this.setState({
      posts :JSON.parse(localStorage.getItem("Posts"))
    }
    )
  }

  render() {
    return (
      <div className="App">
        <SiteHeader />

        <div className="FormArea">
          <Form />
        </div>

        <Posts posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
