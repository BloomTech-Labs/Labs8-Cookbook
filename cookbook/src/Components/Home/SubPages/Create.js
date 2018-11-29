import React, { Component } from "react";
import Preview from "./Preview";
import scraper from "../../../utils/scraper";
import Buttons from "./Buttons";
import DatePicker from "../../SubComponents/DatePicker.js";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

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
      rating: "",
      og_url: "",
      onDate: null,
      firstload: true
    };
  }

  componentDidMount() {
    this.setState({ firstload: false });
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, loadingPreview: false });
  };

  handlePickDate = date => {
    this.setState({ onDate: date });
  };

  mealButtonHandler = e => {
    e.preventDefault();
    this.setState({
      type: e.target.name
    });
  };

  findRecipes = () => {
    this.setState({ loadingPreview: true }, async () => {
      try {
        const data = await scraper(this.state.query);
        this.setState({
          ...data,
          loadingPreview: false
        });
      } catch (error) {
        console.log(error.data);
      }
    });
  };

  onSave = async (cb1, vars1, cb2, vars2) => {
    const { data } = await cb1({
      variables: vars1
    });

    const newVars = {
      ...vars2,
      recipe: data.createRecipe.id
    };

    console.log(newVars);

    const data2 = await cb2({
      variables: newVars
    });

    return data2;
  };

  render() {
    const createRecipeVariables = {
      title: this.state.og_title,
      prepTime: this.state.prep_time,
      servings: this.state.servings,
      image: this.state.og_image,
      url: this.state.og_url
    };
    console.log(this.state.firstload);
    if (!this.state.firstload) {
      return (
        <div className="create-wrapper">
          <div className="create-content-wrapper">
            <input
              type="text"
              name="query"
              placeholder="Search Recipe..."
              onChange={this.handleChange}
              value={this.state.query}
            />
            <button onClick={this.findRecipes}>Search</button>
            <Preview
              og_title={this.state.og_title}
              og_sitename={this.state.og_sitename}
              og_image={this.state.og_image}
              og_desc={this.state.og_desc}
              prep_time={this.state.prep_time}
              rating={this.state.rating}
              servings={this.state.servings}
              loading={this.state.loadingPreview}
            />
            <Mutation mutation={CREATE_RECIPE_MUTATION}>
              {createRecipe => {
                const createEventVariables = {
                  mealType: this.state.type,
                  date: this.state.onDate
                };

                return (
                  <Mutation mutation={CREATE_EVENT_MUTATION}>
                    {createEvent => {
                      return (
                        <button
                          onClick={() =>
                            this.onSave(
                              createRecipe,
                              createRecipeVariables,
                              createEvent,
                              createEventVariables
                            )
                          }
                        >
                          SAVE
                        </button>
                      );
                    }}
                  </Mutation>
                );
              }}
            </Mutation>
            {/* <Mutation mutation={CREATE_RECIPE_MUTATION} variables={createRecipeVariables}>
              {(createRecipe, { data }) => {
                // if (data) {
                //   return (
                //     <Mutation mutation={CREATE_EVENT_MUTATION} variables={{ 
                //       mealType: this.state.type,
                //       date: this.state.onDate, 
                //       IDID: data.createRecipe.id,
                //     }}>
                //     {(createEvent, { data }) => {
                //       createEvent();
                //       if (data) {
                //         console.log(data)
                //       } return 
                //     }} 
                //   </Mutation>
                //   )
                // }
                return(
                  <button onClick={createRecipe}>SAVE</button>
                )
              }}
            </Mutation> */}
          </div>
          <div className="create-filter-wrapper">
            <div className="ID-btn">
              <Buttons
                mealButtonHandler={this.mealButtonHandler}
                type={this.state.type}
              />
            </div>
            <DatePicker handlePickDate={this.handlePickDate} />
          </div>
        </div>
      );
    }
    return <p>loading...</p>;
  }
}

export default Create;
