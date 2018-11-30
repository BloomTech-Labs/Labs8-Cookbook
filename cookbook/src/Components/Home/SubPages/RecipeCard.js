import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class RecipeCard extends Component {

  handleLink() {
    window.open(this.props.recipe.URL, '_blank');
  }

  handleDelete() {
    console.log(`Delete note ${this.props.recipe.id}`)
  }

  isSearchedFor() {
    // searchInContent will only be true if the search term is in the title, meal, or date of the RecipeCard
    let searchInContent = (~this.props.recipe.title.toLowerCase().indexOf(this.props.search.toLowerCase())) ||
                          (~this.props.recipe.meal.toLowerCase().indexOf(this.props.search.toLowerCase())) ||
                          (~this.props.recipe.date.toLocaleDateString().toLowerCase().indexOf(this.props.search.toLowerCase()));

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
            <div className='link' style={{backgroundImage: `url(${this.props.recipe.image})`}}></div>
          </Link>

          <div className="body">
            
            <button onClick={() => this.handleLink()} className="web-link">Link</button>
            
            <div className="schedule">
              scheduled for
              <div className="meal">{this.props.recipe.meal}</div>
              <div className="date">{this.props.recipe.date}</div>
            </div>
            
            <button onClick={() => this.handleDelete()} className="del-button">Delete</button>
          
          </div>
        </div>
      </div>
    )
  }
}

export default RecipeCard;