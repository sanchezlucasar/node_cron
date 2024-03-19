'use server'

import cron from 'node-cron';
import { guardarEnArchivo, obtenerDesdeArchivo } from './abmArchivos';

let tareasEjecutadas = []


export const recuperarEjecuciones = async (tareas) => {
    try {
        console.log('llegue', tareas);

        tareas.map(tarea => {
            //si la tarea estaba activa significa que se tiene que volver a ejecutar
            if (tarea.active) {
                const tareaGuardada = obtenerDesdeArchivo(tarea.id)
                if (tareaGuardada) {
                    //solo se vuelven a ejecutar las tareas guardadas en el archivo
                    ejecutarTarea(tarea)
                }
            }
        })

    } catch (error) {
        return null;
    }
}

export const ejecutarTarea = async (tarea) => {
    try {
        if (tarea.active === false) updateTarea(tarea);

        const cronExpresion = tarea.cronExpresion;
        const funcionEjecutable = new Function(tarea.function);

        // Programar la tarea
        const tareaEjecutada = {
            id: tarea.id,
            ejecucion: cron.schedule(cronExpresion, () => {
                funcionEjecutable();
            }, { scheduled: true })
        }
        tareasEjecutadas.push(tareaEjecutada)

        guardarEnArchivo({
            id: tarea.id,
            function: tarea.function,
            cronExpresion: tarea.cronExpresion,
        });

        return tarea;
    } catch (error) {
        return null;
    }
}

export const detenerTarea = async (tareaSeleccionada) => {
    try {

        if (tareaSeleccionada.active == true) updateTarea(tareaSeleccionada);

        if (tareasEjecutadas.length > 0) {
            const tareaEjecutada = tareasEjecutadas.filter(tarea => tarea.id === tareaSeleccionada.id
            )
            tareaEjecutada[0].ejecucion.stop();
        } else {
            //caso en que se recompile el servidor ??
        }

        return tareaSeleccionada;
    } catch (error) {
        return null;
    }

};


export const crearTarea = async (data: any) => {
    try {

        const task = await prisma.tarea.create({
            data: {
                function: data.formatoFunction,
                cronExpresion: `${data.segundos} ${data.minutos} ${data.horas} ${data.diames} ${data.mes} ${data.diasemana}`,
                active: false
            }
        });

        return task

    } catch (error: any) {

        return null;
    }
};

export const deleteTarea = async (id: number) => {
    try {

        if (!id) return { error: 'Falta el id.' };

        const tarea = await prisma.tarea.delete({ where: { id: Number(id) } });
        return tarea;

    } catch (error: any) {
        return null
    }
};

export const fetchTareas = async () => {
    try {
        const tareas: any[] = await prisma.tarea.findMany();
        return tareas;
    } catch (error) {
        console.error('Error al obtener las funciones:', error);
        return []
    }
}

export const updateTarea = async (data) => {
    try {
        const tarea = await prisma.tarea.findUnique({ where: { id: data.id } });

        if (!tarea) {
            return { error: 'La tarea no existe.' };
        }

        const updatedTarea = await prisma.tarea.update({
            where: {
                id: data.id,
            },
            data: {
                active: data.active ? false : true,
            },
        });

        return updatedTarea;

    } catch (error: any) {
        return { error: 'Error modificando la función.' };
    }
};


