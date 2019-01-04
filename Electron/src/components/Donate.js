import React, { Component } from 'react';
import {DonateTrx} from "../utils/tronweb";

class Donate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TrxValue: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({TrxValue: event.target.value});
  }

  handleSubmit(event) {
    DonateTrx(this.props.postid, this.state.TrxValue);
    event.preventDefault();
  }

  render() {
    let userData = JSON.parse(localStorage.getItem("User"))
    return (
    <div className="Donate">
        <div class="container">
            <div class="row">

            <form onSubmit={this.handleSubmit}>
                <div>
                    <input type="number" value={this.state.TrxValue} onChange={this.handleChange} /> Trx
                </div>
                <p></p>

                <p><strong> You currently have a contract balance of {Number(userData['SunBalance'])/1000000}TRX</strong></p>

                <input type="submit" class="btn btn-outline-dark" value="Donate" />

                              <p></p>
                <strong>Post Has Earned: {this.props.donation['TrxDonation']}Trx </strong> 
              <p></p>
            </form>
            </div>
        </div>
      </div>
    );
  }
}

  export default Donate;
