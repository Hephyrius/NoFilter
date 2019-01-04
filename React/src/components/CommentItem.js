import React, { Component } from 'react';
import CommentVote from "./CommentVote";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class CommentItem extends Component {
  render() {
    let Users = JSON.parse(localStorage.getItem("KnownUsers"));
    let username = "anonymous"

    for(var i=0; i<Users.length; i++){
      if(Users[i]['HexAddress'] == this.props.comment.author){
        username = Users[i]['UserName'];
      }
    }
    return (
      <div className="CommentItem">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-2">
              <CommentVote postid={this.props.comment.postid} commentid={this.props.comment.commentid} />
            </div>
            <div class="col-md-8">
              <div className="content">
                <div className="title-area">
                  <div dangerouslySetInnerHTML={{__html: this.props.comment.content}} />
                </div>
                <div className="meta-area">
                  <span className="time">
                    Submitted {this.props.comment.hms} {this.props.comment.timestamp} by
                    <strong> {username}[{this.props.comment.author}]</strong>
                  </span>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CommentItem;
