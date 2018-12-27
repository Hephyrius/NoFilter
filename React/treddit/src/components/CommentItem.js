import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class CommentItem extends Component {
  render() {
      
    return (
      <div className="CommentItem">
      <div class="container-fluid">
      <div class="row">

        <div className="content">
          <div className="title-area">
            <span className="title">{this.props.comment.content}</span>
          </div>

          <div className="meta-area">
            <span className="time">
              Submitted {this.props.comment.timestamp} by
              <strong> {this.props.comment.author}</strong>
              <span className="ReplyComment"><Link to={"post=" + this.props.comment.postid + "?cid=" +this.props.comment.commentid }> Reply </Link></span>
            </span>
          </div>

        </div>
      </div>
      </div>
      </div>
    );
  }
}

export default CommentItem;
