import { v4 as uuidv4 } from "uuid";
import { findIndex } from "lodash";


export default function tasksReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      const newTask = {
        id: uuidv4(),
        text: action.payload,
        complete: false,
        dueDate: {
          parsedDate: null,
          distanceToNow: null,
          dueSoon: null,
          overdue: null,
        }
      };
      const addedTasks = [...state.tasks, newTask];
      return {
        ...state,
        tasks: addedTasks
      };
    case "TOGGLE_TASK":
      const toggledTasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...action.payload, complete: !action.payload.complete }
          : task
      );
      return {
        ...state,
        tasks: toggledTasks
      };
    case "SET_CURRENT_TASK":
      console.log("bub: ", state);
      return {
        ...state,
        currentTask: action.payload
      };
    case "UPDATE_TASK":
      const tempTasks = state.tasks;
      const id = state.currentTask.id;
      const taskIndex = findIndex(state.tasks, { id });
      let field = action.payload.field;
      tempTasks[taskIndex][field] = action.payload[field];
      console.log(tempTasks[taskIndex].text);
      return {
        ...state,
        currentTask: [],
        tasks: tempTasks
      };
    case "UPDATE_TASKS":
      return {
        ...state,
        tasks: action.payload
      };
    case "DELETE_TASK":
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload.id
      );
      return {
        ...state,
        tasks: filteredTasks
      };
    default:
      return state;
  }
}
