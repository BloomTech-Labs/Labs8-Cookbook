import React from "react";

const Preview = props => {
  let loading = props.loading ? <div>Loading...</div> : null;

  const preview = props.og_title ? (
    <div className='preview'>
      <div className='title'>{props.og_title}</div>
      <div className='image-container'>
        <img className='image' src={props.og_image} alt={props.title} />
      </div>
      <div className='body'>
        <div className='description'>{props.og_desc}</div>
        <div className='site'>{props.og_sitename}</div>
      </div>
    </div>
  ) : null;

  return (
    <section className="recipe-preview">
      {loading}
      {preview}
    </section>
  );
};

export default Preview;
