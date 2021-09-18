import React, { useState } from "react";
//import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import shortid from "shortid";
//import { isEmpty } from "lodash";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = (e) => {
    e.preventDefault();

    const newTask = {
      id: shortid.generate(),
      name: task,
    };

    let tarea = [...tasks, newTask];
    tarea.sort((a, b) => a.name > b.name);

    setTasks(tarea);

    console.log(tarea, tasks);
    setTask("");
  };

  const asc = () => {
    let tarea = tasks;
    console.log(`tarea antes ASC`, tarea);
    let tarea_sort = tarea.sort((a, b) => (a.name <= b.name ? -1 : 1));
    console.log(`tarea sort ASC`, tarea_sort);
    setTasks(tarea_sort);
  };

  const desc = () => {
    let tarea = tasks;
    console.log(`tarea antes Desc`, tarea);
    let tarea_sort = tarea.sort((a, b) => (a.name > b.name ? 1 : -1));
    console.log(`tarea sort DESC`, tarea_sort);

    setTasks(tarea_sort);
  };

  return (
    <div className="container">
      <h1 className="text-danger text-center text-uppercase">Tareas</h1>
      <button className="btn btn-danger btn-sm float-end" onClick={asc}>
        Asc
      </button>
      <button className="btn btn-warning btn-sm float-end mx-2" onClick={desc}>
        Desc
      </button>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-info text-center text-uppercase">
            Lista de tareas
          </h4>
          <ul className="list-group">
            {tasks.map((task) => (
              <li key={task.id} className="list-group-item">
                <span className="lead">{task.name}</span>
                <button className="btn btn-danger btn-sm float-end">
                  Eliminar
                </button>
                <button className="btn btn-warning btn-sm float-end mx-2">
                  Editar
                </button>
              </li>
            ))}
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
