import React, { useState } from "react";
//import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
//import { isEmpty } from "lodash";

function App() {
  const [task, setTask] = useState("");
  const addTask = (e) => {
    e.preventDefault();
    console.log(`OK`);
    setTask("");
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
          <ul className="list-group">
            <li className="list-group-item">
              <span className="lead">Nombre de la tarea</span>
              <button className="btn btn-danger btn-sm float-end" href="/">
                Eliminar
              </button>
              <button
                className="btn btn-warning btn-sm float-end mx-2"
                href="/"
              >
                Editar
              </button>
            </li>
          </ul>
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
