import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Posts from "./components/Posts";
import PostPage from "./components/PostPage";
import Form from "./components/Form";
import SiteHeader from "./components/SiteHeader";
import "./bootstrap.css";
import {getBalance, getPosts, getComments} from "./utils/tronweb";

class App extends Component {
  
  constructor () {
    super();
    this.state = [{
      posts : [],
      postData : getPosts(),
      commentData: getComments()
    }]
    
  }

  render() {
    return (
      <Router>   
      <div className="App">
        <div class="container">
          <SiteHeader />

          <div className="FormArea">
          <Route path="/new-post" component={newpost} />
          </div>

          <Route path="/" exact component={Home} />

          <Route path="/post=:id" component={PostP}/>

        </div>
      </div>
      </Router>
    );
  }
}

const Home = () => <Posts />;
const newpost = () => <Form /> ;
const PostP = ({ match }) => ( <PostPage postid={match.params.id} />);

export default App;
