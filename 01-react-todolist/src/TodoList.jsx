import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setTodos((prev) => [...prev, trimmed]);
    setInputValue('');
  };

  const handleDeleteTodo = (indexToDelete) => {
    setTodos((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="todo">
      <h1 className="todo-title">Todo List</h1>
      <div className="todo-input">
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          aria-label="Todo input"
        />
        <button onClick={handleAddTodo} className="todo-add">Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <span className="todo-text">{todo}</span>
            <button
              className="todo-delete"
              onClick={() => handleDeleteTodo(index)}
              aria-label={`Delete ${todo}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;


