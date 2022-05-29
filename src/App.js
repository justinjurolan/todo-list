import './App.css';
import { useReducer, useState } from 'react';
import Todo from './components/Todo';

export const ACTIONS = {
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo',
};

function reducer(tasks, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...tasks, newTask(action.payload.taskName)];
    case ACTIONS.TOGGLE_TODO:
      return tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, complete: !task.complete };
        }
        return task;
      });
    case ACTIONS.DELETE_TODO:
      return tasks.filter((task) => task.id !== action.payload.id);
    default:
      return tasks;
  }
}

function newTask(taskName) {
  return { id: Date.now(), taskName: taskName, complete: false };
}

export default function App() {
  const [tasks, dispatch] = useReducer(reducer, []);
  const [taskName, setTaskName] = useState('');
  const [errorMessage, setNewErrorMessage] = useState('');
  const pendingTasks = tasks.filter((task) => task.complete === false);

  // Form Submission Handler
  function handleSubmit(e) {
    e.preventDefault();
    if (taskName.trim() === '') {
      setNewErrorMessage('this field cannot be blank');
    } else if (taskName.length >= 30) {
      setNewErrorMessage(`You've reached maximum number of characters`);
    } else if (
      tasks.filter(
        (task) => task.taskName.toLowerCase() === taskName.toLowerCase().trim()
      ).length > 0
    ) {
      setNewErrorMessage('task name already taken');
    } else if (tasks.filter((task) => task.complete === false).length === 12) {
      setNewErrorMessage(`You've reached maximum number of characters`);
    } else {
      dispatch({ type: ACTIONS.ADD_TODO, payload: { taskName: taskName } });
      setTaskName('');
      setNewErrorMessage('');
    }
  }

  return (
    <div className="App">
      <div className="header">
        <h1 className="title-one">To-Do List</h1>
        <h2>What will you do today?</h2>
      </div>
      {/* Task Form */}
      <br></br>
      <label>Task Name:</label>
      <form onSubmit={handleSubmit}>
        <input
          className="input-task"
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </form>
      <span style={{ color: 'red' }}>{errorMessage}</span>
      <div className="task-body">
        {/* Pending Tasks */}
        <div className="pending-task">
          <h3>Pending Task</h3>
          <div>
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => {
                return <Todo key={task.id} todo={task} dispatch={dispatch} />;
              })
            ) : (
              <p>No Pending Tasks</p>
            )}
          </div>
        </div>
        {/* Completed Task */}
        <div className="completed-task">
          <h3>Completed Task</h3>
          {tasks
            .filter((task) => task.complete === true)
            .map((item) => {
              return <Todo key={item.id} todo={item} dispatch={dispatch} />;
            })}
        </div>
      </div>
    </div>
  );
}
