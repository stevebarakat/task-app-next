import React from 'react';

export default function FilterTasks({
  filterType,
  handleSetFilterType
}) {

  return (
    <form
      onChange={e => handleSetFilterType(e.target.value)}
      style={{
        display: 'flex',
        justifyContent: 'space-around'
      }}
    >
      <div>
        <label htmlFor="all">
          <input
            id="all"
            name="filtered-tasks"
            type="radio"
            value="all"
            defaultChecked={filterType === 'all'}
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
            defaultChecked={filterType === 'todo'}
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
            defaultChecked={filterType === 'dueSoon'}
          />
        Soon
      </label>
      </div>
      <div>
        <label htmlFor="overdue">
          <input
            id="overdue"
            name="filtered-tasks"
            type="radio"
            value="overdue"
            defaultChecked={filterType === 'overdue'}
          />
        Late
      </label>
      </div>
      <div>
        <label htmlFor="completed">
          <input
            id="completed"
            name="filtered-tasks"
            type="radio"
            value="completed"
            defaultChecked={filterType === 'completed'}
          />
        Done
      </label>
      </div>
    </form>
  );
}
