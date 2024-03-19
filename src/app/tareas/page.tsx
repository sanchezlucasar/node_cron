'use client'
import '../../app/globals.css'
import { FormEvent } from 'react';
import { crearTarea, deleteTarea, detenerTarea, ejecutarTarea, fetchTareas, recuperarEjecuciones } from './actions';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchFunction } from '../function/actions';
import { toast } from 'react-toastify';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

const TareasPage = () => {

    const [selectedFunctionId, setSelectedFunctionId] = useState(null)
    const [selectedProgramacion, setSelectedProgramacion] = useState("")
    const [showModal, setShowModal] = useState(false)
    const queryClient = useQueryClient();

    const { data: funciones, isLoading, isError } = useQuery({
        queryKey: ['funciones'],
        queryFn: () => fetchFunction(),

    });

    const { data: tareas, isLoading: loadingTareas, isError: errorTareas } = useQuery({
        queryKey: ['tareas'],
        queryFn: () => fetchTareas(),

    });

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const variablesProgramacion = {};
        formData.forEach((value, key) => {
            variablesProgramacion[key] = value || '*';
        });

        if (selectedFunctionId) {
            variablesProgramacion['formatoFunction'] = selectedFunctionId
        }
        const response = await crearTarea(variablesProgramacion);

        if (response === null) {
            toast.error(`Error al crear la tarea`
            );
        } else {
            toast.success('Tarea creada exitosamente');
            queryClient.invalidateQueries();
        }
    }

    const handleFunctionSelect = (event) => {
        setSelectedFunctionId(event.target.value);
    }

    const onExecute = async (tarea, event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const variablesProgramacion = {};
        formData.forEach((value, key) => {
            variablesProgramacion[key] = value || '*';
        });

        formData.forEach((value, key) => {
            variablesProgramacion[key] = value || '*';
        });

        if (tarea.function) {
            variablesProgramacion['formatoFunction'] = selectedFunctionId
        }
        const response = await crearTarea(variablesProgramacion);
        if (response === null) {
            toast.error(`error al ejecutar la tarea`
            );
        } else {
            toast.success('Tarea creada y ejecutada correctamente');
            queryClient.invalidateQueries();
        }

    }

    return (

        <div className="flex justify-center items-center h-screen mt-20">
            <div className="w-4/5 mx-auto">
                <div className="w-1/1 p-6 border border-gray-300 rounded-lg">
                    <form onSubmit={onSubmit} className="flex flex-col mx-auto mt-8">
                        <p className="mx-4 text-sm leading-6 text-gray-600">Ingresar los tiempos para programar la tarea.</p>

                        <div className="grid grid-cols-3 gap-4">
                            <input
                                type="text"
                                name="segundos"
                                className="input input-bordered"
                                placeholder="segundos (0 - 59) (Domingo = 0)"
                            />
                            <input
                                type="text"
                                name='minutos'
                                className="input input-bordered"
                                placeholder="Minutos (0 - 59)"
                            />
                            <input
                                type="text"
                                name="horas"
                                className="input input-bordered"
                                placeholder="Horas (0 - 23)"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <input
                                type="text"
                                name="diames"
                                className="input input-bordered"
                                placeholder="Día del mes (1 - 31)"
                            />
                            <input
                                type="text"
                                name="mes"
                                className="input input-bordered"
                                placeholder="Mes (1 - 12)"
                            />
                            <input
                                type="text"
                                name="diasemana"
                                className="input input-bordered"
                                placeholder="Días de la semana (0 - 6) (Domingo = 0)"
                            />

                            <select
                                onChange={handleFunctionSelect}
                                className="select mx-4  w-full max-w-xs"
                                defaultValue=""
                            >
                                <option disabled selected>Selecciona una Función</option>
                                {
                                    funciones && funciones.map((funcion) => (
                                        <option key={funcion.id} value={funcion.formatoFunction}>{funcion.formatoFunction}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <button className="input button btn bg-indigo-900 text-indigo-50 self-end mt-4">Crear Tarea</button>
                    </form>
                    <button
                        onClick={() => {
                            const recuperar = recuperarEjecuciones(tareas);
                            if (recuperar === null) {

                                toast.error(`Error al recuperar las tareas `
                                );
                            } else {
                                toast.success('Tareas recuperadas exitosamente');
                                queryClient.invalidateQueries();

                            }
                        }}

                        className="btn btn-outline btn-accent mx-auto  w-full ">Recuperar Ejecuciónes</button>
                    <div className="table-container  mt-10">
                        <table className="border-collapse border w-full">
                            <thead>
                                <tr className="bg-stone-300">
                                    <th className="p-3">Tarea</th>
                                    <th className="p-3">Expresion de Ejecución</th>
                                    <th className="p-3">Estado</th>
                                    <th className="p-3">Acciones</th>
                                </tr>
                            </thead>

                            <tbody className='  items-center '>
                                {tareas && tareas.map((tarea) => (
                                    <tr key={tarea.id} className="border-b">
                                        <td className="p-3 text-center">{tarea.function}</td>
                                        <td className="p-3 text-center">{tarea.cronExpresion}</td>
                                        <td className="p-3 text-center">
                                            {tarea.active ? (
                                                <div className="badge badge-secondary badge-outline">activa</div>
                                            ) : (
                                                <div className="badge badge-primary badge-outline">inactiva</div>
                                            )}
                                        </td>

                                        <td className="p-3 text-right">


                                            <button

                                                onClick={() => {
                                                    const result = ejecutarTarea(tarea);
                                                    if (result === null) {

                                                        toast.error(`Error al ejecutar la tarea`
                                                        );
                                                    } else {
                                                        toast.success('Tarea ejecutada exitosamente');
                                                        queryClient.invalidateQueries();
                                                    }

                                                }}
                                                className="bg-green-400 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                                title="Ejecutar"
                                            ><PlayCircleIcon /></button>

                                            <button
                                                onClick={() => {
                                                    const result = detenerTarea(tarea)
                                                    if (result === null) {
                                                        toast.error(`Error al detener la tarea`
                                                        );
                                                    } else {
                                                        toast.success('Tarea detenida exitosamente');
                                                        queryClient.invalidateQueries();
                                                    }


                                                }}
                                                className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                                title="Parar"
                                            ><StopCircleIcon /></button>
                                            <button

                                                onClick={() => {
                                                    setShowModal(true)
                                                    setSelectedProgramacion(tarea)


                                                }}
                                                className="bg-gray-400 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                                title="Editar"
                                            ><EditIcon /></button>
                                            <button
                                                onClick={() => {
                                                    const result = deleteTarea(tarea.id)


                                                    if ('error' in result) {
                                                        const error = result.error;
                                                        toast.error(`Error al eliminar la tarea: ${error}`
                                                        );
                                                    } else {
                                                        toast.success('Tarea eliminada exitosamente');
                                                        queryClient.invalidateQueries();

                                                    }




                                                }}
                                                className="bg-red-400 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                                title="Eliminar"
                                            ><DeleteForeverIcon /></button>
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                    {selectedProgramacion && showModal && (
                        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white rounded p-8 w-96">
                                <button
                                    className="float-right text-gray-600 cursor-pointer"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cerrar
                                </button>
                                <h2 className="text-2xl font-bold mb-4">Modificar</h2>

                                <div className="w-1/1 p-6 border border-gray-300 rounded-lg">
                                    <form onSubmit={(e) => onExecute(selectedProgramacion, e)} className="flex flex-col">
                                        <p className="mx-4 text-sm leading-6 text-gray-600">Ingresar los tiempos para programar la tarea.</p>

                                        <div className="grid grid-cols-3 gap-4">
                                            <input
                                                type="text"
                                                name="segundos"
                                                className="input input-bordered"
                                                placeholder="segundos (0 - 59) (Domingo = 0)"
                                            />
                                            <input
                                                type="text"
                                                name='minutos'
                                                className="input input-bordered"
                                                placeholder="Minutos (0 - 59)"
                                            />
                                            <input
                                                type="text"
                                                name="horas"
                                                className="input input-bordered"
                                                placeholder="Horas (0 - 23)"
                                            />
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <input
                                                type="text"
                                                name="diames"
                                                className="input input-bordered"
                                                placeholder="Día del mes (1 - 31)"
                                            />
                                            <input
                                                type="text"
                                                name="mes"
                                                className="input input-bordered"
                                                placeholder="Mes (1 - 12)"
                                            />
                                            <input
                                                type="text"
                                                name="diasemana"
                                                className="input input-bordered"
                                                placeholder="Días de la semana (0 - 6) (Domingo = 0)"
                                            />
                                        </div>

                                        <button className="input button btn bg-indigo-900 text-indigo-50 self-end mt-4">Ejecutar tarea</button>
                                    </form>
                                </div>
                            </div>
                        </div >
                    )}
                </div>
            </div>
        </div >
    );
}

export default TareasPage;
