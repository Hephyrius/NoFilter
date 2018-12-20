import React, { Component } from 'react';

class PostItem extends Component {
  render() {
      
    return (
      <div className="PostItem">
        <div className="content">
          <div className="title-area">
            <span className="title">{this.props.post.title}</span>
          </div>
          <div className="meta-area">
            <span className="time">
              Submitted {this.props.post.timestamp} by
              <strong> {this.props.post.author}</strong>
            </span>
          </div>
          <div className="link-area" />
        </div>
      </div>
    );
  }
}

export default PostItem;
