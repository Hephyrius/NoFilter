import React, { Component } from 'react';
import {createNewPost} from "../utils/tronweb";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tag: '',
      content: ''

    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleTagChange(event) {
    this.setState({tag: event.target.value});
  }

  handleContentChange(event) {
    this.setState({content: event.target.value});
  }

  handleSubmit(event) {
    //alert('Content Was Sent To The Blockchain');
    createNewPost(this.state.title, this.state.content, this.state.tag);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <h2>Create New Post</h2>
      
        <label>
          <div>
            Title: <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
          </div>
        </label>

        <label>
          <div>
              Tag: <input type="text" value={this.state.tag} onChange={this.handleTagChange} />
          </div>
        </label>
        <label>
          <div>
              Content: <textarea value={this.state.content} cols="30" rows="10" onChange={this.handleContentChange} />
          </div>
        </label>

        <input type="submit" value="Submit" />
      </form>
    );
  }
}

  export default Form;
