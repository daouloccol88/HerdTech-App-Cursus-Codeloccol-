"use client";

import React, { useEffect, useState } from "react";

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const saveTodos = (updatedTodos) => {
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleDelete = (id) => {
    const updated = todos.filter((t) => t.id !== id);
    saveTodos(updated);
  };

  const handleMarkDone = (id) => {
    const updated = todos.map((t) =>
      t.id === id ? { ...t, status: "done" } : t
    );
    saveTodos(updated);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setNewName(todo.name);
  };

  const saveEdit = () => {
    const updated = todos.map((t) =>
      t.id === editingTodo.id ? { ...t, name: newName } : t
    );
    saveTodos(updated);
    setEditingTodo(null);
  };

  const confirmDelete = (todo) => {
    setTodoToDelete(todo);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (!todoToDelete) return;
    handleDelete(todoToDelete.id);
    setShowModal(false);
    setTodoToDelete(null);
  };

  const todoItems = todos.filter((t) => t.status === "todo");
  const doneItems = todos.filter((t) => t.status === "done");

  return (
    <div className="container py-4">
      <h2>Todos</h2>

      <div className="row">
        <div className="col-lg-6">
          {/* TODO section */}
          <section className="mb-4">
            <h4>À faire</h4>
            {todoItems.map((todo) => (
              <div
                key={todo.id}
                className="d-flex align-items-center justify-content-between mb-2 p-2 border rounded"
              >
                <span>{todo.name}</span>
                <div>
                  <button
                    className="btn btn-sm btn-primary me-1"
                    onClick={() => handleEdit(todo)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger me-1"
                    onClick={() => handleDelete(todo.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => handleMarkDone(todo.id)}
                  >
                    Done
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
        <div className="col-lg-6">
          {/* DONE section */}
          <section>
            <h4>Fait</h4>
            {doneItems.map((todo) => (
              <div
                key={todo.id}
                className="d-flex align-items-center justify-content-between mb-2 p-2 border rounded"
              >
                <span>{todo.name}</span>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => confirmDelete(todo)}
                >
                  Delete
                </button>
              </div>
            ))}
          </section>
        </div>
      </div>

      {/* Edit modal */}
      {editingTodo && (
        <div
          className="modal d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="bg-white p-4 rounded" style={{ minWidth: "300px" }}>
            <h5>Edit Todo</h5>
            <input
              type="text"
              className="form-control mb-2"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setEditingTodo(null)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={saveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {showModal && todoToDelete && (
        <div
          className="modal d-flex justify-content-center align-items-center"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="bg-white p-4 rounded" style={{ minWidth: "300px" }}>
            <h5>Delete Todo</h5>
            <p>
              Are you sure you want to delete "
              <strong>{todoToDelete.name}</strong>"?
            </p>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button className="btn btn-danger" onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodosPage;
