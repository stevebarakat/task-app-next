import React, { useContext } from 'react';
import useLocalStorage from '@hooks/useLocalStorage';
import { TasksContext } from '@lib/context';

const SortTasks = () => {
  const { state, dispatch } = useContext(TasksContext);
  const [sortBy, setSortBy] = useLocalStorage("sortBy", null);

  console.log(sortBy);
  console.log(state.sortBy);

  return (
    <form
      onMouseDown={e => setSortBy(e.target.value)}
      onMouseUp={e => dispatch({ type: "SET_SORT_BY", payload: e.target.value })}
    >
      <fieldset
        style={{
          display: 'flex',
          justifyContent: 'space-around'
        }}>
        <legend>Sort:</legend>
        <div>
          <label htmlFor="dateCreated">
            <input
              id="dateCreated"
              name="sorted-tasks"
              type="radio"
              value="dateCreated"
              defaultChecked={sortBy === 'dateCreated'}
            />
        Date Created
      </label>
        </div>
        <div>
          <label htmlFor="dueDate">
            <input
              id="dueDate"
              name="sorted-tasks"
              type="radio"
              value="dueDateMeta.dueDateTs"
              defaultChecked={sortBy === 'dueDateMeta.dueDateTs'}
            />
        Due Date
      </label>
        </div>
        <div>
          <label htmlFor="dragDrop">
            <input
              id="dragDrop"
              name="sorted-tasks"
              type="radio"
              value="dragDrop"
              defaultChecked={sortBy === 'dragDrop'}
            />
        Drag & Drop
      </label>
        </div>
      </fieldset>
    </form>
  );
};

export default SortTasks;