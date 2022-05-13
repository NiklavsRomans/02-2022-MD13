import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Planner5.scss';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

type TaskProps = {
    text: string
    completed: boolean
    id: number
    priority: string

}

const Planner5 = () => {
  // States
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState<TaskProps[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<TaskProps[]>([]);
  const [priorityy, setPriority] = useState('low');
  const [todoEditing, setTodoEditing] = useState(0);
  const [editingText, setEditingText] = useState('');

  // Handlers
  const handleSubmit = () => {
    const newTodo = {
      id: Math.random() * 1000,
      text: inputText,
      completed: false,
      priority: priorityy,
    };
    setTodos([...todos, newTodo]);
    setFilteredTodos([...todos, newTodo]);
    setInputText('');
  };

  const handleCompleted = (id:number) => {
    const newTodo = [...filteredTodos].map((todo) => {
      if (todo.id === id) {
        // eslint-disable-next-line no-param-reassign
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setFilteredTodos(newTodo);
  };

  const handleDelete = (id: number) => {
    const newTodo = todos.filter((todo) => todo.id !== id);
    setTodos(newTodo);
    setFilteredTodos(newTodo);
  };

  const handleProgress = () => {
    const doneTasks = todos.filter((todo) => todo.completed);
    const calcLength = (doneTasks.length / todos.length) * 100;
    return calcLength;
  };

  const editTodo = (id: number) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        // eslint-disable-next-line no-param-reassign
        todo.text = editingText;
      }
      return todo;
    });
    setFilteredTodos(updatedTodos);
    setTodoEditing(0);
    setEditingText('');
  };

  const taskButtons = [
    {
      title: 'All',
      onclick: () => {
        setFilteredTodos([...todos]);
      },
    },
    {
      title: 'Completed',
      onclick: () => {
        const newTodos = [...todos];
        setFilteredTodos(newTodos.filter((todo) => todo.completed));
      },
    },
    {
      title: 'In Progress',
      onclick: () => {
        const newTodos = [...todos];
        setFilteredTodos(newTodos.filter((todo) => !todo.completed));
      },
    },
    {
      title: 'High Priority',
      onclick: () => {
        const newTodos = [...todos];
        setFilteredTodos(newTodos.filter((todo) => todo.priority === 'High'));
      },
    },
    {
      title: 'Medium Priority',
      onclick: () => {
        const newTodos = [...todos];
        setFilteredTodos(newTodos.filter((todo) => todo.priority === 'Medium'));
      },
    },
    {
      title: 'Low Priority',
      onclick: () => {
        const newTodos = [...todos];
        setFilteredTodos(newTodos.filter((todo) => todo.priority === 'Low'));
      },
    },
  ];

  return (
    <div className="todo">
      <div className="progress-bar">
        <div className="progress-line" style={{ width: `${handleProgress()}%` }} />
      </div>
      <input type="text" placeholder="Add your todo" onChange={(e) => setInputText(e.target.value)} value={inputText} />
      <select onChange={(e) => setPriority(e.target.value)}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <button onClick={handleSubmit}>Add</button>
      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <li className={`${todo.priority}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCompleted(todo.id)}
            />
            {todoEditing === todo.id ? (
              <input type="text" value={editingText} onChange={(e) => setEditingText(e.target.value)} />
            ) : (
              <span className={`${todo.completed ? 'completed' : ''}`}>{todo.text}</span>
            )}
            {todoEditing === todo.id ? (
              <button onClick={() => editTodo(todo.id)}>Save</button>
            ) : (
              <button
                className="edit-btn"
                onClick={() => setTodoEditing(todo.id)}
              >
                <FontAwesomeIcon icon={faEdit} />

              </button>
            )}
            <button className="todo-delete" onClick={() => handleDelete(todo.id)}>X</button>
          </li>
        ))}
        <div className="todo-btns">
          {taskButtons.map((button) => (
            <button className="todo-new-btn" onClick={button.onclick}>{button.title}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Planner5;
