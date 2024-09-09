import { FC } from 'react';
import Articulo from './Articulo';
import {TablaProps} from "../types";

const Tabla: FC<TablaProps> = ({
  articulos,
  onEliminarArticulo,
  onEditarArticulo,
}) => {
  return (
    <ul className="mt-4">
      {articulos.map((articulo) => (
        <Articulo
          key={articulo.id}
          articulo={articulo}
          onEliminar={() => onEliminarArticulo(articulo.id)}
          onEditar={() => onEditarArticulo(articulo.id)}
        />
      ))}
    </ul>
  );
};

export default Tabla;
