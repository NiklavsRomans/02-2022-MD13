import { useState } from 'react';
import './Planner1.scss';

type TaskProps = {
    id: number
    text: string
}

const Planner1 = () => {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState<TaskProps[]>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const newTodo = {
      id: Math.random() * 1000,
      text: inputText,
    };
    setTodos([...todos].concat(newTodo));
    setInputText('');
  };

  return (
    <div className="todo">
      <form className="todo-container">
        <input
          type="text"
          placeholder="Add your todo"
          className="todo-input"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button className="todo-btn" onClick={handleSubmit}>Add</button>
      </form>
      <div className="todo-list">
        {todos.map((todo) => (
          <li className="list-item">
            {todo.text}
          </li>
        ))}
      </div>
    </div>
  );
};

export default Planner1;
