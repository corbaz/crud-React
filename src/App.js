import React, { useState, useEffect } from "react";
//import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
//import shortid from "shortid";
import { size } from "lodash";
import {
  addDocument,
  getCollection,
  updateOneDocument,
  deleteOneDocument,
} from "./actions";

function App() {
  const _ = require("lodash");
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    // Metodo asyncrono auto ejecutable async/await ()()
    (async () => {
      // al cargar la app
      // carga los datos desde
      // la db firebase la collecion "tasks" todos los documentos(c/u es un registro)
      const result = await getCollection("tasks");
      if (result.statusResponse) {
        const resultDataSort = _.orderBy(result.data, "name", "asc");
        //asc();
        setTasks(resultDataSort);
        setId();
      }
    })();
  }, [_]);

  const addTask = async (e) => {
    e.preventDefault();

    const result = await addDocument("tasks", { name: task.toUpperCase() });

    if (!result.statusResponse) {
      alert(result.error);
      return;
    }

    const newTask = {
      // id: shortid.generate(),
      id: result.data.id,
      name: task.toUpperCase(),
    };

    let tareas = [...tasks, newTask];

    let tarea_sort = _.orderBy(tareas, "name", "asc");
    setTasks(tarea_sort);

    setTask("");
  };

  const deleteTask = async (id) => {
    const result = await deleteOneDocument("tasks", id);

    if (!result.statusResponse) {
      alert(result.error);
      return;
    }

    const filtro = tasks.filter((tarea) => tarea.id !== id);
    setTasks(filtro);

    setEditMode(false);
    setTask("");
    setId("");
  };

  const editTask = (tarea) => {
    setTask(tarea.name);
    setEditMode(true);
    setId(tarea.id);
  };

  const saveTask = async (e) => {
    e.preventDefault();

    const result = await updateOneDocument("tasks", id, {
      name: task.toUpperCase(),
    });

    if (!result.statusResponse) {
      alert(result.error);
      return;
    }

    let taskModify = tasks.map((item) =>
      item.id === id ? { id: id, name: task.toUpperCase() } : item
    );

    let tarea_sort = _.orderBy(taskModify, "name", "asc");
    setTasks(tarea_sort);

    setEditMode(false);
    setTask("");
    setId("");
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
      <h1 className="text-danger text-center text-uppercase">Productos</h1>
      <hr />
      <a href="/">
        <img className="mt-2" src="/house.png" alt="Ir a Home"></img>
      </a>
      <div className="row">
        <div className="col-8">
          <h4 className="text-info text-center text-uppercase">
            Lista de Productos
          </h4>
          <div className="row pb-2 ">
            <div className="col-6 d-flex align-items-center justify-content-center">
              <button
                className="btn btn-success btn-sm float-end"
                onClick={() => asc()}
              >
                Orden (1-A-Z)
              </button>
            </div>
            <div className="col-6 d-flex align-items-center justify-content-center">
              <button
                className="btn btn-info btn-sm float-end mx-2"
                onClick={() => desc()}
              >
                Orden (Z-A-1)
              </button>
            </div>
          </div>

          {size(tasks) === 0 ? (
            <li className="list-group-item text-white bg-success text-center text-uppercase rounded">
              No hay Productos
            </li>
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
                  <button
                    className="btn btn-warning btn-sm float-end mx-2"
                    onClick={() => editTask(tarea)}
                  >
                    Editar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-4">
          <h4 className="text-info text-center text-uppercase">
            {editMode ? "Modificar Producto" : "Agregar Producto"}
          </h4>
          <form className="row g-3" onSubmit={editMode ? saveTask : addTask}>
            <div className="col-md-12">
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                placeholder="Ingrese un Producto"
                required
                onChange={(text) => setTask(text.target.value)}
                value={task}
              />
            </div>
            <button
              className={
                editMode ? "btn btn-danger btn-block" : "btn btn-dark btn-block"
              }
              type="submit"
            >
              {editMode ? "Modificar Producto" : "Agregar Producto"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
