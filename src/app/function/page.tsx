'use client'

import { FormEvent, useState } from "react";
import { createFunction, deleteFunction, fetchFunction, updateFunction } from "./actions";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useColumns from '../../hooks/useColumns'; // Asegúrate de colocar la ruta correcta
import useRows from "../../hooks/useRows";
import '../globals.css'

const FunctionPage = () => {
    const [showModal, setShowModal] = useState(false)
    const [selectedFunction, setSelectedFunction] = useState(null)
    const queryClient = useQueryClient();


    const { data: funciones, isLoading, isError } = useQuery({
        queryKey: ['funciones'],
        queryFn: () => fetchFunction(),

    });
    if (funciones) console.log('tipo', funciones); // Agrega esta línea para verificar el tipo de 'functions'



    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const formatoFunction = formData.get("formatoFunction") as string;

        const response = await createFunction({ formatoFunction });
        queryClient.invalidateQueries();
        if ('error' in response) {
            const error = response.error;
            toast.error(`Error al crear la función: ${error}`
            );
        } else {
            toast.success('Funciòn creada exitosamente');
            queryClient.invalidateQueries();

        }

    }


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        if (selectedFunction) {
            setSelectedFunction({
                ...selectedFunction,
                [field]: event.target.value
            });
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) {
        toast.error('¡Se produjo un error al cargar la información!');
    }
    return (

        <div className="flex justify-center items-center h-screen mt-20">
            <div className="w-4/5 mx-auto">
                <div className="w-1/1 p-6 border border-gray-300 rounded-lg">
                    <form onSubmit={onSubmit} className="flex flex-col">
                        <p className="mx-4 text-sm leading-6 text-gray-600">Ingresar la Función.</p>

                        <div className="grid grid-cols-3 gap-4">
                            <input
                                type="text"
                                name="formatoFunction"
                                className="input input-bordered"
                                placeholder="Ej: const holamundo = () =>{console.log('hola mundo')}"
                            />
                        </div>
                        <button className="input button btn bg-indigo-900 text-indigo-50 self-end mt-4">Crear Función</button>
                    </form>
                </div>

                <div className="table-container  mt-10">
                    <table className="border-collapse border w-full">
                        <thead>
                            <tr className="bg-stone-300">
                                <th className="p-3 text-center">detalle de Funcion</th>

                                <th className="p-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {funciones && funciones.map((funcion) => (
                                <tr key={funcion.id} className="border-b">
                                    <td className="p-3 text-center">{funcion.formatoFunction}</td>

                                    <td className="p-3 text-center ">
                                        <button
                                            onClick={() => {
                                                setShowModal(true);
                                                setSelectedFunction(funcion)

                                            }}

                                            className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                            title="Modificar"
                                        >Modificar

                                        </button>

                                        <button
                                            onClick={() => {
                                                const result = deleteFunction(funcion.id);

                                                if ('error' in result) {
                                                    const error = result.error;
                                                    toast.error(`Error al eliminar el cliente: ${error}`
                                                    );
                                                } else {
                                                    toast.success('Cliente eliminado exitosamente');
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
                {selectedFunction && showModal && (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded p-8 w-96">
                            <button
                                className="float-right text-gray-600 cursor-pointer"
                                onClick={() => setShowModal(false)}
                            >
                                Cerrar
                            </button>
                            <h2 className="text-2xl font-bold mb-4">Modificar</h2>

                            <form>
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        value={selectedFunction.formatoFunction}
                                        onChange={(e) => handleInputChange(e, 'formatoFunction')}
                                        className=" p-3 text-slate-600 rounded block mb-2  bg-slate-100 text-slate-300 w-full input-lg w-full "

                                    />

                                </div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const result = updateFunction(selectedFunction);
                                        queryClient.invalidateQueries();
                                        if ('error' in result) {
                                            toast.error(`Error al modificar la funcion`
                                            );
                                        } else {

                                            setShowModal(false)

                                            toast.success('Funcion modificada exitosamente');

                                        }
                                    }}
                                    className="bg-stone-300 hover:bg-stone-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Guardar cambios
                                </button>
                            </form>
                        </div>
                    </div>
                )}

            </div >
        </div >
    );
}

export default FunctionPage
