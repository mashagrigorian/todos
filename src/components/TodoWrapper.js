// import React, { useState } from "react";
// import { TodoForm } from "./TodoForm";
// import { v4 as uuidv4 } from "uuid";
// import { Todo } from "./Todo";
// import { EditTodoForm } from "./EditTodoForm";
// uuidv4();

// export const TodoWrapper = () => {
//     const [todos, setTodos] = useState([]);

//     const addTodo = todo => {
//         setTodos([...todos, {id: uuidv4(), task: todo,
//         completed: false, isEditing: false, hidden: false}])
//         // console.log(todos)
//     }

//     const toggleComplete = id => {
//         setTodos(todos.map(todo => todo.id === id ? {...
//             todo, completed: !todo.completed} : todo
//         ))
//     }

//     const checkTask = id => {
//         setTodos(todos.map(todo => todo.id === id ? {...
//             todo, hidden: !todo.hidden} : todo
//         ))
//     }

//     const deleteTodo = id => {
//         setTodos(todos.filter(todo => todo.id !== id))
//     }

//     const editTodo = id => {
//         setTodos(todos.map(todo => todo.id === id ? {
//             ...todo, isEditing: !todo.isEditing} : todo
//         ))
//     }

//     const editTask = (task, id) => {
//         setTodos(todos.map(todo => todo.id === id ? {
//             ...todo, task, isEditing: !todo.isEditing} : todo))
//     }

//   return (
//     <div className="TodoWrapper" >
//     <h1>Get Things Done!</h1>
//       <TodoForm addTodo={addTodo} />
//           {todos.map((todo, index) => (
//             todo.isEditing ? (
//                 <EditTodoForm editTodo={editTask} task={todo} key={todo.id}/>
//             ) : (
//                 <Todo task={todo} key={todo.id}
//                 toggleComplete={toggleComplete}
//                 checkTask={checkTask}
//                 deleteTodo={deleteTodo} editTodo={editTodo}/>
//             )
//       ))}
//     </div>
//   );
// };

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import TodoSearchBar from "./search/TodoSearchBar";
import Pagination from "./pagination/Pagination";
import TodoCategoryFilter from "./TodoCategoryFilter";

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all"); // "all", "checked", "hidden", "edited", "deleted"
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of todos to display per page

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

  //   const filterTodos = (todo) => {
  //     switch (filterCategory) {
  //       case "all":
  //         return true;
  //       case "checked":
  //         return todo.completed && !todo.hidden && !todo.isEditing && todos.includes(todo);
  //       case "hidden":
  //         return !todo.completed && todo.hidden && !todo.isEditing && todos.includes(todo);
  //       case "edited":
  //         return !todo.completed && !todo.hidden && todo.isEditing && todos.includes(todo);
  //       case "deleted":
  //         return !todos.includes(todo);
  //       default:
  //         return true;
  //     }
  //   };

  //   const filteredTodos = todos.filter((todo) => searchTodos(todo) && filterTodos(todo));

  //   const currentTodos = filteredTodos
  //   .filter(filterTodos)
  //   .slice(indexOfFirstTodo, indexOfLastTodo);

  //    // Calculate pagination
  //    const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);
  //    const indexOfLastTodo = currentPage * itemsPerPage;
  //    const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  // //    const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  //    const handlePageChange = (page) => {
  //     setCurrentPage(page);
  //   };
  const filterTodos = (todo) => {
    switch (filterCategory) {
      case "all":
        return true;
      case "checked":
        return todo.completed;
      case "hidden":
        return todo.hidden;
      case "edited":
        return todo.isEditing;
      case "deleted":
        return !todos.includes(todo);
      default:
        return true;
    }
  };

  const filteredTodos = todos.filter(searchTodos);

  const handleFilterChange = (category) => {
    setFilterCategory(category);
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
        handleFilterChange={handleFilterChange}
        setFilterCategory={setFilterCategory}
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
