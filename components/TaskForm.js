import React, { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdArrowRoundDown } from 'react-icons/io';
import { BsPencil, BsSearch } from 'react-icons/bs';

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const TaskForm = ({ dispatch, handleSetSearchTerm, searchTerm }) => {
  const [value, setValue] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleSearch = (e) => handleSetSearchTerm(e.target.value);

  const handleToggleSearch = e => {
    e.preventDefault();
    setIsSearch(isSearch => !isSearch);
    handleSetSearchTerm("");
  };

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "ADD_TASK", payload: value });
    setValue("");
  }

  return (
    <div style={{ position: "relative" }}>
      <AnimatePresence>
        {isHovering &&
          <motion.div
            style={{ left: "0rem", top: "-1rem" }}
            className="badge"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          ><IoMdArrowRoundDown />Toggle Search</motion.div>}
      </AnimatePresence>
      <form
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{ display: "flex" }}
        onSubmit={e => handleSubmit(e)}
      >
        <button
          onMouseDown={handleToggleSearch}
        >{isSearch ? <BsSearch /> : <BsPencil />}
        </button>
        {isSearch ?
          <>
            <input
              id="search"
              name="search"
              type="search"
              placeholder="Search Tasks"
              autoComplete="off"
              value={searchTerm}
              onChange={handleSearch}
              required
              style={{ flexGrow: 1 }}
            />
            {/* <label htmlFor="search">Search Tasks</label> */}
          </> :
          <>
            <input
              id="task"
              name="task"
              type="text"
              placeholder="Add Task"
              autoComplete="off"
              value={value}
              onChange={handleChange}
              required
              style={{ flexGrow: 1 }}
            />
            {/* <label htmlFor="task">Add Task</label> */}
          </>
        }
        <button type="submit">
          <RiAddLine />
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
