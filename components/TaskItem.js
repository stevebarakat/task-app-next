import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useMeasurePosition } from '../hooks/useMeasurePosition';
import { firestore } from "../firebase";

const db = firestore;
const docRef = db.collection("tasklist").doc("tasks");

const TaskItem = ({ state, dispatch, i, updateOrder, updatePosition, order, task }) => {
  const ref = useMeasurePosition((pos) => updatePosition(i, pos));
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingX, setIsDraggingX] = useState(false);
  const deleteButton = useRef(null);
  const DELETE_BTN_WIDTH = deleteButton.current?.offsetWidth;
  
  useEffect(() => {
    (async () => {
      await docRef.set({ tasks: order });
    })();
  }, [order]);

  const handleSwipe = (info, taskId, index, order) => {

    dispatch({ type: "UPDATE_ORDER", payload: order });
    const dragDistance = info?.offset.x;
    const velocity = info?.velocity.x;
    const taskSwiped = state.tasks.filter((task) => task.id === taskId)[0];

    if (
      (dragDistance < 0 || velocity < -500) &&
      (dragDistance < -DELETE_BTN_WIDTH * 2 ||
        (taskSwiped.isSwiped && dragDistance < -DELETE_BTN_WIDTH - 10))
    ) {
      const newTasksList = state.tasks.filter((task) => task.id !== taskId);
      dispatch({ type: "UPDATE_TASKS", payload: newTasksList });
      dispatch({ type: "DELETE_TASK", payload: index });
    } else if (dragDistance > -DELETE_BTN_WIDTH && taskSwiped.isSwiped) {

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
    <div style={{ position: "relative" }}>
      <motion.li
        key={task.id}
        ref={ref}
        drag
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
          handleSwipe(info, task.id, i, order);
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
          border: "1px solid",
          background: "white",
          border: "1px solid rgb(133, 133, 133)",
        }}
      >
        <input
          onChange={() => dispatch({ type: "TOGGLE_TASK", payload: task })}
          type="checkbox"
          defaultChecked={task.complete}
        />
        <span
          contentEditable
          suppressContentEditableWarning
          onFocus={() => dispatch({ type: "SET_CURRENT_TASK", payload: task })}
          onBlur={e => dispatch({ type: "UPDATE_TASK", payload: e.currentTarget.innerText })}
          style={task.complete ?
            { textDecoration: "line-through" } :
            { textDecoration: "none" }}
        >{task.text}</span>
      </motion.li>
      <button
        ref={deleteButton}
        onClick={() => dispatch({ type: "DELETE_TASK", payload: task })}
        style={{
          display: isDraggingX ? "flex" : "none",
          position: "absolute",
          right: 0,
          top: 0,
        }}
      >Delete</button>
    </div>
  );
};

export default TaskItem;