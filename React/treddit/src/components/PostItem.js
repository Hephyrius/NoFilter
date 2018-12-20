import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PostItem extends Component {
  render() {
      
    return (
      <div className="PostItem">
      <div class="container-fluid">
      <div class="row">
        <div className="content">
          <div className="title-area">
            <span className="title"><Link to={"post=" + this.props.post.postid}>{this.props.post.title}</Link></span>
          </div>
          <div className="meta-area">
            <span className="time">
              Submitted {this.props.post.timestamp} by
              <strong> {this.props.post.author}</strong>
            </span>
          </div>
        </div>
      </div>
      </div>
      </div>
    );
  }
}

export default PostItem;
