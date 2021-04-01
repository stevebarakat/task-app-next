import React, { useReducer } from 'react';
import TaskList from '../components/TaskList';
import { MyContext } from '../context/MyContext';
import tasksReducer from '../tasksReducer';
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
    <MyContext.Provider value={{ state, dispatch }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        height: '100vh'
      }}>
        <TaskList />
      </div>
    </MyContext.Provider>
  );
};

export default Home;