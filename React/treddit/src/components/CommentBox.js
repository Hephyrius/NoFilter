import React, { Component } from 'react';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''

    };

    this.handleContentChange = this.handleCommentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCommentChange(event) {
    this.setState({comment: event.target.value});
  }

  handleSubmit(event) {
    //createNewPost(this.state.title, this.state.comment, this.state.tag);
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
                    <textarea value={this.state.comment} cols="40" rows="8" onChange={this.handleCommentChange} />
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
