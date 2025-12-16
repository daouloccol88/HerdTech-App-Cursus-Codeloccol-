import React from "react";

const TaskElement = ({ tasks }) => {
  const todoItems = tasks.filter((t) => t.status === "todo");
  const doneItems = tasks.filter((t) => t.status === "done");
  return (
    <div
      className="thm-bg-light mt-4 thm-shadow-m  rounded-3 p-3"
      style={{ height: "300px" }}
    >
      <div>
        <p>Nombre de taches à faire: {todoItems.length}</p>
      </div>
      <div>
        <p>Nombre de taches à effectuer: {doneItems.length}</p>
      </div>
    </div>
  );
};

export default TaskElement;
