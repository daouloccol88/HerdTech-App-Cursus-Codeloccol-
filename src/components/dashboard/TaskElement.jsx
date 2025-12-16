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
        <p className="fs-4">
          <i className="bi bi-clipboard-check-fill fs-2 text-warning"></i>{" "}
          Nombre de taches à faire: {todoItems.length}
        </p>
      </div>
      <div>
        <p className="fs-4">
          <i className="bi bi-clipboard-x-fill fs-2 text-success"></i> Nombre de
          taches effectuer: {doneItems.length}
        </p>
      </div>
    </div>
  );
};

export default TaskElement;
