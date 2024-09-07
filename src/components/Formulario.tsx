import React, { FC, useEffect, useState } from 'react';
import { MdSave  } from "react-icons/md";
import {TareaType} from "../types";


interface FormularioProps {
  onAddTask: (title: string, tarea?: TareaType) => void;
  tarea?: TareaType | null;
}

const Formulario: FC<FormularioProps> = ({ onAddTask, tarea }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim());
      setTitle('');
    }

    if (tarea) {
      onAddTask(title.trim(), tarea);
      setTitle('');
    }
  };

  useEffect(() => {
    if (tarea) {
      setTitle(tarea.titulo);
    }
  }, [tarea]);

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex items-center justify-between w-full p-4 mt-4 bg-gray-500 rounded-lg">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva tarea"
        className="flex-1 mr-2 rounded-lg form-input"
      />
      
      <button
        type="submit"
        className="flex items-center p-2 text-white bg-blue-500 rounded">
        {tarea ? 'Actualizar' : 'Agregar'}
        <MdSave />
      </button>
    </form>
  );
};

export default Formulario;
