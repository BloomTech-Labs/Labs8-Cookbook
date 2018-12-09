import React from "react";

const GroceryItem = props => {
  return (
    <div
      id={props.ingredient.name}
      className={`list-item ${
        props.ingredient.isCompleted ? "completed" : null
      }`}
    >
      <div className="checkbox-container">
        <input
          className="gl-checkbox"
          type="checkbox"
          checked={props.ingredient.isCompleted}
          onChange={() => props.handleItemClick(props.index)}
        />
      </div>
      <span
        className="item-text"
        onClick={() => props.handleItemClick(props.index)}
      >
        {props.ingredient.quantity} {props.ingredient.name}
      </span>
    </div>
  );
};

export default GroceryItem;
