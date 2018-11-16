import React, { Component } from "react";

const Preview = props => {
  let loading = props.loading ? <div>Loading...</div> : null;

  const preview = props.og_title ? (
    <React.Fragment>
      <div>{props.og_sitename}</div>
      <header>{props.og_title}</header>
      <img
        src={props.og_image}
        alt={props.title}
        // style={{ height: "160px", width: "270" }}
      />
      <div>Rating: {props.rating}</div>
      <div>Prep Time: {props.prep_time}</div>
      <div>Servings: {props.servings}</div>
      <div>{props.og_desc}</div>
    </React.Fragment>
  ) : null;

  return (
    <section className="recipe-preview">
      {loading}
      {preview}
    </section>
  );
};

export default Preview;
