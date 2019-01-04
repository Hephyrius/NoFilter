//No Filter is a dApp created for the Tron Accelerator
//The smart contract enables content creation
//as well as metric tracking and other logic
//When coupled with the frontend, it creates an experience similar to a 
//traditional blog style social website such as medium and reddit
//Created By Harnick Khera (Github.com/Hephyrius)
//Repository can be found at (Github.com/Hephyrius/Nofilter)

import React, { Component } from 'react';
import CommentItem from "./CommentItem";
import DummyItem from "./DummyItem";

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

    if(filteredComments.length > 0) {
        commentItems = filteredComments.map(comment => {
            return (
                <CommentItem key={comment.commentid} comment={comment}/>
            )
        } );
    } else {
      commentItems = <DummyItem isPost={false}/>
    }
    
    return (
      <div className="CommentsList">
        <div class="container">

              {commentItems}
              
          </div>
        </div>
    );
  }
}

export default CommentsList;
