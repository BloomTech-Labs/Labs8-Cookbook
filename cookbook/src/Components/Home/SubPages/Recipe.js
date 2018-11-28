import React, { Component } from 'react'
import Image from 'react-image-resizer';
import { Link } from 'react-router-dom';



class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render() {
    // Change props after testing is complete
    const recipeUrl = this.props.dummyData.title.split(' ').join('');

    return (
      <div className="recipeCard">
        <div className="noteCard__title">
          {this.props.dummyData.title}
          {/* {this.props.recipes.title} */}
        </div>
        <div className="recipeCard__body">
          {/* Replace pathname and state with appropriate date after testing is complete. */}
          <Link to={{pathname: `/home/recipe/${recipeUrl}`, state: this.props.dummyData}}>
            <Image 
              src={this.props.dummyData.image}   // {this.props.recipes.image} 
              height={60}
              width={160}
            />
          </Link>
          <div className="recipeSchedule_body">
            Scheduled For
          </div>
        </div>
      </div>
    )
  }
}

export default Recipe;