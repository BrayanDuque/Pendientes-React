import React, { useState, useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import "./App.css";

function App() {
  // Estado para almacenar las tareas
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });
  // Estado para manejar la nueva tarea
  const [nuevaTarea, setNuevaTarea] = useState("");
  useEffect(() => {
    // Guardar las tareas en localStorage cada vez que cambien
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);
  // Funciones para manejar el input 
  const handleInputChange = (e) => {
    setNuevaTarea(e.target.value);
  };
  // Función para agregar una nueva tarea
  const agregarTarea = (e) => {
    // Prevenir el comportamiento por defecto del formulario
    e.preventDefault();
    // Evitar agregar tareas vacías
    if (nuevaTarea.trim() === "") return;
    setTareas([...tareas, nuevaTarea]);
    // Limpiar el input después de agregar la tarea
    setNuevaTarea("");
  };

  //funcion para eliminar una tarea
  const eliminarTarea = (index) => {
    const nuevasTareas = tareas.filter((_, i) => i !== index);
    setTareas(nuevasTareas);
  };


  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient text-white px-2">
        <h1 className="text-3xl sm:text-5xl font-extrabold pb-5 text-center">Lista de Pendientes</h1>
        <form
          onSubmit={agregarTarea}
          className="flex flex-col sm:flex-row items-center mt-4 w-full max-w-xs sm:max-w-lg justify-center gap-2 sm:gap-0"
        >
          <input
            type="text"
            value={nuevaTarea}
            onChange={handleInputChange}
            placeholder="Agregar nueva tarea"
            className="border border-gray-300 p-2 rounded-md w-full sm:w-64 text-white bg-transparent"
          />
          <button
            type="submit"
            className="sm:ml-2 bg-black text-white font-semibold p-2 px-5 rounded-md hover:bg-blue-600 w-full sm:w-auto mt-2 sm:mt-0"
          >
            Agregar
          </button>
        </form>
        <ul className="mt-4 w-full max-w-xs sm:max-w-md">
          {tareas.map((tarea, index) => (
            <li
              key={index}
              className="bg-gray-100 p-2 mb-2 rounded-md shadow-md flex items-center justify-between text-black font-semibold text-sm sm:text-base"
            >
              <span className="break-words max-w-[80%]">{tarea}</span>
              <IoIosCloseCircle
                className="text-black cursor-pointer text-2xl"
                onClick={() => eliminarTarea(index)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
