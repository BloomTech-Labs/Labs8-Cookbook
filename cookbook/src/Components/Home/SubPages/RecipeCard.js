import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class RecipeCard extends Component {
  render() {
    // URL for each individual recipe to be passed in to route
    const recipeUrl = this.props.recipe.title.split(" ").join("-");
    return (
      // make the RecipeCard visible only if searched for
      <div className="recipeCard">
        <div className="content-container">
          <div className="title">{this.props.recipe.title}</div>
          <Link
            to={{
              pathname: `/home/recipe/${recipeUrl}`,
              state: this.props.recipe
            }}
          >
            <div
              className="image"
              style={{ backgroundImage: `url(${this.props.recipe.image})` }}
            />
          </Link>
          <div className="card-bottom">
            <a
              href={"" + this.props.recipe.url}
              rel="noopener noreferrer"
              target="_blank"
              className="link-container"
            >
              <FontAwesomeIcon icon="link" className="web-link" />
              <span className="link-text">link</span>
            </a>
            <div className="schedule">
              <span>scheduled for</span>
              {this.props.recipe.events.map(event => (
                <div className="event" key={event.id}>
                  <div>{event.mealType}</div>
                  <div>{new Date(event.date).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
            <button className="del-button">
              <FontAwesomeIcon icon="trash-alt" className="del-icon" />
              <span className="del-text">Delete</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RecipeCard;
