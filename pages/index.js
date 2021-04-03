import React, { useReducer } from 'react';
import TaskList from '../components/TaskList';
import { TasksContext } from '@lib/context';
import tasksReducer from '@lib/tasksReducer';

const initialState = {
  tasks: [
    {
      id: "34l5kj345k34j",
      text: "Task One",
      completed: false,
    }
  ]
};

const Home = () => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      <div className="container">
        <TaskList />
      </div>
    </TasksContext.Provider>
  );
};

export default Home;