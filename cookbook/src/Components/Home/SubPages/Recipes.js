import React, { Component } from 'react';
import RecipeCard from './RecipeCard';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import User from './User';



const RECIPE_QUERY = gql`
  query ($id: String!){
		user (id: $id) {
      recipes {
        id
        title
        events {
          id
          date
        }
      }
    }
  }
`

// const dummyRecipesData = [
//   {
//     id: 0,
//     title: 'Deviled Eggs',
//     image: 'https://img.sndimg.com:443/food/image/upload/w_993,h_559,c_fill,fl_progressive,q_80/v1/img/recipes/48/15/3/TrKIAiXyStaqjpJUCaT0_food.com-28.jpg',
//     URL: 'https://www.geniuskitchen.com/recipe/deviled-eggs-48153',
//     meal: 'breakfast',
//     date: new Date( 'Wed Nov 21 2018 12:00:00 GMT-0800' )
//   },
//   {
//     id: 1,
//     title: 'Fettuccine Alfredo',
//     image: 'https://img.sndimg.com:443/food/image/upload/w_896,h_504,c_fill,fl_progressive,q_80/v1/img/recipes/85/96/7nqcwQZxSiOWr3jp4BgE_FettucineAlfredo3.jpg',
//     URL: 'https://www.geniuskitchen.com/recipe/olive-garden-fettuccine-alfredo-8596?ic1=suggestedAsset%7Cfettucine',
//     meal: 'dinner',
//     date: new Date( 'Thurs Nov 22 2018 12:00:00 GMT-0800' )
//   }
// ]

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      filter: new Set([])
    };
  }

  handleAddRecipe() {
    this.props.history.push('create')
  }

  handleSearch = e => {
    this.setState({ [e.target.name]: e.target.value});
  };

  handleFilter = (meal) => {
    let newFilter = this.state.filter;
    if ( newFilter.has(meal) ) newFilter.delete(meal);
    else newFilter.add(meal);

    this.setState({ filter: newFilter });
  }

  filterButtonClassName = (meal) => {
    return this.state.filter.has(meal) ? "recipesFilterButtonChosen" : "recipesFilterButtonNotChosen";
  }

  render() {
    return (
      <div className="recipesContainer">

        <div className="recipesFunctionBar">
        
          <button onClick={() => this.handleAddRecipe()} className="recipesAddRecipe">+ add recipe</button>
          
          <form>
            <input
              type="text"
              name="search"
              placeholder="search"
              onChange={this.handleSearch}
              value={this.state.search}>
            </input>
          </form>

          <div className="recipesFilterContainer">
            <button className={this.filterButtonClassName("breakfast")} onClick={() => this.handleFilter("breakfast")}>breakfast</button>
            <button className={this.filterButtonClassName("lunch")}  onClick={() => this.handleFilter("lunch")}>lunch</button>
            <button className={this.filterButtonClassName("dinner")} onClick={() => this.handleFilter("dinner")}>dinner</button>
          </div>

        </div>
        <User>
          {({data}, loading, error) => {
            if (loading) return <div>Fetching</div>
            if (error) return <div>Error</div>

            if (data.currentUser) {
            return (
              <Query query={RECIPE_QUERY} variables = {{id: data.currentUser.id}}>
                {({ loading, error, data }) => {
                  if (loading) return <div>Fetching</div>
                  if (error) return <div>Error</div>

                  const recipesToRender = data.user.recipes

                  return (
                    <div className="recipesCards">
                      {recipesToRender.map(recipes => 
                      <RecipeCard 
                        key={recipes.id} 
                        recipes={recipes} 
                        search={this.state.search}
                        filter={this.state.filter}
                      />)}
                    </div>
                  )
                }}
              </Query>
              )
            }
            return (
              <div>loading..</div>
            )
          }}
        </User>
      </div>
    )
  }
}

export default Recipes;


