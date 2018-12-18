import React, { Component } from 'react';
import PostItem from "./PostItem";
class Posts extends Component {

  render() {
    let postItems;
    if(this.props.posts) {
        postItems = this.props.posts.map(post => {
            return (
                <PostItem key={post.title} post={post}/>
            )
        } );
    }
    return (
      <div className="Posts">
       {postItems}
      </div>
    );
  }
}

export default Posts;
