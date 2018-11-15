import React, { Component } from 'react'
import Image from 'react-image-resizer';

class Recipe extends Component {
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
        </div>
      </div>
    )
  }
}

export default Recipe;