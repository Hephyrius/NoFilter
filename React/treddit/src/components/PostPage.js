import React, { Component } from 'react';
import CommentBox from "./CommentBox";

class PostPage extends Component {

  render() {
    let postid;
    let post;
    if(this.props.postid) {
      console.log(this.props.postid)
      let posts = JSON.parse(localStorage.getItem("Posts"));
      for(var i=0; i<posts.length; i++){
        if(posts[i]['postid'] === this.props.postid){
          post = posts[i];
          break;
        }
      } 

    }
    return (
      <div className="PostPage">
        <div class="container">
          <div class="row">

              <h1 class="mt-4">{post['title']}</h1>

              <p></p>
              <div class="container">
              <p class="lead" alignment="left">{post['content']} </p>
              </div>

              <p></p>
              <p alignment="left">Posted on {post['timestamp']}  </p>
              <p></p>

              <p alignment="right"> - by {post['author']}</p>
          </div>
        </div>

        <CommentBox />

      </div>
    );
  }
}

export default PostPage;
