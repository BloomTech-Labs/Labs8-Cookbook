import React from "react";

const Preview = props => {
  let loading = props.loading ? <div>Loading...</div> : null;

  const preview = props.og_title ? (
    <React.Fragment>
      <img src={props.og_image} alt={props.title} />
      <header>{props.og_title}</header>
      <div>{props.og_desc}</div>
      <div>{props.og_sitename}</div>
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
