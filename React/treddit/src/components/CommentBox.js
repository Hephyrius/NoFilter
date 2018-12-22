import React, { Component } from 'react';
import {createNewComment} from "../utils/tronweb";

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentText: ''

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({commentText: event.target.value});
  }

  handleSubmit(event) {
    createNewComment(this.state.commentText, 0,  0);
    event.preventDefault();
  }

  render() {
    return (
    <div className="CommentBox">
        <div class="container">
            <div class="row">
            <form onSubmit={this.handleSubmit}>
            <h3>Leave a Comment</h3>

                <label> Comment: </label>
                <div>
                    <textarea value={this.state.comment} cols="40" rows="8" onChange={this.handleChange} />
                </div>
                <p> </p>
                
                <input type="submit" value="Submit" />
            </form>
            </div>
        </div>
      </div>
    );
  }
}

  export default CommentBox;
