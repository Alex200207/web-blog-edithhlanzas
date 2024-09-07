import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import {TareaType} from "../types";

const API_URL = 'http://localhost:3000/tareas';

const useCrudAcciones = () => {
    const [tareas, setTareas] = useState<TareaType[]>([]);
    const [tarea, setTarea] = useState<TareaType | null>(null);

    useEffect(() => {
        cargarTareas();
    }, []);

    const getMaxId = () => {
        return tareas.reduce((max, t) => (t.id > max ? t.id : max), 0) + 1;
    };

    const cargarTareas = async () => {
        const response = await axios.get(API_URL);
        setTareas(response.data);
    };

    const agregarTarea = async (titulo: string, tarea?: TareaType) => {
        if (tarea) {
            await axios.put(`${API_URL}/${tarea.id}`, { ...tarea, titulo });
            setTareas(
                tareas.map((t) => (t.id === tarea.id ? { ...t, titulo } : t))
            );
            setTarea(null);

            //Mostrar una alerta de éxito sencilla
            alerta('Tarea actualizada');

            return;
        }

        await axios.post(API_URL, { titulo, completado: false });
        setTareas([...tareas, { id: getMaxId(), titulo, completado: false }]);

        //Mostrar una alerta de éxito sencilla
        alerta('Tarea agregada');
    };

    const editarTarea = (id: number) => {
        const tarea = tareas.find((t) => t.id === id);
        if (tarea) {
            setTarea(tarea);
        }
    };

    const toggleTarea = async (id: number) => {
        const tarea = tareas.find((t) => t.id === id);
        if (tarea) {
            const estado = !tarea.completado;
            await axios.put(`${API_URL}/${id}`, { ...tarea, completado: estado });
            setTareas(
                tareas.map((t) => (t.id === id ? { ...t, completado: estado } : t))
            );
        }
    };

    const eliminarTarea = async (id: number) => {
        // Obtenemos la tarea a eliminar
        const tarea = tareas.find((t) => t.id === id);
        // Usamos sweetalert2 para confirmar la eliminación
        const result = await Swal.fire({
            title: tarea?.titulo,
            text: '¿Estás seguro de eliminar esta tarea?',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#f56565',
            cancelButtonColor: '#718096'
        });

        if (!result.isConfirmed) {
            return;
        }
        await axios.delete(`${API_URL}/${id}`);
        setTareas(tareas.filter((t) => t.id !== id));
    };

    const alerta = (title: string) => {
        Swal.fire({
            icon: 'success',
            title,
            showConfirmButton: false,
            timer: 1500,
            position: 'top-end',
        });
    }

    return {
        tareas,
        tarea,
        agregarTarea,
        editarTarea,
        toggleTarea,
        eliminarTarea
    };
};

export default useCrudAcciones;
