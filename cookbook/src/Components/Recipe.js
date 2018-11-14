import React, { Component } from 'react'

class Recipe extends Component {
  render() {
    return (
      <div>
        <div>
          {this.props.recipes.title}
        </div>
      </div>
    )
  }
}

export default Recipe;