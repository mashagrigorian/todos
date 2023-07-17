import React from "react";

const TodoCategoryFilter = ({ setFilterCategory, editedTodos, deletedTodos, filterCategory, setEditedTodos }) => {
  const handleFilterChange = (category) => {
    setFilterCategory(category);
    if (category === "deleted") {
      setEditedTodos([]); // Call setEditedTodos from props
    }
  };

  const getHighlightedClass = (category) => {
    return filterCategory === category ? "highlighted" : "";
  };

  return (
    <div className="TodoCategoryFilter">
      <button onClick={() => handleFilterChange("all")} className={getHighlightedClass("all")}>
        All
      </button>
      <button onClick={() => handleFilterChange("checked")} className={getHighlightedClass("checked")}>
        Checked
      </button>
      <button onClick={() => handleFilterChange("hidden")} className={getHighlightedClass("hidden")}>
        Hidden
      </button>
      <button onClick={() => handleFilterChange("edited")} className={getHighlightedClass("edited")}>
        Edited ({editedTodos.length})
      </button>
      <button onClick={() => handleFilterChange("deleted")} className={getHighlightedClass("deleted")}>
        Deleted ({deletedTodos.length})
      </button>
    </div>
  );
};

export default TodoCategoryFilter;
