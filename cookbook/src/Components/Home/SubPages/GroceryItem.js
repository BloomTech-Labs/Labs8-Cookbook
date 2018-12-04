import React from "react";

const GroceryItem = props => {
  return (
    <div>
      <input type="checkbox" />
      {props.ingredient.quantity} {props.ingredient.name}
    </div>
  );
};

export default GroceryItem;
