import React, { Component } from 'react';
import {createNewPost} from "../utils/tronweb";

//for the rich text editor:
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6


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

  handleContentChange(value) {
    this.setState({content: value});
  }

  handleSubmit(event) {
    createNewPost(this.state.title, this.state.content, this.state.tag);
    event.preventDefault();
  }

  render() {
    
    return (
      <div className="Form">
        <div class="container">
            <div class="row">
              <form onSubmit={this.handleSubmit}>
              <h3>Create New Post</h3>
                <label> Title: </label>
                  <div>
                    <input type="text" value={this.state.title} onChange={this.handleTitleChange} />
                  </div>
                <p> </p>

                <label> Content: </label>
                <ReactQuill theme="snow" value={this.state.content} onChange={this.handleContentChange} />
                <p> </p>
                
                <label> Tags: </label>
                  <div>
                    <input type="text" value={this.state.tag} onChange={this.handleTagChange} />
                  </div>
                <p> </p>

                <input type="submit" class="btn btn-outline-dark" value="Submit" />
              </form>
            </div>
          </div>
        </div>
    );
  }
}

  export default Form;
