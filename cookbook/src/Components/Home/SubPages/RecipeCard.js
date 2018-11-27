import React, { Component } from 'react'
import Image from 'react-image-resizer';

class RecipeCard extends Component {
  handleLink() {
    window.open(this.props.recipes.URL, '_blank');
  }

  handleDelete() {
    console.log(`Delete note ${this.props.recipes.id}`)
  }

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
          <button onClick={() => this.handleLink()} className="recipeCardLink">Link</button>
          <div className="recipeSchedule_body">
            scheduled for
            <div className="recipeCardMeal">{this.props.recipes.meal}</div>
            <div className="recipeCardDate">{this.props.recipes.date.toLocaleDateString()}</div>
          </div>
          <button onClick={() => this.handleDelete()} className="recipeCardLink">Delete</button>
        </div>
      </div>
    )
  }
}

export default RecipeCard;