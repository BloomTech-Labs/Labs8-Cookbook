import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class RecipeCard extends Component {

  isSearchedFor() {
    // searchInContent will only be true if the search term is in the title, meal, or date of the RecipeCard
    let searchInContent = (~this.props.recipe.title.toLowerCase().indexOf(this.props.search.toLowerCase())) ||
                          (~this.props.recipe.event.mealType.toLowerCase().indexOf(this.props.search.toLowerCase())) ||
                          (~this.props.recipe.event.date.toLocaleDateString().toLowerCase().indexOf(this.props.search.toLowerCase()));

    let isInFilter = this.props.filter.size === 0 || this.props.filter.has(this.props.recipe.meal);

    return searchInContent && isInFilter;
  }


  render() {
    // URL for each individual recipe to be passed in to route
    const recipeUrl = this.props.recipe.title.split(' ').join('-');
    return (
      // make the RecipeCard visible only if searched for
      <div className={this.isSearchedFor() ? "recipeCard" : "recipeCardInvisible"}>
        <div className='content-container'>
          <div className="title">
            {this.props.recipe.title}
          </div>
          <Link to={{pathname: `/home/recipe/${recipeUrl}`, state: this.props.recipe}}>
            <div className='image' style={{backgroundImage: `url(${this.props.recipe.image})`}}></div>
          </Link>
          <div className='card-bottom'>  
              <a href={'' + this.props.recipe.url} className='link-container'>
                <FontAwesomeIcon icon='link' className='web-link'/>
                <span className='link-text'>link</span>
              </a>
              <div className="schedule">
                <span>scheduled for</span>
                {this.props.recipe.events.map(event => 
                  <div className='event'>
                    <div>{event.mealType}</div>
                    <div>{event.date}</div>
                  </div>
                )}
              </div>
            <button className="del-button">
              <FontAwesomeIcon icon='trash-alt' className='del-icon'/>
              <span className='del-text'>Delete</span>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default RecipeCard;