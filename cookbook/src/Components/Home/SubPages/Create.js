import React, { Component } from "react";
import Preview from "./Preview";
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";
import scraper from "../../../utils/scraper";
import Buttons from "./Buttons";
import DatePicker from "../../SubComponents/DatePicker.js";
import { GET_RECIPES_QUERY } from "./Recipes";
import { QUERY_RECIPE_EVENT } from "./Calendar";

const CREATE_RECIPE_MUTATION = gql`
  mutation(
    $title: String!
    $prepTime: String!
    $servings: String!
    $image: String!
    $url: String!
  ) {
    createRecipe(
      title: $title
      prepTime: $prepTime
      servings: $servings
      image: $image
      url: $url
    ) {
      id
      title
      prepTime
      servings
      image
      url
    }
  }
`;

const CREATE_INSTRUCTION_MUTATION = gql`
  mutation($stepNum: Int!, $description: String!, $recipe: String!) {
    createInstruction(
      stepNum: $stepNum
      description: $description
      recipe: $recipe
    ) {
      stepNum
      description
      recipe {
        id
        title
      }
    }
  }
`;

const CREATE_INGREDIENT_MUTATION = gql`
  mutation($name: String!, $quantity: String!, $recipe: String!) {
    createIngredient(name: $name, quantity: $quantity, recipe: $recipe) {
      name
      quantity
      recipe {
        id
        title
      }
    }
  }
`;

const CREATE_EVENT_MUTATION = gql`
  mutation($date: String!, $mealType: String!, $recipe: String!) {
    createEvent(date: $date, mealType: $mealType, recipe: $recipe) {
      id
      mealType
      date
      recipe {
        id
        title
      }
    }
  }
`;

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      type: "",
      loadingPreview: false,
      og_title: "",
      og_sitename: "",
      og_image: "",
      og_desc: "",
      prep_time: "",
      servings: "",
      og_url: "",
      instructions: [],
      ingredient_list: [],
      onDate: null
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, loadingPreview: false });
    this.findRecipes();
  };

  handlePickDate = date => {
    this.setState({ onDate: date });
  };

  mealButtonHandler = e => {
    e.preventDefault();
    if (this.state.type === e.target.name) {
      this.setState({ type: "" })
    } else {
      this.setState({ type: e.target.name });
    }
  };

  findRecipes = () => {
    this.setState({ loadingPreview: true }, async () => {
      try {
        const data = await scraper(this.state.query);
        this.setState({
          ...data,
          og_title: data.og_title ? data.og_title : "N/A",
          loadingPreview: false
        });
      } catch (error) {
        console.log(error.data);
        return error.data;
      }
    });
  };

  onSave = async () => {
    //If no recipe title scraped, then save button won't work.
    if (!this.state.og_title || this.state.og_title === "N/A") return;

    try {
      //variables for createRecipe
      const recipeVariables = {
        title: this.state.og_title,
        prepTime: this.state.prep_time,
        servings: this.state.servings,
        image: this.state.og_image,
        url: this.state.og_url
      };

      //Execute createRecipe
      const { data } = await this.props.createRecipe({
        variables: recipeVariables,
        refetchQueries: [{ query: GET_RECIPES_QUERY }]
      });
      console.log("Recipe created: ", data.createRecipe);

      //If url is not whitelisted, then no instructions saved
      if (this.state.instructions.length) {
        this.state.instructions.forEach(async (instruction, index) => {
          //variables for createInstruction
          const instructionVariables = {
            stepNum: index + 1,
            description: instruction,
            recipe: data.createRecipe.id
          };

          //execute createInstruction
          await this.props.createInstruction({
            variables: instructionVariables
          });
        });
      }
      console.log("Instructions created.");

      //If url is not whitelisted, then no ingredients saved
      if (this.state.ingredient_list.length) {
        this.state.ingredient_list.forEach(async ingredient => {
          //variables for createIngredient
          const ingredientVariables = {
            name: ingredient.name,
            quantity: ingredient.quantity,
            recipe: data.createRecipe.id
          };

          //execute createIngredient
          await this.props.createIngredient({
            variables: ingredientVariables
          });
        });
      }
      console.log("Ingredients created.");

      if (this.state.onDate && this.state.type) {
        //variables for createEvent
        const eventVariables = {
          mealType: this.state.type,
          date: this.state.onDate,
          recipe: data.createRecipe.id
        };

        //Execute createEvent
        const eventData = await this.props.createEvent({
          variables: eventVariables,
          refetchQueries: [
            { query: QUERY_RECIPE_EVENT },
            { query: GET_RECIPES_QUERY }
          ]
        });
        console.log("Event created: ", eventData);

        return this.props.history.push("/home/recipes");
      }

      return this.props.history.push("/home/recipes");
    } catch (error) {
      console.log("onsave error: ", error.message);
      return error;
    }
  };

  handleSearchClass = () => {
    if (this.state.query) return 'is-searching';
    return 'not-searching';
  }

  render() {
    return (
      <div className="create-wrapper">

        <div className='search-and-save'>

          <input
            className={this.handleSearchClass()}
            type="text"
            name="query"
            placeholder="recipe url"
            onChange={this.handleChange}
            value={this.state.query}
          />

          <button onClick={this.onSave}>save</button>

        </div>

        <div className="preview-and-schedule">

          {this.state.og_title === "N/A" ? (
            <div>No preview available</div>
          ) : (
            <Preview
              og_title={this.state.og_title}
              og_sitename={this.state.og_sitename}
              og_image={this.state.og_image}
              og_desc={this.state.og_desc}
              loading={this.state.loadingPreview}
            />
          )}

          <div className='schedule'>

            <Buttons
              mealButtonHandler={this.mealButtonHandler}
              type={this.state.type}
            />
            
            <div className='create-date-picker'>
              <DatePicker handlePickDate={this.handlePickDate} />
            </div>

          </div>

        </div>

      </div>
    );
  }
}

const createRecipeMutation = graphql(CREATE_RECIPE_MUTATION, {
  name: "createRecipe"
});
const createEventMutation = graphql(CREATE_EVENT_MUTATION, {
  name: "createEvent"
});
const createInstructionMutation = graphql(CREATE_INSTRUCTION_MUTATION, {
  name: "createInstruction"
});
const createIngredientMutation = graphql(CREATE_INGREDIENT_MUTATION, {
  name: "createIngredient"
});

export default compose(
  createRecipeMutation,
  createEventMutation,
  createInstructionMutation,
  createIngredientMutation
)(Create);
