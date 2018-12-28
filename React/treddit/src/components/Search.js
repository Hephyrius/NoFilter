import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
          search: ''
        };
    
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleSearchChange(event) {
        this.setState({search: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
      }
    
      render() {
        return (
            <div id="container" class="container">
                <div class="row text-black">
                    <div class="col-sm-10 offset-sm-1 text-center">
                        <h2 class="display-3">Search Posts</h2>
                            <div class="info-form">
                                <form onSubmit={this.handleSubmit}>  
                                    <div class="form-group">
                                        <input type="text" value={this.state.search} onChange={this.handleSearchChange} />
                                    </div>
                                <input type="submit" class="btn btn-outline-dark" value="Search All Posts" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
      }
    }


export default Search;
