import React, { useEffect, useContext } from 'react';
import { format, differenceInHours, parseISO, formatDistanceToNow } from 'date-fns';
import { TasksContext } from '../context/TasksContext';

const DATE_FORMAT = "M/d/yyyy, h:mm a";
let distanceToNow, diffInHours, dueSoon, overdue;

const ControlPanel = ({ task }) => {
  const { state, dispatch } = useContext(TasksContext);
  function handleDateChange(e){
    const diffInHours = differenceInHours(new Date(format(parseISO(e.target.value), DATE_FORMAT)), Date.now());
    dispatch({
      type: "UPDATE_TASK", payload: {
        field: "dueDate", dueDate: {
          parsedDate: e.target.value ? format(parseISO(e.target.value), DATE_FORMAT) : null,
          distanceToNow: e.target.value ? formatDistanceToNow(new Date(format(parseISO(e.target.value), DATE_FORMAT))) : null,
          dueSoon: diffInHours ? diffInHours <= 48 && diffInHours >= 0 : null,
          overdue: diffInHours ? diffInHours < 0 : null,
        }
      }
    })
  }

  return (
    <div>
      <input
        type="datetime-local"
        onFocus={() => dispatch({ type: "SET_CURRENT_TASK", payload: task })}
        onChange={e => handleDateChange(e)}
      />
      <span style={{display: "block"}}>{task.dueDate.parsedDate && "Due: " + task.dueDate.parsedDate}</span>
      <span style={{display: "block"}}>{"Created: " + task.dateCreated}</span>
    </div>
  );
};

export default ControlPanel;
