import React, { Component } from 'react';
import CommentItem from "./CommentItem";
class CommentsList extends Component {

  render() {
    let commentItems;
    
    let comments = JSON.parse(localStorage.getItem("Comments"))
    let filteredComments = []
    for(var i=0; i<comments.length; i++){
        if(comments[i]['postid'] === this.props.postid){
            filteredComments = filteredComments.concat(comments[i])
        }
      } 

    if(comments) {
        commentItems = filteredComments.map(comment => {
            return (
                <CommentItem key={comment.commentid} comment={comment}/>
            )
        } );
    }
    return (
      <div className="CommentsList">
      <h3>Comment Section </h3>
        <div class="container">
            <div class="row">
              {commentItems}
            </div>
          </div>
        </div>
    );
  }
}

export default CommentsList;
