import React, { useContext } from 'react';
import format from 'date-fns/format';
import { MyContext } from '../context/MyContext';

const ControlPanel = () => {
  const { state, dispatch } = useContext(MyContext);
  console.log(state);
  return (
    <div>
      <input
        type="datetime-local"
        onChange={e => console.log(e.target.value)}
      />
    </div>
  );
};

export default ControlPanel;
