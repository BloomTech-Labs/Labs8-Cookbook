import React, { Component } from 'react';
import RecipeCard from './RecipeCard';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const RECIPE_QUERY = gql`
  {
    recipes {
      id
      title
      readyInMinutes
      servings
      image
    }
  }
`

const dummyRecipesData = [
  {
    title: 'Deviled Eggs',
    image: 'https://img.sndimg.com:443/food/image/upload/w_993,h_559,c_fill,fl_progressive,q_80/v1/img/recipes/48/15/3/TrKIAiXyStaqjpJUCaT0_food.com-28.jpg',
    URL: 'https://www.geniuskitchen.com/recipe/deviled-eggs-48153',
    meal: 'breakfast',
    date: new Date( 'Wed Nov 21 2018 12:00:00 GMT-0800' )
  }
]

class Recipes extends Component {
  render() {
    return (
      <Query query={RECIPE_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) return <div>Error</div>
          
          // const recipesToRender = data.recipes
          const recipesToRender = dummyRecipesData

          return (
            <div className="recipes-container">
              {recipesToRender.map(recipes => <RecipeCard key={recipes.id} recipes={recipes} />)}
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Recipes;


