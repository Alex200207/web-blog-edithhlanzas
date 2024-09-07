export interface TareaType {
    id: number;
    titulo: string;
    completado: boolean;
}

export interface TablaProps {
    tareas: TareaType[];
    onToggleTarea: (id: number) => void;
    onEliminarTarea: (id: number) => void;
    onEditarTarea: (id: number) => void;
}