const useSwipe = (dragInfo, taskId) => {

  const dragDistance = dragInfo?.offset.x;
  const velocity = dragInfo?.velocity.x;
  const taskSwiped = state.tasks.filter((task) => task.id === taskId)[0];

  if (
    (dragDistance < 0 || velocity < -500) &&
    (dragDistance < -DELETE_BTN_WIDTH * 2 ||
      (taskSwiped.isSwiped && dragDistance < -DELETE_BTN_WIDTH - 10))
  ) {
    dispatch({ type: "DELETE_TASK", payload: task });
  } else if (dragDistance > -DELETE_BTN_WIDTH && taskSwiped.isSwiped) {

    const newTasksList = state.tasks.map((item) => {
      if (item.id === taskId) {
        item.isSwiped = false;
      }
      return item;
    });
    dispatch({ type: "UPDATE_TASKS", payload: newTasksList });

  } else if (dragDistance < 0 && dragDistance <= -DELETE_BTN_WIDTH / 3) {
    const newTasksList = state.tasks.map((item) => {
      if (item.id === taskId) {
        item.isSwiped = true;
      } else {
        item.isSwiped = false;
      }

      return item;
    });

    dispatch({ type: "UPDATE_TASKS", payload: newTasksList });
  }
};

export default useSwipe;