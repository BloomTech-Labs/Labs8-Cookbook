import React, { Component } from "react";
import Preview from "./Preview";
import scraper from "../../../utils/scraper";
import Buttons from "./Buttons";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      type: "breakfast",
      loadingPreview: false,
      og_title: "",
      og_sitename: "",
      og_image: "",
      og_desc: "",
      prep_time: "",
      servings: "",
      rating: ""
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, loadingPreview: false });
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

  
  isBreakfast = (e) =>  {
    e.preventDefault(); 
    this.setState({type: "breakfast"})
  };

  isLunch = (e) => {
    e.preventDefault();
    this.setState({type: "lunch"})
  };

  isDinner = (e) => {
    e.preventDefault();
    this.setState({type: "dinner"})
  };

  isSnack = (e) => {
    e.preventDefault();
    this.setState({type: "snack"})
  };

  isDessert = (e) => {
    e.preventDefault();
    this.setState({type: "dessert"})
  };

  render() {
    const saveButton = this.state.og_title ? <button>SAVE</button> : null;

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
          {saveButton}
        </div>
        <div className="create-filter-wrapper">
          <div className="recipe-btn">
            <Buttons />
          </div>
          <div className="input-calendar">placeholder</div>
        </div>
      </div>
    );
  }
}

export default Create;
