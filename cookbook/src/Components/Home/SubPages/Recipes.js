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
        prepTime
        servings
        image
        url
        ingredients {
          id
          name
          quantity
        }
        instructions {
          id
          stepNum
          description
          isCompleted
        }
        events {
          id
          date
          mealType
        }
      }
    }
  }
`

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
                      {recipesToRender.map(recipe => 
                      <RecipeCard 
                        key={recipe.id} 
                        recipe={recipe} 
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


