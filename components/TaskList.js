import { useState, useEffect, useContext } from 'react';
import { firestore } from '../firebase';
import { usePositionReorder } from '../hooks/usePositionReorder';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import FilterTasks from './FilterTasks';
import { TasksContext } from '../context/TasksContext';

const docRef = firestore.collection('tasklist').doc('tasks');
const TASK_DELETE_ANIMATION = { height: 0, opacity: 0 };
const TASK_DELETE_TRANSITION = {
  opacity: {
    transition: {
      duration: 0
    }
  }
};

const TaskList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { state, dispatch } = useContext(TasksContext);
  const [updatePosition, updateOrder] = usePositionReorder(state.tasks, dispatch);
  const [filterType, setFilterType] = useState("all");
  const handleSetFilterType = value => setFilterType(value);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSetSearchTerm = (term) => {
    setSearchTerm(term);
  };
  console.log(searchTerm);
  const FILTER_MAP = {
    all: () => true,
    todo: task => !task.complete,
    completed: task => task.complete,
    dueSoon: task => task.dueDate.dueSoon,
    overdue: task => task.dueDate.overdue,
    search: task => task.text.toLowerCase().includes(searchTerm)
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
      <TaskForm dispatch={dispatch} searchTerm={searchTerm} handleSetSearchTerm={handleSetSearchTerm} />
      <FilterTasks handleSetFilterType={filterType, handleSetFilterType} />
      <ul>
      {state.tasks.length === 0 ? (
        <p>You don't have any tasks.</p>
      ) : (
        <AnimatePresence>
            {state.tasks
            ?.filter(FILTER_MAP[filterType])
            .filter(task => task.text
              .toLowerCase()
              .includes(searchTerm)).map((task, i) => (
                <motion.div 
                  key={task.id} 
                  exit={TASK_DELETE_ANIMATION}
                  transition={TASK_DELETE_TRANSITION}
                >
                <TaskItem
                  key={task.id}
              i={i}
              task={task}
              updatePosition={updatePosition}
              updateOrder={updateOrder}
              state={state}
              dispatch={dispatch}
            />
              </motion.div>
            ))}
        </AnimatePresence>
      )}
      </ul>
    </div>;
};

export default TaskList;
