import Tabla from './components/Tabla.tsx';
import Formulario from './components/Formulario.tsx';
import useCrudAcciones from './hooks/useCrudAcciones';

const App = () => {
  const {
    tareas,
    tarea,
    agregarTarea,
    editarTarea,
    toggleTarea,
    eliminarTarea
  } = useCrudAcciones();

  return (
      <div className="container w-full p-4 mx-auto bg-gray-200 rounded-lg shadow-lg shadow-gray-200">
        <h1 className="mb-4 text-2xl font-bold">Planificación de mis tareas</h1>
        <Formulario
            onAddTask={agregarTarea}
            tarea={tarea}
        />
        <Tabla
            tareas={tareas}
            onToggleTarea={toggleTarea}
            onEliminarTarea={eliminarTarea}
            onEditarTarea={editarTarea}
        />
      </div>
  );
};

export default App;
