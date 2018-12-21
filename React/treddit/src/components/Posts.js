import React, { Component } from 'react';
import PostItem from "./PostItem";
class Posts extends Component {

  render() {
    let postItems;
    let posts = JSON.parse(localStorage.getItem("Posts"))
    if(posts) {
        postItems = posts.map(post => {
            return (
                <PostItem key={post.title} post={post}/>
            )
        } );
    }
    return (
      <div className="Postss">
        <div class="container">
            <div class="row">
              {postItems}
            </div>
          </div>
        </div>
    );
  }
}

export default Posts;
