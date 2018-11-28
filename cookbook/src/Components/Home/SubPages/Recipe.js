import React, { Component } from 'react'
import Image from 'react-image-resizer';

class Recipe extends Component {
  constructor(props) {
    super(props);
    console.log(`Props: ${this.props}`);
    this.state = {

    }
  }


  render() {
    return (
      <div className="recipeCard">
        <div className="noteCard__title">
          {this.props.dummyData.title}
          {/* {this.props.recipes.title} */}
        </div>
        <div className="recipeCard__body">
          <Image 
            src={this.props.dummyData.image}   // {this.props.recipes.image} 
            height={60}
            width={160}
          />
          <div className="recipeSchedule_body">
            Scheduled For
          </div>
        </div>
      </div>
    )
  }
}

export default Recipe;