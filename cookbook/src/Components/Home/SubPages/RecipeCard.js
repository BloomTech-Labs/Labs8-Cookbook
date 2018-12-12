import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { GET_RECIPES_QUERY } from "./Recipes";
import { QUERY_RECIPE_EVENT } from "./Calendar";
import CardSchedule from "../../SubComponents/CardSchedule";
import { toastMessage } from "../../../utils/toastify";

const DELETE_RECIPE_MUTATION = gql`
  mutation($id: ID) {
    deleteRecipe(where: { id: $id }) {
      id
      title
    }
  }
`;

class RecipeCard extends Component {

  deleteHandler = async () => {
    try {
      await this.props.deleteRecipe({
        variables: { id: this.props.recipe.id },
        refetchQueries: [
          { query: GET_RECIPES_QUERY },
          { query: QUERY_RECIPE_EVENT }
        ]
      });
      toastMessage("success", "Deleted recipe succesfully!");
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  };

  handleRecipeView = () => {
    
  }

  render() {
    // URL for each individual recipe to be passed in to route
    const recipeUrl = this.props.recipe.title.split(" ").join("-");

    return (
      <div className='recipe-card-container'>

        <div className='image-and-bottom'>

          <Link className='image-container' style={{backgroundImage: `url(${this.props.recipe.image})`}}
            to={{ pathname: `/home/recipe/${recipeUrl}`, state: this.props.recipe }}
          ></Link>

          <div className='card-bottom'>

            <div className='title-container'>
              <Link className='title' 
                to={{ pathname: `/home/recipe/${recipeUrl}`, state: this.props.recipe }}
              >{this.props.recipe.title}</Link>
            </div>

            <div className="schedule-container">
              <CardSchedule
                key={this.props.recipe.events.length}
                events={this.props.recipe.events}
                recipeId={this.props.recipe.id}
              />
            </div>

            <div className='options-container'>

              <div className='small-line'></div>

              <div className='link-and-delete'>

                <a href={"" + this.props.recipe.url} rel="noopener noreferrer" target="_blank" className="link-container">

                  <FontAwesomeIcon icon="link" className="link-icon" />

                  <span className="link-text">link</span>

                </a>

                <div className="delete-container" onClick={this.deleteHandler}>

                  <FontAwesomeIcon icon="trash-alt" className="delete-icon" />

                  <span className="delete-text">delete</span>

                </div>
              
              </div>

            </div>

          </div>
        
        </div>

      </div>
    );

    // return (
    //   <div className="recipeCard">

    //     <div className="content-container">

    //       <div className="title">{this.props.recipe.title}</div>

    //       <Link
    //         to={{
    //           pathname: `/home/recipe/${recipeUrl}`,
    //           state: this.props.recipe
    //         }}
    //       >
    //         <div
    //           className="image"
    //           style={{ backgroundImage: `url(${this.props.recipe.image})` }}
    //         />
    //       </Link>

    //       <div className="card-bottom">

            // <a
            //   href={"" + this.props.recipe.url}
            //   rel="noopener noreferrer"
            //   target="_blank"
            //   className="link-container"
            // >
            //   <FontAwesomeIcon icon="link" className="web-link" />

            //   <span className="link-text">link</span>
            // </a>

    //         <div className="schedule">
    //           <CardSchedule
    //             key={this.props.recipe.events.length}
    //             events={this.props.recipe.events}
    //             recipeId={this.props.recipe.id}
    //           />
    //         </div>

            // <button className="del-button">

            //   <FontAwesomeIcon
            //     icon="trash-alt"
            //     className="del-icon"
            //     onClick={this.deleteHandler}
            //   />

            //   <span className="del-text">Delete</span>

            // </button>

    //       </div>

    //     </div>

    //   </div>
    // );
  }
}

export default graphql(DELETE_RECIPE_MUTATION, {
  name: "deleteRecipe"
})(RecipeCard);

export { DELETE_RECIPE_MUTATION };
