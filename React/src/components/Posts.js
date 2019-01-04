//No Filter is a dApp created for the Tron Accelerator
//The smart contract enables content creation
//as well as metric tracking and other logic
//When coupled with the frontend, it creates an experience similar to a 
//traditional blog style social website such as medium and reddit
//Created By Harnick Khera (Github.com/Hephyrius)
//Repository can be found at (Github.com/Hephyrius/Nofilter)

import React, { Component } from 'react';
import PostItem from "./PostItem";
import DummyItem from "./DummyItem";
class Posts extends Component {

  render() {
    let postItems;
    let posts = JSON.parse(localStorage.getItem("Posts"))
    let votes = JSON.parse(localStorage.getItem("PostVotes"))
    let filter = []
    if(!posts){
      posts = []
    } 
    else {
      if (this.props.filterword.length > 0){
        for(var i=0; i<posts.length; i++){
          if((posts[i]['content'].match(this.props.filterword) && this.props.content) 
          || (posts[i]['tags'].match(this.props.filterword) && this.props.tag) 
          || (posts[i]['title'].match(this.props.filterword && this.props.title))){
            filter = filter.concat(posts[i])
          }
        }
        posts = filter
      }

      if(posts.length > 0) {
          postItems = posts.map(post => {
              return (
                  <PostItem key={post.title} post={post} votes={votes}/>
              )
          } );

      } else {

        postItems = <DummyItem isPost={true}/>
      }
    }
    return (
      <div className="Postss">

              {postItems}

        </div>
    );
  }
}

export default Posts;
