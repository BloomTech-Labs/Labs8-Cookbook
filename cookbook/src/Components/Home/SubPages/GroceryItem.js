import React from "react";

const GroceryItem = props => {
  return (
    <div id={props.ingredient.name} className="list-item">
      <input
        type="checkbox"
        checked={props.ingredient.isCompleted}
        onClick={() => props.handleItemClick(props.index)}
      />
      <span onClick={() => props.handleItemClick(props.index)}>
        {props.ingredient.quantity} {props.ingredient.name}
      </span>
    </div>
  );
};

export default GroceryItem;
