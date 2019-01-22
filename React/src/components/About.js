//No Filter is a dApp created for the Tron Accelerator
//The smart contract enables content creation
//as well as metric tracking and other logic
//When coupled with the frontend, it creates an experience similar to a 
//traditional blog style social website such as medium and reddit
//Created By Harnick Khera (Github.com/Hephyrius)
//Repository can be found at (Github.com/Hephyrius/Nofilter)

import React, { Component } from 'react';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className="About">
        <div class="container">
            <div class="row">
            <form onSubmit={this.handleSubmit}>
                <div>

                <p align="justify">
                <h4> NoFilter tron dApp (aka !Filter)</h4> 
                <p><strong> MainNet Deployed Address - TGX6LGnhFgSUyG4oR7iU4bVTWUnMY9B7mP</strong> </p>
                <p><strong> Shasta Testnet Deployed Address - TEQebZr8wuhyYMLXCdWi6LQA7z2gN1fEfY</strong> </p>
                <p><strong> NoFilter has been returned to shasta until trongrid stores all past events OR an event server can be successfully set up!</strong> </p>
                <p><strong> Made for the Tron Accelerator Hackathon</strong> </p>
                <p><strong> Creator - Harnick Khera (Hephyrius)</strong> </p>
                </p>

                <p align="justify">
                <h4>What is NoFilter</h4>
                NoFilter is a dApp media platform. The platform allows users to share content with other users, akin to platforms such as medium or reddit. It leverages the TronVM event system as a means of storing content in an immutable fashion. The platform allows users to reward the content they like with donations (in trx). The dApp also makes use of Tron SmartContracts to keep track of statistics such as Votes and Donations. There is no fee model for this dApp, other than the Gas cost for functions. it is freely useable in it current form. 
                The dApp essentially uses tron nodes as a server, and tron as a database, whilst the frontend acts as the client. The is dApp allows the user to tap directly into a TVM fullhost/api of their choice (via tronLink settings). Due to the fact that no data is stored offchain it is near impossible to censor.
                </p>

                <p align="justify">
                <h4>Why is it needed</h4>
                Being Censorship Resistant is a very important concept for the modern internet, which is under constant assault by government censorship and manipulation by shadowy organisations and private interests. Another area where this concept is important is in the realm of content policing, modern social platforms often alienate fringe communities with broad rules that can often push users to darker platforms. This is evident in many cases, with the recent tumblr blanket ban on female nuditity being once such case.  Another need for this dApp is the case of data harvesting. The dApp only records bare bone facts about a user to the blockchain and does not track users in any form. This is appealing in the post camebridge-analytica social domain.
                </p>

                </div>
            </form>
            </div>
        </div>
      </div>
    );
  }
}

  export default About;
