import { useEffect, useState } from 'react';
import './Planner4.scss';

type TaskProps = {
    text: string
    completed: boolean
    id: number

}

const Planner4 = () => {
  // States
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState<TaskProps[]>([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState<TaskProps[]>([]);
  const [todoEditing, setTodoEditing] = useState(0);
  const [editingText, setEditingText] = useState('');

  // Handlers

  const toogleComplete = (id: number) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        // eslint-disable-next-line no-param-reassign
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const newTodo = {
      id: Math.random() * 1000,
      text: inputText,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setInputText('');
  };

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };
    // USE EFFECT
  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  const handleDelete = (id: number) => {
    const newLists = todos.filter((todo) => todo.id !== id);
    setTodos(newLists);
  };

  const statusHandler = (e: any) => {
    setStatus(e.target.value);
  };

  const editTodo = (id: number) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        // eslint-disable-next-line no-param-reassign
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(0);
    setEditingText('');
  };

  return (
    <div className="todo">
      <input
        type="text"
        className="todo-input"
        placeholder="Add your todo here"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        className="todo-btn"
        onClick={handleSubmit}
      >

        Add

      </button>
      <div className="todo-list">
        {filteredTodos.map(({ text, completed, id }) => (
          <li>
            <input
              onChange={() => toogleComplete(id)}
              type="checkbox"
              checked={completed}
            />
            {todoEditing === id ? (
              <input
                type="text"
                onChange={(e) => setEditingText(e.target.value)}
                value={editingText}
              />
            ) : (
              <span className={`todo-item ${completed ? 'completed' : ''}`}>
                {text}
              </span>
            )}
            {todoEditing === id ? (
              <button onClick={() => editTodo(id)}>Save</button>
            ) : (
              <button onClick={() => setTodoEditing(id)}>
                <i className="fas fa-trash" />
              </button>
            )}
            <button
              className="todo-delete"
              onClick={() => {
                handleDelete(id);
              }}
            >
              X

            </button>

          </li>
        ))}
        <div className="todo-buttons">
          <button className="main-btn" onClick={statusHandler} value="all">All</button>
          <button className="main-btn" onClick={statusHandler} value="uncompleted">In progress</button>
          <button className="main-btn" onClick={statusHandler} value="completed">Completed</button>
        </div>
      </div>
    </div>
  );
};

export default Planner4;
