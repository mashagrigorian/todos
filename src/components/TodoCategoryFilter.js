import React from "react";

const TodoCategoryFilter = ({ setFilterCategory }) => {
  const handleFilterChange = (category) => {
    setFilterCategory(category);
  };

  return (
    <div className="TodoCategoryFilter">
      <button onClick={() => handleFilterChange("all")}>All</button>
      <button onClick={() => handleFilterChange("checked")}>Checked</button>
      <button onClick={() => handleFilterChange("hidden")}>Hidden</button>
      <button onClick={() => handleFilterChange("edited")}>Edited</button>
      <button onClick={() => handleFilterChange("deleted")}>Deleted</button>
    </div>
  );
};

export default TodoCategoryFilter;
