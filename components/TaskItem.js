import React, { useState, useEffect, useRef } from 'react';
import { findIndex } from 'lodash';
import { motion, AnimatePresence } from 'framer-motion';
import { useMeasurePosition } from '../hooks/useMeasurePosition';
import { MdExpandMore } from 'react-icons/md';
import ControlPanel from './ControlPanel';
import { firestore } from "../firebase";

const db = firestore;
const docRef = db.collection("tasklist").doc("tasks");
const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const TaskItem = ({ state, dispatch, i, updateOrder, updatePosition, task }) => {
  const ref = useMeasurePosition((pos) => updatePosition(i, pos));
  const [isHoveringListItem, setIsHoveringListItem] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingX, setIsDraggingX] = useState(false);
  const deleteButton = useRef(null);
  const DELETE_BTN_WIDTH = deleteButton.current?.offsetWidth;

  useEffect(() => {
    (async () => {
      await docRef.set({ tasks: state.tasks });
    })();
  }, [state]);

  function handleOpen() {
    const tempTasks = state.tasks;
    const id = task.id;
    const taskIndex = findIndex(state.tasks, { id });
    tempTasks.map((_, i) => {
      if (taskIndex === i) {
        return tempTasks[i].isOpen = !tempTasks[i].isOpen;
      } else {
        return tempTasks[i].isOpen = false;
      }
    });
    dispatch({ type: "UPDATE_TASKS", payload: tempTasks });
  }

  const handleSwipe = (info, taskId) => {

    const dragDistance = info?.offset.x;
    const velocity = info?.velocity.x;
    const currentTask = state.tasks.filter((task) => task.id === taskId)[0];

    if (
      (dragDistance < 0 || velocity < -500) &&
      (dragDistance < -DELETE_BTN_WIDTH * 2 ||
        (currentTask.isSwiped && dragDistance < -DELETE_BTN_WIDTH - 10))
    ) {
      dispatch({ type: "DELETE_TASK", payload: task });
    } else if (dragDistance > -DELETE_BTN_WIDTH && currentTask.isSwiped) {

      const newTasksList = state.tasks.map((item) => {
        if (item.id === taskId) {
          item.isSwiped = false;
        }
        return item;
      });
      dispatch({ type: "UPDATE_TASKS", payload: newTasksList });

    } else if (dragDistance < 0 && dragDistance <= -DELETE_BTN_WIDTH / 3) {
      const newTasksList = state.tasks.map((item) => {
        if (item.id === taskId) {
          item.isSwiped = true;
        } else {
          item.isSwiped = false;
        }

        return item;
      });

      dispatch({ type: "UPDATE_TASKS", payload: newTasksList });
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHoveringListItem(true)}
      onMouseLeave={() => setIsHoveringListItem(false)}
      style={{ position: "relative" }}
    >
      <motion.li
        key={task.id}
        ref={ref}
        drag={task.isOpen ? false : true}
        dragElastic={0.9}
        dragDirectionLock
        onDirectionLock={axis => axis === "x" ? setIsDraggingX(true) : setIsDraggingX(false)}
        layout="position"
        dragPropagation={true}
        dragConstraints={{
          top: 0,
          bottom: 0,
          left: task.isSwiped ? DELETE_BTN_WIDTH * -1 : 0,
          right: 0
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          handleSwipe(info, task.id);
        }}
        onViewportBoxUpdate={(_, delta) => {
          isDragging && updateOrder(i, delta.y.translate);
        }}
        whileTap={{ cursor: "grabbing" }}
        whileHover={{ cursor: "grab" }}
        initial={false}
        animate={{ x: task.isSwiped ? DELETE_BTN_WIDTH * -1 : 0 }}
        style={{
          zIndex: isDragging ? 5 : 1,
          position: "relative",
          background: "white",
          border: "1px solid rgb(133, 133, 133)",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <input
          onChange={() => dispatch({ type: "TOGGLE_TASK", payload: task })}
          type="checkbox"
          defaultChecked={task.complete}
        />

        <AnimatePresence>
          {(isHoveringListItem && !task.dueDate.overdue && !task.isOpen) &&
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="badge"
            >
              {task.dueDate.distanceToNow && "Due in " + task.dueDate.distanceToNow + " from now"}
            </motion.div>
          }
        </AnimatePresence>
        <AnimatePresence>
          {(isHoveringListItem && !task.dueDate.parsedDate && !task.isOpen) &&
            <div
              onClick={handleOpen}
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              style={{ cursor: "pointer" }}
              className="badge"
            >
              Set Due Date
            </div>
          }
        </AnimatePresence>
        {task.dueDate.overdue && <motion.div
          overdue
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="badge blink"
        >Overdue!</motion.div>}
        <span
          contentEditable
          suppressContentEditableWarning
          onFocus={() => dispatch({ type: "SET_CURRENT_TASK", payload: task })}
          onBlur={e => dispatch({ type: "UPDATE_TASK", payload: { field: "text", text: e.currentTarget.innerText } })}
          style={task.complete ?
            { flexGrow: 1, textDecoration: "line-through" } :
            { flexGrow: 1, textDecoration: "none" }
          }
        >{task.text}</span>
        <button onClick={handleOpen}>
          <MdExpandMore
            style={{
              margin: "auto",
              transform: task.isOpen ? "rotate(0deg)" : "rotate(90deg)",
              transition: "all 0.25s ease-out"
            }}
          />
        </button>
      </motion.li>
      {task.isOpen ?
        <ControlPanel task={task} /> : <></>
      }
      <button
        ref={deleteButton}
        onClick={() => dispatch({ type: "DELETE_TASK", payload: task })}
        style={{
          visibility: isDraggingX ? "visible" : "hidden",
          position: "absolute",
          right: 0,
          top: 0,
        }}
      >Delete</button>
    </div>
  );
};

export default TaskItem;
