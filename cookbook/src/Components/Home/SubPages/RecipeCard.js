import React, { Component } from 'react'
import Image from 'react-image-resizer';

class RecipeCard extends Component {
  render() {
    return (
      <div className="recipeCard">
        <div className="noteCard__title">
          {this.props.recipes.title}
        </div>
        <div className="recipeCard__body">
          <Image 
            src={this.props.recipes.image} 
            height={60}
            width={160}
          />
          <div className="recipeSchedule_body">
            Scheduled For
            <div className="recipeCardMeal">{this.props.recipes.meal}</div>
            <div className="recipeCardDate">{this.props.recipes.date.toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default RecipeCard;