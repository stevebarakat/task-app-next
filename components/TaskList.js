import { useState, useEffect, useReducer } from 'react';
import { firestore } from '../firebase';
import { usePositionReorder } from '../hooks/usePositionReorder';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import tasksReducer from '../tasksReducer';

const docRef = firestore.collection('tasklist').doc('tasks');
const initialState = [
  {
    id: "34l5kj345k34j",
    text: "Task One",
    completed: false,
  }
];

const TaskList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const [order, updatePosition, updateOrder] = usePositionReorder(state.tasks, dispatch);

  // useEffect(() => {
  //   return docRef.onSnapshot(snapshot => {
  //     if (!snapshot.data()) return;
  //     dispatch({ type: "UPDATE_TASKS", payload: snapshot.data().tasks });
  //     setIsLoading(false);
  //   });
  // }, [dispatch]);

  useEffect(() => {
    return docRef.get().then(doc => {
      if (!doc.data().tasks) return;
      dispatch({ type: "UPDATE_TASKS", payload: doc.data().tasks});
      setIsLoading(false);
    })
  }, [dispatch]);

  return isLoading ? "...loading" :
    <div
      style={{
        background: "white",
        width: "320px",
        margin: "0 auto",
      }}
    >
      <TaskForm dispatch={dispatch} />
      <ul>
        {order.map((task, i) =>
          <TaskItem
            key={task.id}
            i={i}
            task={task}
            order={order}
            updatePosition={updatePosition}
            updateOrder={updateOrder}
            state={state}
            dispatch={dispatch}
          />)}
      </ul>
    </div>;
};

export default TaskList;
