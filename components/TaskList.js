import { useState, useEffect, useContext } from 'react';
import { firestore } from '../firebase';
import { usePositionReorder } from '../hooks/usePositionReorder';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import FilterTasks from './FilterTasks';
import { MyContext } from '../context/MyContext';

const docRef = firestore.collection('tasklist').doc('tasks');

const TaskList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext(MyContext);
  const [updatePosition, updateOrder] = usePositionReorder(state.tasks, dispatch);
  const [filterType, setFilterType] = useState("all");
  const handleSetFilterType = value => setFilterType(value);

  const FILTER_MAP = {
    all: () => true,
    todo: task => !task.complete,
    completed: task => task.complete,
    dueSoon: task => task.dueDate.dueSoon,
    overdue: task => task.dueDate.overdue,
  };
  useEffect(() => {
    return docRef.get().then(doc => {
      if (!doc.data().tasks) return;
      dispatch({ type: "UPDATE_TASKS", payload: doc.data().tasks });
      setIsLoading(false);
    });
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
      <FilterTasks handleSetFilterType={filterType, handleSetFilterType} />
      <ul>
        {state.tasks
          .filter(FILTER_MAP[filterType])
          .map((task, i) =>
            <TaskItem
              key={task.id}
              i={i}
              task={task}
              updatePosition={updatePosition}
              updateOrder={updateOrder}
              state={state}
              dispatch={dispatch}
            />)}
      </ul>
    </div>;
};

export default TaskList;
