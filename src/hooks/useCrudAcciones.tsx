import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import {ArticuloType} from "../types";

const API_URL = 'http://localhost:3000/articulos';

const useCrudAcciones = () => {
    const [articulos, setArticulos] = useState<ArticuloType[]>([]);
    const [articulo, setArticulo] = useState<ArticuloType | null>(null);

    useEffect(() => {
        cargarArticulos();
    }, []);

    const getMaxId = () => {
        return articulos.reduce((max, a) => (a.id > max ? a.id : max), 0) + 1;
    };

    const cargarArticulos = async () => {
        const response = await axios.get(API_URL);
        setArticulos(response.data);
    };
console.log(articulos);
    const agregarArticulo = async (titulo: string, contenido: string, articulo?: ArticuloType) => {
        if (articulo) {
            await axios.put(`${API_URL}/${articulo.id}`, { ...articulo, titulo, contenido });
            setArticulos(
                articulos.map((a) => (a.id === articulo.id ? { ...a, titulo, contenido } : a))
            );
            setArticulo(null);
            alerta('Artículo actualizado');
            return;
        }

        await axios.post(API_URL, { titulo, contenido, fecha: new Date().toISOString(), autor: 'Autor Desconocido' });
        setArticulos([...articulos, { id: getMaxId(), titulo, contenido, fecha: new Date().toISOString(), autor: 'Autor Desconocido' }]);
        alerta('Artículo agregado');
    };

    const editarArticulo = (id: number) => {
        const articulo = articulos.find((a) => a.id === id);
        if (articulo) {
            setArticulo(articulo);
        }
    };

    const eliminarArticulo = async (id: number) => {
        const articulo = articulos.find((a) => a.id === id);
        const result = await Swal.fire({
            title: articulo?.titulo,
            text: '¿Estás seguro de eliminar este artículo?',
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
        setArticulos(articulos.filter((a) => a.id !== id));
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
        articulos,
        articulo,
        agregarArticulo,
        editarArticulo,
        eliminarArticulo
    };
};

export default useCrudAcciones;