import { FC } from 'react';
import { MdEdit, MdDelete } from "react-icons/md";
import {ArticuloType} from "../types";

interface ArticuloProps {
  articulo: ArticuloType;
  onEliminar: () => void;
  onEditar: () => void;
}

const Articulo: FC<ArticuloProps> = ({ articulo, onEliminar, onEditar }) => {
  return (
    <li className="relative flex items-center justify-between p-2 border-b border-gray-300 hover:bg-gray-400">
      <div className="flex-1">
        <h2 className="font-bold">{articulo.titulo}</h2>
        <p>{articulo.contenido}</p>
        <p className="text-sm text-gray-500">{articulo.fecha}</p>
        <p className="text-sm text-gray-500">{articulo.autor}</p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={onEditar}
          className="px-3 py-1 text-gray-200 rounded-lg bg-amber-600 ">
          <MdEdit />
        </button>
        <button
          onClick={onEliminar}
          className="px-3 py-1 text-gray-200 rounded-lg bg-rose-600 ">
          <MdDelete />
        </button>
      </div>
    </li>
  );
};

export default Articulo;
