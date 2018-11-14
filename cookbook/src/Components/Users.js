import React, { Component } from 'react';
import User from './User';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const USER_QUERY = gql`
  {
    users {
      id
      first_name
      last_name
      email
    }
  }
`

class Users extends Component {
  render() {
    return (
      <Query query={USER_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
          
          const usersToRender = data.users

          return (
            <div>
              {usersToRender.map(user => <User key={user.id} user={user} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Users;