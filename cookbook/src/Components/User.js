import React, { Component } from 'react'

class User extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.user.first_name} ({this.props.user.last_name})
        </div>
      </div>
    )
  }
}

export default User;