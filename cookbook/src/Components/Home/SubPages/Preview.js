import React, { Component } from "react";
import styled from "styled-components";

const Section = styled.section`
  grid-area: main;
`;

const Preview = props => {
  let loading = null;
  if (!props.loading && !props.og_title) {
    loading = <div>Please enter a recipe for preview</div>;
  } else if (props.loading && !props.og_title) {
    loading = <div>Loading...</div>;
  }

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
      <div>
        Prep Time: {props.prep_time}, Cook Time:
        {props.cook_time}, Total Time: {props.total_time}
      </div>
      <div>{props.og_desc}</div>
    </React.Fragment>
  ) : null;

  return (
    <section>
      {loading}
      {preview}
    </section>
  );
};

export default Preview;
