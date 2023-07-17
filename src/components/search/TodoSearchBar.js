import React, { useState } from "react";
import "./todoSearchBar.css";

const TodoSearchBar = ({ setSearchQuery }) => {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setSearchQuery(searchText);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={searchText}
        onChange={handleInputChange}
        placeholder="Search Todos"
        className="searchTodos"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default TodoSearchBar;
