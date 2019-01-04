//No Filter is a dApp created for the Tron Accelerator
//The smart contract enables content creation
//as well as metric tracking and other logic
//When coupled with the frontend, it creates an experience similar to a 
//traditional blog style social website such as medium and reddit
//Created By Harnick Khera (Github.com/Hephyrius)
//Repository can be found at (Github.com/Hephyrius/Nofilter)

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
                    <Tooltip title={" "+ this.props.comment.author + " " + this.props.comment.tronaddress} leaveDelay={400} interactive={true}><strong> {username}</strong></Tooltip>
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
