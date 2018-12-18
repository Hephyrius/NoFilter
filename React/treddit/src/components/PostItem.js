import React, { Component } from 'react';

class PostItem extends Component {
  render() {
      
    return (
      <li className="PostItem">
        <strong> {this.props.post.title} </strong> - {this.props.post.tags} - {this.props.post.timestamp}
      </li>
    );
  }
}

export default PostItem;
