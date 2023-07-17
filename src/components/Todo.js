import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export const Todo = ({ task, toggleComplete, deleteTodo, editTodo, checkTask }) => {
  const handleToggleComplete = () => {
    toggleComplete(task.id);
  };

  const handleCheckTask = () => {
    checkTask(task.id);
  };

  return (
    <div className={`Todo ${task.completed ? "completed" : ""}`}>
      <div>
        <p
          onClick={handleToggleComplete}
          className={`${task.completed ? "hidden" : ""} ${task.hidden ? "completed" : ""}`}
        >
          {task.task}
        </p>
      </div>

      <div>
        <FontAwesomeIcon
          icon={faCheck}
          onClick={handleCheckTask}
          className={`${task.completed ? "hidden" : ""}`}
        />
        <FontAwesomeIcon icon={faEyeSlash} onClick={handleToggleComplete} />
        <FontAwesomeIcon icon={faPenToSquare} onClick={() => editTodo(task.id)} />
        <FontAwesomeIcon icon={faTrash} onClick={() => deleteTodo(task.id)} />
      </div>
    </div>
  );
};
