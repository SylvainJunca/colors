import React, { Component } from 'react';

class NavBar extends Component {
  render () {
    return(
      <div>
        <button className='btn btn-link' value='form' onClick={this.props.navBar}>Form</button>
        <button className='btn btn-link' value='report' onClick={this.props.navBar}>Report</button>
      </div>
    )
  }
}

export default NavBar;