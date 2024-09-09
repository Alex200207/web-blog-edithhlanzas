export interface ArticuloType {
    id: number;
    titulo: string;
    contenido: string;
    fecha: string;
    autor: string;
}

export interface TablaProps {
    articulos: ArticuloType[];
    onEliminarArticulo: (id: number) => void;
    onEditarArticulo: (id: number) => void;
}
