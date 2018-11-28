import React, { Component } from 'react';
import Recipe from './Recipe';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

// const RECIPE_QUERY = gql`
//   {
//     recipes {
//       id
//       title
//       readyInMinutes
//       servings
//       image
//     }
//   }
// `

class Recipes extends Component {
  constructor() {
    super();
    this.state = {
      // test data for recipe view page
      dummyData: [
        {
          id: 1,
          title: 'Basic Omelette',
          readyInMinutes: '15',
          servings: '2',
          image: 'https://img.jamieoliver.com/jamieoliver/recipe-database/oldImages/xtra_med/366_1_1436868647.jpg?tr=w-335',
          createdBy: 'katie',
          scheduledFor: '12/01/2018',
          meal: 'breakfast',
          ingredients: [
            {id: 11, amount: 6, name: 'eggs'},
            {id: 12, amount: 1, name: 'cup of cheddar cheese'},
            {id: 13, amount: 2-1/2, name: 'tablespoons olive oil'},
            {id: 14, amount: 1, name: 'teaspoon salt'}
          ]
        }
      ]
    }
  }


  render() {
    return (
      // <Query query={RECIPE_QUERY}>
      //   {({ loading, error, data }) => {
      //     if (loading) return <div>Fetching</div>
      //     if (error) return <div>Error</div>
          
      //     const recipesToRender = data.recipes

      //     return (
      //       <div className="recipes-container">
      //         {recipesToRender.map(recipes => <Recipe key={recipes.id} recipes={recipes}/>)}
      //       </div>
      //     )
      //   }}
      // </Query>

      // For testing purposes. DummyData.
      <div className="recipes-container">
        {this.state.dummyData.map(dummyData => (
          <Recipe key={dummyData.id} dummyData={dummyData}/>
        ))}
      </div>
    )
  }
}

export default Recipes;


