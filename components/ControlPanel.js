import React, { useContext } from 'react';
import { format, differenceInHours, parse, formatDistanceToNow } from 'date-fns';
import { MyContext } from '../context/MyContext';

const DATE_FORMAT = "M/d/yyyy, h:mm a";
let distanceToNow, diffInHours, dueSoon, overdue;

const ControlPanel = ({ task }) => {
  let dueDate = task.dueDate;
  const { state, dispatch } = useContext(MyContext);
  if (dueDate) {
    dueDate = format(new Date(dueDate), DATE_FORMAT);
    distanceToNow = dueDate && formatDistanceToNow(new Date(dueDate));
    diffInHours = differenceInHours(new Date(dueDate), Date.now());
    dueSoon = diffInHours <= 48 && diffInHours >= 0;
    overdue = diffInHours < 0;
  };
  {dueSoon && console.log("due soon")}
  {overdue && console.log("overdue")}
  return (
    <div>
      <input
        type="datetime-local"
        onFocus={() => dispatch({ type: "SET_CURRENT_TASK", payload: task })}
        onChange={e => dispatch({ type: "UPDATE_TASK", payload: { field: "dueDate", dueDate: e.target.value } })}
      />
      {console.log(dueDate)}
      {dueDate}
    </div>
  );
};

export default ControlPanel;
