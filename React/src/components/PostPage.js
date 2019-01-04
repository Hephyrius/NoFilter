//No Filter is a dApp created for the Tron Accelerator
//The smart contract enables content creation
//as well as metric tracking and other logic
//When coupled with the frontend, it creates an experience similar to a 
//traditional blog style social website such as medium and reddit
//Created By Harnick Khera (Github.com/Hephyrius)
//Repository can be found at (Github.com/Hephyrius/Nofilter)

import React, { Component } from 'react';
import CommentBox from "./CommentBox";
import CommentsList from "./CommentsList";
import PostVote from "./PostVote";
import Donate from "./Donate";


import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

class PostPage extends Component {

  render() {
    var postid = this.props.postid;
    let post;
    let donation;
    if(this.props.postid) {
      let posts = JSON.parse(localStorage.getItem("Posts"));
      let donations = JSON.parse(localStorage.getItem("Donations")); 
      for(var i=0; i<posts.length; i++){
        if(posts[i]['postid'] === this.props.postid){
          post = posts[i];
          break;
        }
      }

      for(var i=0; i<donations.length; i++){
        if(donations[i]['postid'] === this.props.postid){
          donation = donations[i];
          break;
        }
      } 

    }
    if(!post) {
      post = {
        title: "404 Not Found",
        author: "0x0",
        timestamp: "ERROR",
        content: "Post does not exist"
      }
      postid = -1;
    }

    let Users = JSON.parse(localStorage.getItem("KnownUsers"));
    let username = "anonymous"

    for(var i=0; i<Users.length; i++){
      if(Users[i]['HexAddress'] == post['author']){
        username = Users[i]['UserName'];
      }
    }

    return (
      <div className="PostPage">


        <ExpansionPanel expanded={true}>
            <ExpansionPanelSummary >
              <Typography ><h1>{post['title']}</h1></Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
            <div class="container">
              <div class="row">

                  <p></p>
                  <div class="container">
                  <p class="lead" align="justify">
                    <div dangerouslySetInnerHTML={{__html: post['content']}} />
                    </p>
                  </div>
                  <div>

                  <Divider variant="middle" />

                  Posted on {post['timestamp']} at {post['hms']} by
                  <Tooltip title={" " +post['author']+" "+post['tronaddress']} leaveDelay={400} interactive={true}><strong> {username}</strong></Tooltip>

                  <Divider variant="middle" />

                  </div>

              </div>
            </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary >
              <Typography ><h3>Vote</h3></Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <PostVote postid={postid} />
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary >
              <Typography> <h3>Donate</h3> </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Donate postid={postid} donation={donation}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary >
              <Typography ><h3>Leave Comment</h3></Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <CommentBox postid={postid}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary >
              <Typography ><h3>Comment Section</h3></Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <CommentsList postid={postid}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>

      </div>
    );
  }
}

export default PostPage;
