
//No Filter is a dApp created for the Tron Accelerator
//The smart contract enables content creation
//as well as metric tracking and other logic
//When coupled with the frontend, it creates an experience similar to a 
//traditional blog style social website such as medium and reddit
//Created By Harnick Khera (Github.com/Hephyrius)
//Repository can be found at (Github.com/Hephyrius/Nofilter)
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class SiteFooter extends Component {

  render() {
    return (
        <div className="header">
            <footer class="page-footer font-small blue">
                <div class="footer-copyright text-center py-3">© NoFilter [Shasta Test Net] 2019
                    <p><Link to="/">Home</Link> | <Link to="/new-post">Create New Post</Link> | <Link to="/about">About</Link> | <Link to="/search">Search</Link> | <Link to="/account">Account</Link> </p>
                </div>
            </footer>
        </div>
        );
     }
}

export default SiteFooter;

