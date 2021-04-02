import React, { useEffect, useContext } from 'react';
import { format, differenceInHours, parseISO, formatDistanceToNow } from 'date-fns';
import { MyContext } from '../context/MyContext';

const DATE_FORMAT = "M/d/yyyy, h:mm a";
let distanceToNow, diffInHours, dueSoon, overdue;

const ControlPanel = ({ task }) => {
  let currentDueDate = task.dueDate;
  const { state, dispatch } = useContext(MyContext);
  if (currentDueDate) {
    // currentDueDate = format(new Date(currentDueDate), DATE_FORMAT);
    // distanceToNow = currentDueDate && formatDistanceToNow(new Date(currentDueDate));
    diffInHours = differenceInHours(new Date(currentDueDate), Date.now());
    dueSoon = diffInHours <= 48 && diffInHours >= 0;
    overdue = diffInHours < 0;
  };
  { dueSoon && console.log("due soon"); }
  { overdue && console.log("overdue"); }

  // useEffect(() => {
  //   dispatch({
  //     type: "UPDATE_TASK", payload: {
  //       field: "dueDate", dueDate: {
  //         distanceToNow: formatDistanceToNow( )
  //       }
  //     }
  //   });
  // }, []);

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
      {console.log(task.dueDate)}
      {task.dueDate.parsedDate}
    </div>
  );
};

export default ControlPanel;
