import { TareaProgramada } from "../types";

const initialState = {
    tareas: [] as TareaProgramada[],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AGREGAR_TAREA':
            return {
                ...state,
                tareas: [...state.tareas, action.payload],
            };
        case 'DETENER_TAREA':
            return {
                ...state,
                tareas: state.tareas.filter(tarea => tarea.id !== action.payload),
            };
        default:
            return state;
    }
};

export const agregarTarea = (tarea: TareaProgramada) => ({
    type: 'AGREGAR_TAREA',
    payload: tarea,
});

export const detenerTarea = (id) => ({
    type: 'DETENER_TAREA',
    payload: id,
});

export default reducer;
