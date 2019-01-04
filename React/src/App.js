import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Posts from "./components/Posts";
import PostPage from "./components/PostPage";
import Form from "./components/Form";
import About from "./components/About";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Search from "./components/Search";
import Account from "./components/Account";
import "./bootstrap.css";
import {getPosts, getComments, getVoteCounters, getCommentVoteCounters, getUserData, getDonations, getUsers} from "./utils/tronweb";

class App extends Component {
  
  constructor () {
    super();
    this.state = [{
      posts : [],
      postData : getPosts(),
      commentData: getComments()
    }]
    getVoteCounters()
    getCommentVoteCounters()
    getUserData()
    getDonations()
    getUsers()
  }

  render() {
    return (
      <Router>   
      <div className="App">
        <div class="container">
          <SiteHeader />

          <Route path="/new-post" component={newpost} />

          <Route path="/" exact component={Home} />

          <Route path="/about" component={AboutP} />

          <Route path="/post=:id" component={PostP}/>

          <Route path="/tag=:term" component={TagP}/>

          <Route path="/search" component={SearchP}/>

          <Route path = "/account" component ={AccountP} />

          <SiteFooter />
        </div>
        
      </div>
      </Router>
      
    );
  }
}

const Home = () => <Posts filterword={""}/>;
const newpost = () => <Form /> ;
const PostP = ({ match }) => ( <PostPage postid={match.params.id} />);
const TagP = ({ match }) => ( <Posts filterword={match.params.term} content={false} tag={true} title={false} />);
const AboutP = ({ match }) => ( <About />);
const SearchP = ({ match }) => ( <Search />);
const AccountP = ({ match }) => ( <Account />);

export default App;