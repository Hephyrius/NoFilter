//No Filter is a dApp created for the Tron Accelerator
//The smart contract enables content creation
//as well as metric tracking and other logic
//When coupled with the frontend, it creates an experience similar to a 
//traditional blog style social website such as medium and reddit
//Created By Harnick Khera (Github.com/Hephyrius)
//Repository can be found at (Github.com/Hephyrius/Nofilter)

import React, { Component } from 'react';
class DummyItem extends Component {

  render() {
      let type = "Comment";
      if(this.props.isPost) {
        type = "Post"
      }
    return (
      <div className="DummyItem">
        <div class="container">
            <div class="row">
              There are no {type}'s to display. Try refreshing the page to load events from the Tron Virtual Machine. If no events are shown, try pointing your tronlink to another event server as api.trongrid.io will only show events from the last ~6 hours.
            </div>
          </div>
        </div>
    );
  }
}

export default DummyItem;
