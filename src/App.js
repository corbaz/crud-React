import React, { useState } from "react";
//import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import shortid from "shortid";
import { size } from "lodash";

function App() {
  const _ = require("lodash");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    e.preventDefault();

    const newTask = {
      id: shortid.generate(),
      name: task,
    };

    let tareas = [...tasks, newTask];

    let tarea_sort = _.orderBy(tareas, "name", "asc");
    setTasks(tarea_sort);

    setTask("");
  };

  const deleteTask = (id) => {
    const filtro = tasks.filter((tarea) => tarea.id !== id);
    setTasks(filtro);
  };

  const asc = () => {
    let tarea_sort = _.orderBy(tasks, "name", "asc");
    setTasks(tarea_sort);
  };

  const desc = () => {
    let tarea_sort = _.orderBy(tasks, "name", "desc");
    setTasks(tarea_sort);
  };

  return (
    <div className="container">
      <h1 className="text-danger text-center text-uppercase">Tareas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-info text-center text-uppercase">
            Lista de tareas
          </h4>
          <div className="row pb-2 ">
            <div className="col-6 d-flex align-items-center justify-content-center">
              <button
                className="btn btn-danger btn-sm float-end"
                onClick={() => asc()}
              >
                Orden Ascendente
              </button>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-center">
              <button
                className="btn btn-warning btn-sm float-end mx-2"
                onClick={() => desc()}
              >
                Orden Descendente
              </button>
            </div>
          </div>

          {size(tasks) === 0 ? (
            <h6 className="text-success text-center text-uppercase">
              No hay Tareas programadas
            </h6>
          ) : (
            <ul className="list-group">
              {tasks.map((tarea) => (
                <li key={tarea.id} className="list-group-item">
                  <span className="lead">{tarea.name}</span>
                  <button
                    className="btn btn-danger btn-sm float-end"
                    onClick={() => deleteTask(tarea.id)}
                  >
                    Eliminar
                  </button>
                  <button className="btn btn-warning btn-sm float-end mx-2">
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-4">
          <h4 className="text-info text-center text-uppercase">Formulario</h4>
          <form className="row g-3" onSubmit={addTask}>
            <div className="col-md-12">
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                placeholder="Ingrese la tarea"
                required
                onChange={(text) => setTask(text.target.value)}
                value={task}
              />
            </div>
            <button className="btn btn-dark btn-block" type="submit">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
