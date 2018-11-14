import React, { Component } from 'react';
import Recipe from './Recipe';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const Recipes = () => {
  return <div>This is Recipes Page</div>;
};

const RECIPE_QUERY = gql`
  {
    recipes {
      id
      title
    }
  }
`

class Recipes extends Component {
  render() {
    return (
      <Query query={RECIPE_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
          
          const recipesToRender = data.recipes

          return (
            <div>
              {recipesToRender.map(recipes => <Recipe key={recipes.id} recipes={recipes} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Recipes;


