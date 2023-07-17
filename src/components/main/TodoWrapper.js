import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import TodoSearchBar from "../search/TodoSearchBar";
import Pagination from "../pagination/Pagination";
import TodoCategoryFilter from "../filteredTodos/TodoCategoryFilter";

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all"); // "all", "checked", "hidden", "edited", "deleted"
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of todos to display per page
  const [editedTodos, setEditedTodos] = useState([]); // Edited todos
  const [deletedTodos, setDeletedTodos] = useState([]); // Deleted todos

  const addTodo = (todo) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      {
        id: uuidv4(),
        task: todo,
        completed: false,
        isEditing: false,
        hidden: false,
      },
    ]);
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    const deletedTodo = todos.find((todo) => todo.id === id);
    if (deletedTodo && !deletedTodos.includes(deletedTodo)) {
      setDeletedTodos((prevDeletedTodos) => [...prevDeletedTodos, deletedTodo]);
    }
  };

  const checkTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, hidden: !todo.hidden } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );

    const editedTodo = todos.find((todo) => todo.id === id);
    if (editedTodo && !editedTodos.includes(editedTodo)) {
      setEditedTodos((prevEditedTodos) => [...prevEditedTodos, editedTodo]);
    }
  };

  const editTask = (task, id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const searchTodos = (todo) => {
    if (searchQuery === "") return true;

    const task = todo.task.toLowerCase();
    const query = searchQuery.toLowerCase();

    return task.includes(query);
  };

  const filterTodos = (todo) => {
    switch (filterCategory) {
      case "all":
        return true;
      case "checked":
        return todo.hidden;
      case "hidden":
        return todo.completed;
      case "edited":
        return (
          todo.isEditing ||
          editedTodos.find((editedTodo) => editedTodo.id === todo.id)
        );
      case "deleted":
        return deletedTodos.find((deletedTodo) => deletedTodo.id === todo.id);
      default:
        return true;
    }
  };

  const filteredTodos = todos.filter(searchTodos);

  const handleFilterChange = (category) => {
    setFilterCategory(category);
    if (category === "deleted") {
      setEditedTodos([]); // Clear editedTodos when "Deleted" category is selected
    }
  };
  

  const currentTodos = filteredTodos
    .filter(filterTodos)
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="TodoWrapper">
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />
      <TodoSearchBar setSearchQuery={setSearchQuery} />
      <TodoCategoryFilter
        editedTodos={editedTodos}
        deletedTodos={deletedTodos}
        filterCategory={filterCategory}
        handleFilterChange={handleFilterChange}
        setFilterCategory={setFilterCategory}
        setEditedTodos={setEditedTodos}
      />

      {currentTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
        ) : (
          <Todo
            task={todo}
            key={todo.id}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            checkTask={checkTask}
          />
        )
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default TodoWrapper;
