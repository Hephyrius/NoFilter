//No Filter is a dApp created for the Tron Accelerator
//The smart contract enables content creation
//as well as metric tracking and other logic
//When coupled with the frontend, it creates an experience similar to a 
//traditional blog style social website such as medium and reddit
//Created By Harnick Khera (Github.com/Hephyrius)
//Repository can be found at (Github.com/Hephyrius/Nofilter)

import React, { Component } from 'react';
import {createNewPost} from "../utils/tronweb";

//for the rich text editor:
import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'; 
import 'react-quill/dist/quill.snow.css'; // ES6


class CreatePostForm extends React.Component {
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

  modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

 formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
  

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
      <div className="CreatePostForm">
        <div class="container">
            <div class="row">
              <form onSubmit={this.handleSubmit}>
              <h3>Create New Post</h3>
                <label> Title: </label>
                  <div>
                    <input type="text" maxLength={120} value={this.state.title} onChange={this.handleTitleChange} />
                  </div>
                <p> </p>

                <label> Content: </label>
                <ReactQuill theme="snow"
                  modules={this.modules}
                  formats={this.formats}
                  value={this.state.content} 
                  onChange={this.handleContentChange}>
                </ReactQuill>


                <p> </p>
                
                <label> Tags: </label>
                  <div>
                    <input type="text" maxLength={50} value={this.state.tag} onChange={this.handleTagChange} />
                  </div>
                <p> </p>

                <input type="submit" class="btn btn-outline-dark" value="Submit" />
              </form>
            </div>
          </div>
          <div class="container">
            <div>
              <p></p>
              <h3>Preview </h3>
              <p></p>
            </div>
            
            
            <div dangerouslySetInnerHTML={{__html: this.state.content}} />
            </div>
        </div>
    );
  }
}

  export default CreatePostForm;
