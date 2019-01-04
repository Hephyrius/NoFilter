import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';

import CommentVote from "./CommentVote";

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
                  <Divider variant="middle" />
                </div>
                <div className="meta-area">
                  <span className="time">
                    Submitted {this.props.comment.hms} {this.props.comment.timestamp} by
                    <Tooltip title={this.props.comment.author} leaveDelay={400} interactive={true}><strong> {username}</strong></Tooltip>
                  </span>
                  <Divider variant="middle" />
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
