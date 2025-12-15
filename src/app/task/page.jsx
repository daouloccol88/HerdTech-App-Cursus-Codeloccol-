"use client";

import MaterialInput from "@/components/MaterialInput";
import React, { useEffect, useState } from "react";

const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const [editingTodo, setEditingTodo] = useState(null);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const [newName, setNewName] = useState("");
  const [newTodoName, setNewTodoName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);

    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const saveTodos = (updatedTodos) => {
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleAddTodo = () => {
    if (!newTodoName.trim()) return;

    const newTodo = {
      id: Date.now(),
      name: newTodoName,
      status: "todo",
      userId: currentUser.id,
    };

    saveTodos([...todos, newTodo]);
    setNewTodoName("");
  };

  const handleDelete = (id) => {
    saveTodos(todos.filter((t) => t.id !== id));
  };

  const handleMarkDone = (id) => {
    saveTodos(todos.map((t) => (t.id === id ? { ...t, status: "done" } : t)));
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setNewName(todo.name);
  };

  const saveEdit = () => {
    saveTodos(
      todos.map((t) => (t.id === editingTodo.id ? { ...t, name: newName } : t))
    );
    setEditingTodo(null);
  };

  if (!currentUser) return <p>Loading user...</p>;

  const userTodos = todos.filter((t) => t.userId === currentUser.id);
  const todoItems = userTodos.filter((t) => t.status === "todo");
  const doneItems = userTodos.filter((t) => t.status === "done");

  return (
    <div className="thm-bg-dark">
      <div className="container py-4">
        <div className="d-flex">
          <div className="thm-bg-light thm-shadow-m p-1 rounded ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              height="60"
              viewBox="0 0 94.2 100"
            >
              <path
                d="M16.9 75.7c-1-.4-1.1-.8-1.1-3 0-3.2.3-3.4 4.9-3.3l3.1.1.5.6c.5.5.5.7.5 2.5l-.2 2.4c-.4.8-1.4 1-4.3 1q-2.9 0-3.4-.3m16 .1c-1-.4-1.2-1-1.2-3.1 0-2 0-2.1.6-2.6l.5-.6h22l22.5.1c1 .4 1.1.9 1.1 3 0 2.3-.2 2.8-1.2 3.2-.8.2-43.7.3-44.3 0m-16-17.7c-1-.4-1.1-.8-1.1-3 0-3.2.3-3.4 4.9-3.3l3.1.1.5.6c.5.5.5.7.5 2.5l-.2 2.4c-.4.8-1.4 1-4.3 1q-2.9 0-3.4-.3m16 .1c-1-.4-1.2-1-1.2-3.1 0-2 0-2.1.6-2.6l.5-.6h22l22.5.1c1 .4 1.1.9 1.1 3 0 2.3-.2 2.8-1.2 3.2-.8.2-43.7.3-44.3 0M5.4 22.4c0-6 0-6.6 1-7.3.4-.3 1.4-.3 7.7-.3h7.3v2.5c0 2.4 0 2.5.5 3s.6.5 3 .5h2.3l.5-.6c.5-.6.5-.7.5-3v-2.4H66v2.5c.1 2.5.1 2.5.7 3s.7.5 2.8.5c3.1 0 3.3-.2 3.3-3.7v-2.3h7.3c6.3 0 7.3 0 7.7.3 1 .7 1 1.3 1 7.3V28H5.4Z"
                style={{
                  display: "inline",
                  fill: "#66ba44",
                  strokeWidth: ".2",
                }}
              />
              <path
                className="thm-path"
                d="M5.8 99.7A8 8 0 0 1 .3 94C0 93 0 88.6 0 54l.1-39 .8-1.4Q2 11 4.6 9.9l1.1-.6h7.8l7.9-.1V5c.1-5.1 0-5 3-5 3.7-.2 3.8 0 3.8 5.3v3.8H66V5.7l.2-4.3c.3-1.1 1-1.4 3.2-1.4q2.9 0 3.2 1.1l.2 4.3v3.8h7.8l7.9.1 1.1.6a8 8 0 0 1 4.4 5.6c.2.9.2 11.6.2 39.8-.1 36.4-.1 38.7-.5 39.5a8 8 0 0 1-4.7 4.7c-.9.4-3.1.4-41.5.4-35.3 0-40.7 0-41.7-.2M87.6 94c1.3-.7 1.2 1.4 1.2-30.8V34H5.4v29.3c0 25.8 0 29.4.3 29.9.7 1.3-2.5 1.2 41.4 1.2 35.3 0 40 0 40.5-.3m1.2-71.7c0-6 0-6.6-1-7.3-.4-.3-1.4-.3-7.7-.3h-7.3v2.3c0 3.5-.2 3.7-3.3 3.7-2.1 0-2.3 0-2.8-.5s-.6-.5-.7-3v-2.5H28.2v2.4c0 2.3 0 2.4-.5 3l-.5.6h-2.4c-2.3 0-2.4 0-2.9-.5s-.5-.6-.5-3v-2.5h-7.3c-6.3 0-7.3 0-7.7.3-1 .7-1 1.3-1 7.3V28h83.4Z"
                style={{
                  display: "inline",
                  strokeWidth: ".2",
                }}
              />
            </svg>
          </div>
          <div className="pt-3 ms-2">
            <p className="fs-3 no-wrap">Gestion des taches à faire</p>
          </div>
        </div>

        <div className="d-flex justify-content-between my-4 px-4">
          <div>
            <p>Utilisateur connecté: {currentUser.name}</p>
          </div>
          <div>
            <button
              className="btn thm-bg-primary fs-4 text-white thm-shadow-s ms-2"
              data-bs-toggle="modal"
              data-bs-target="#addTodoModal"
            >
              + Ajoutez une taches
            </button>
          </div>
        </div>

        {/* TODO SECTION */}
        <div className="row">
          <div className="col-lg-6 col-md-12">
            <section className="mb-4">
              <div className="d-flex justify-content-between px-3 py-3 rounded-2 thm-bg thm-shadow-m mb-4">
                <div>
                  <p className=" fs-4 ">
                    Nombre de taches à faire: {todoItems.length}
                  </p>
                </div>
                <div>
                  <i className="bi bi-clipboard-x-fill fs-1"></i>
                </div>
              </div>

              <div className="table-responsive thm-bg p-3 rounded-2 thm-shadow-m">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className="thm-bg-dark">
                        <input
                          className="form-check-input border border-dark-subtle border-2"
                          type="checkbox"
                          value=""
                          id="checkDisabled"
                          disabled
                          style={{ width: "30px", height: "30px" }}
                        />
                      </th>
                      <th className="thm-bg-dark">
                        <span className="fw-semibold fs-4">
                          Titre de la taches
                        </span>
                      </th>
                      <th className="thm-bg-dark">
                        <span className="fw-semibold fs-4">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {todoItems.map((todo) => (
                      <tr key={todo.id}>
                        <td className="thm-bg-light fs-5">
                          <input
                            className="form-check-input border border-dark-subtle border-2"
                            type="checkbox"
                            value=""
                            id="checkDisabled"
                            style={{ width: "30px", height: "30px" }}
                          />
                        </td>
                        <td className="thm-bg-light fs-5">
                          <p className="fs-5">{todo.name}</p>
                        </td>
                        <td className="thm-bg-light">
                          <button
                            className="btn thm-bg-primary me-1"
                            data-bs-toggle="modal"
                            data-bs-target="#editTodoModal"
                            onClick={() => handleEdit(todo)}
                          >
                            <i className="bi bi-pen-fill fs-4"></i>
                          </button>

                          <button
                            className="btn thm-bg-primary me-1"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteTodoModal"
                            onClick={() => setTodoToDelete(todo)}
                          >
                            <i className="bi bi-trash3-fill fs-4"></i>
                          </button>

                          <button
                            className="btn thm-bg-primary"
                            onClick={() => handleMarkDone(todo.id)}
                          >
                            <i className="bi bi-check-lg fs-4"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* DONE SECTION */}
          <div className="col-lg-6 col-md-12">
            <section>
              <div className="d-flex justify-content-between px-3 py-3 rounded-2 thm-bg thm-shadow-m mb-4">
                <div>
                  <p className="fs-4">
                    Nombre de taches déja accomplis: {doneItems.length}
                  </p>
                </div>
                <div>
                  <i className="bi bi-clipboard-check-fill fs-1"></i>
                </div>
              </div>

              <div className="table-responsive thm-bg p-3 rounded-2 thm-shadow-m">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th className="thm-bg-dark">
                        <input
                          className="form-check-input border border-dark-subtle border-2"
                          type="checkbox"
                          value=""
                          id="checkDisabled"
                          disabled
                          style={{ width: "30px", height: "30px" }}
                        />
                      </th>
                      <th className="thm-bg-dark">
                        <span className="fw-semibold fs-4">
                          Titre de la taches
                        </span>
                      </th>
                      <th className="thm-bg-dark">
                        <span className="fw-semibold fs-4">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {doneItems.map((todo) => (
                      <tr key={todo.id}>
                        <td className="thm-bg-light ">
                          <input
                            className="form-check-input border border-dark-subtle border-2"
                            type="checkbox"
                            value=""
                            id="checkDisabled"
                            style={{ width: "30px", height: "30px" }}
                          />
                        </td>
                        <td className="thm-bg-light ">
                          <p className="fs-5">{todo.name}</p>
                        </td>
                        <td className="thm-bg-light">
                          <button
                            className="btn btn-danger"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteTodoModal"
                            onClick={() => setTodoToDelete(todo)}
                          >
                            <i className="bi bi-trash3-fill fs-4"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* ADD MODAL */}
      <div className="modal fade" id="addTodoModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header thm-bg">
              <p className="fs-5">Ajoutez une Tache</p>
              <button className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body thm-bg-light">
              <MaterialInput
                value={newTodoName}
                onChange={(e) => setNewTodoName(e.target.value)}
                placeholder="Veuillez entrez le nom de la tache"
                width="90%"
              />
            </div>
            <div className="modal-footer thm-bg">
              <button
                className="btn thm-bg-primary"
                data-bs-dismiss="modal"
                onClick={handleAddTodo}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <div className="modal fade" id="editTodoModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header thm-bg-dark">
              <h5>Modifier la tache</h5>
              <button className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body thm-bg">
              <MaterialInput
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                width="90%"
              />
            </div>
            <div className="modal-footer thm-bg-dark">
              <button
                className="btn thm-bg-primary"
                data-bs-dismiss="modal"
                onClick={saveEdit}
              >
                Confirmez
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      <div className="modal fade" id="deleteTodoModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header thm-bg-dark">
              <h5>Supprimez cette tache</h5>
              <button className="btn-close" data-bs-dismiss="modal" />
            </div>
            <div className="modal-body thm-bg">
              Etes vous sur de vouloir supprimez{" "}
              <span className="fw-bold">{todoToDelete?.name}</span> ?
            </div>
            <div className="modal-footer thm-bg-dark">
              <button
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => {
                  if (!todoToDelete) return;
                  handleDelete(todoToDelete.id);
                  setTodoToDelete(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosPage;
