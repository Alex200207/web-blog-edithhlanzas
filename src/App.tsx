import Tabla from './components/Tabla';
import Formulario from './components/Formulario';
import useCrudAcciones from './hooks/useCrudAcciones';

const App = () => {
  const {
    articulos,
    articulo,
    agregarArticulo,
    editarArticulo,
    eliminarArticulo
  } = useCrudAcciones();

  return (
      <div className="container w-full p-4 mx-auto bg-gray-200 rounded-lg shadow-lg shadow-gray-200">
        <h1 className="mb-4 text-2xl font-bold">Gestión de Artículos de Blog</h1>
        <Formulario
            onAddArticle={agregarArticulo}
            articulo={articulo}
        />
        <Tabla
            articulos={articulos}
            onEliminarArticulo={eliminarArticulo}
            onEditarArticulo={editarArticulo}
        />
      </div>
  );
};

export default App;
