import React, { Component } from 'react';

class PostItem extends Component {
  render() {
      
    return (
      <li className="PostItem">
        <strong>Title: {this.props.post.title} </strong> - Tags: {this.props.post.tags} - Created:{this.props.post.timestamp}
      </li>
    );
  }
}

export default PostItem;
