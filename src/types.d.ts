// Definición de tipos
export interface TaskReducerItem {
    tasks: cron.ScheduledTask[];
    loading: boolean;
    error: string;
}

// Acciones
export enum ActionTypes {
    ADD_TASK = 'ADD_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    SET_LOADING = 'SET_LOADING',
    SET_ERROR = 'SET_ERROR',
}

export interface AddTaskAction {
    type: ActionTypes.ADD_TASK;
    task: cron.ScheduledTask;
}

export interface RemoveTaskAction {
    type: ActionTypes.REMOVE_TASK;
    index: number;
}

export interface SetLoadingAction {
    type: ActionTypes.SET_LOADING;
    loading: boolean;
}

export interface SetErrorAction {
    type: ActionTypes.SET_ERROR;
    error: string;
}

export interface TareaProgramada {
    funcion: string;
    ejecucion: ScheduledTask;
    id: number;
}
