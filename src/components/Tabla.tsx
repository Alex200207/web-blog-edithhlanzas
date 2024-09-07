import { FC } from 'react';
import Tarea from './Tarea.tsx';
import {TablaProps} from "../types";

const Tabla: FC<TablaProps> = ({
  tareas,
  onEliminarTarea,
  onToggleTarea,
  onEditarTarea,
}) => {
  return (
    <ul className="mt-4">
      {tareas.map((tarea) => (
        <Tarea
          key={tarea.id}
          tarea={tarea}
          onToggle={() => onToggleTarea(tarea.id)}
          onEliminar={() => onEliminarTarea(tarea.id)}
          onEditar={() => onEditarTarea(tarea.id)}
        />
      ))}
    </ul>
  );
};

export default Tabla;
