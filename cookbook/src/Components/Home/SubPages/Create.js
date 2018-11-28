import React, { Component } from "react";
import Preview from "./Preview";
import scraper from "../../../utils/scraper";
import Buttons from "./Buttons";
import DatePicker from '../../SubComponents/DatePicker.js';

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
      onDate: null
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value, loadingPreview: false });
  };

  handlePickDate = (date) => {
    this.setState({onDate: date});
  }

  mealButtonHandler = (e) =>  {
    e.preventDefault();
    this.setState({
      type: e.target.name
    })
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
            <Buttons 
              mealButtonHandler={this.mealButtonHandler}
              type={this.state.type}
            />
          </div>
          <DatePicker handlePickDate={this.handlePickDate}></DatePicker>
        </div>
      </div>
    );
  }
}

export default Create;
