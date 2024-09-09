import React, { FC, useState, useEffect } from 'react';
import { MdSave } from 'react-icons/md'; // Importación del ícono
import { ArticuloType } from '../types';

interface FormularioProps {
  onAddArticle: (titulo: string, contenido: string, articulo?: ArticuloType) => Promise<void>;
  articulo?: ArticuloType | null;
}

const Formulario: FC<FormularioProps> = ({ onAddArticle, articulo }) => {
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (titulo.trim() && contenido.trim()) {
      await onAddArticle(titulo.trim(), contenido.trim(), articulo || undefined); // Convierte null a undefined
      setTitulo('');
      setContenido('');
    }
  };

  useEffect(() => {
    if (articulo) {
      setTitulo(articulo.titulo);
      setContenido(articulo.contenido);
    }
  }, [articulo]);

  return (
    <form 
      onSubmit={handleSubmit}
      className="flex flex-col p-4 mt-4 bg-gray-500 rounded-lg">
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título del artículo"
        className="mb-2 p-2 rounded-lg form-input"
      />
      <textarea
        value={contenido}
        onChange={(e) => setContenido(e.target.value)}
        placeholder="Contenido del artículo"
        className="mb-2 p-2 rounded-lg form-textarea"
      />
      
      <button
        type="submit"
        className="flex items-center p-2 text-white bg-blue-500 rounded">
        {articulo ? 'Actualizar' : 'Agregar'}
        <MdSave /> {/* Uso del icono aquí */}
      </button>
    </form>
  );
};

export default Formulario;
