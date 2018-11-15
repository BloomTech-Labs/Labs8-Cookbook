import React, { Component } from 'react'

class Recipe extends Component {
  render() {
    return (
      <div className="recipeCard">
        <div className="noteCard__title">
          {this.props.recipes.title}
        </div>
        <div className="recipeCard__body">
          {this.props.recipes.readyInMinutes}
          {this.props.recipes.servings}
          {this.props.recipes.image}
        </div>
      </div>
    )
  }
}

export default Recipe;