
//No Filter is a dApp created for the Tron Accelerator
//The smart contract enables content creation
//as well as metric tracking and other logic
//When coupled with the frontend, it creates an experience similar to a 
//traditional blog style social website such as medium and reddit
//Created By Harnick Khera (Github.com/Hephyrius)
//Repository can be found at (Github.com/Hephyrius/Nofilter)
import React, { Component } from 'react';
import Posts from "./Posts";

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
          search: ''
        };
    
        this.handleSearchChange = this.handleSearchChange.bind(this);
      }
    
      handleSearchChange(event) {
        this.setState({search: event.target.value});
      }
    
    
      render() {
        return (
            <div id="container" class="container">
                <div class="row text-black">
                    <div class="col-sm-10 offset-sm-1 text-center">
                        <h3 class="display-3">Search Posts</h3>
                            <div class="info-form">
                                <form>  
                                    <div class="form-group">
                                        <input type="text" value={this.state.search} onChange={this.handleSearchChange} />
                                    </div>
                                </form>
                            </div>
                        </div>
                        <Posts filterword={this.state.search} content={true} tag={true} title={true} />
                </div>
            </div>
        );
      }
    }


export default Search;
