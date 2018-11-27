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
    id: 0,
    title: 'Deviled Eggs',
    image: 'https://img.sndimg.com:443/food/image/upload/w_993,h_559,c_fill,fl_progressive,q_80/v1/img/recipes/48/15/3/TrKIAiXyStaqjpJUCaT0_food.com-28.jpg',
    URL: 'https://www.geniuskitchen.com/recipe/deviled-eggs-48153',
    meal: 'breakfast',
    date: new Date( 'Wed Nov 21 2018 12:00:00 GMT-0800' )
  },
  {
    id: 1,
    title: 'Fettuccine Alfredo',
    image: 'https://img.sndimg.com:443/food/image/upload/w_896,h_504,c_fill,fl_progressive,q_80/v1/img/recipes/85/96/7nqcwQZxSiOWr3jp4BgE_FettucineAlfredo3.jpg',
    URL: 'https://www.geniuskitchen.com/recipe/olive-garden-fettuccine-alfredo-8596?ic1=suggestedAsset%7Cfettucine',
    meal: 'dinner',
    date: new Date( 'Thurs Nov 22 2018 12:00:00 GMT-0800' )
  }
]

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  handleAddRecipe() {
    this.props.history.push('create')
  }

  render() {
    return (
      <div>
        <button onClick={() => this.handleAddRecipe()} className="recipesAddRecipe">+ add recipe</button>
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
      </div>
    )
  }
}

export default Recipes;


