import React from 'react';

export default function FilterTasks({
  filter,
  handleSetFilter
}) {

  return (
    <form onChange={e => handleSetFilter(e.target.value)}>
      <fieldset style={{
        display: 'flex',
        justifyContent: 'space-around'
      }}>
        <legend>Filter:</legend>
        <div>
          <label htmlFor="all">
            <input
              id="all"
              name="filtered-tasks"
              type="radio"
              value="all"
              defaultChecked={filter === 'all'}
            />
        All
      </label>
        </div>
        <div>
          <label htmlFor="todo">
            <input
              id="todo"
              name="filtered-tasks"
              type="radio"
              value="todo"
              defaultChecked={filter === 'todo'}
            />
        To Do
      </label>
        </div>
        <div>
          <label htmlFor="dueSoon">
            <input
              id="dueSoon"
              name="filtered-tasks"
              type="radio"
              value="dueSoon"
              defaultChecked={filter === 'dueSoon'}
            />
        Due Soon
      </label>
        </div>
        <div>
          <label htmlFor="overdue">
            <input
              id="overdue"
              name="filtered-tasks"
              type="radio"
              value="overdue"
              defaultChecked={filter === 'overdue'}
            />
        Overdue
      </label>
        </div>
        <div>
          <label htmlFor="completed">
            <input
              id="completed"
              name="filtered-tasks"
              type="radio"
              value="completed"
              defaultChecked={filter === 'completed'}
            />
        Done
      </label>
        </div>
      </fieldset>
    </form>
  );
}
