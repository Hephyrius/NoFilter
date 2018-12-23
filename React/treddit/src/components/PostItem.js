import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class PostItem extends Component {
  render() {

    //grab the vote count for the given post
    let voteCount = 0;
    if(this.props.votes) {
      for(var i=0; i<this.props.votes.length; i++){
        if(this.props.votes[i]['postid'] == this.props.post.postid){
          voteCount = this.props.votes[i]['votes'] 
        }
      }
    }

    return (
      <div className="PostItem">
        <div class="container-fluid">
          <div class="row">
            <div className="content">
            
              <div className="VoteArea">
                    
              </div>

              <div className="title-area">
                  <span className="title"><Link to={"post=" + this.props.post.postid}> {this.props.post.title}</Link></span>
                  <strong><span> ◑ {voteCount} ◐ </span></strong>
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
