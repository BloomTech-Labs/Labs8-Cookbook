import React from "react";

const GroceryItem = props => {
  return (
    <div>
      <input type="checkbox" onClick={props.handleItemClick} />
      {props.ingredient.quantity} {props.ingredient.name}
    </div>
  );
};

export default GroceryItem;
