import { useEffect, useState } from 'react';
import './Planner3.scss';

type TaskProps = {
    id: number
    text: string
    completed: boolean
}

const Planner3 = () => {
  // States

  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState<TaskProps[]>([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState<TaskProps[]>([]);

  // Handlers

  const handleDelete = (id: number) => {
    const newTasks = todos.filter((todo) => todo.id !== id);
    setTodos(newTasks);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    const newTodo = {
      id: Math.random() * 1000,
      text: inputText,
      completed: false,
    };

    setTodos([...todos].concat(newTodo));
    setInputText('');
  };

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

  const statusHandler = (e:any) => {
    setStatus(e.target.value);
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
  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  // TODO BUILDER

  return (
    <div className="todo">
      <form className="todo-container">
        <input
          type="text"
          placeholder="Add your todo here"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="button" className="todo-btn" onClick={handleSubmit}>Add</button>
        <div className="todo-list">
          {filteredTodos.map(({ text, completed, id }) => (
            <li>
              <input type="checkbox" onChange={() => toogleComplete(id)} checked={completed} />
              <span className={`todo-item ${completed ? 'completed' : ''}`}>{text}</span>
              <button className="todo-delete" type="button" onClick={() => { handleDelete(id); }}>X</button>
            </li>
          ))}
          <div className="todo-buttons">
            <button className="main-btn" type="button" onClick={statusHandler} value="all">All</button>
            <button className="main-btn" type="button" onClick={statusHandler} value="uncompleted">In progress</button>
            <button className="main-btn" type="button" onClick={statusHandler} value="completed">Completed</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Planner3;
