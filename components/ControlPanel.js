import React, { useContext } from 'react';
import { format, differenceInHours, parseISO, formatDistanceToNow } from 'date-fns';
import { TasksContext } from '@lib/context';

const DATE_FORMAT = "M/d/yyyy, h:mm a";

const ControlPanel = ({ task }) => {
  const { state, dispatch } = useContext(TasksContext);
  function handleDateChange(e){
    console.log(e.target.value)
    const diffInHours = differenceInHours(new Date(format(parseISO(e.target.value), DATE_FORMAT)), Date.now());
    dispatch({
      type: "UPDATE_TASK", payload: {
        field: "dueDateMeta", dueDateMeta: {
          dueDateTs: e.target.value ? format(parseISO(e.target.value), "T") : null,
          dueDate: e.target.value ? format(parseISO(e.target.value), DATE_FORMAT) : null,
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
      <span style={{display: "block"}}>{task.dueDateMeta.dueDate && "Due: " + task.dueDateMeta.dueDate}</span>
      <span style={{display: "block"}}>{"Created: " + format(new Date(task.dateCreated), DATE_FORMAT)}</span>
    </div>
  );
};

export default ControlPanel;
