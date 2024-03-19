'use server'

import prisma from '../../libs/db';



export const createFunction = async (data: any) => {
    try {
        console.log(data)
        if (!data) return { error: 'No se encuentra la información para dar de alta al cliente' };

        const funcion = await prisma.function.findFirst({ where: { formatoFunction: data.formatoFunction } });

        if (funcion) return { error: 'Ya se encuentra esa function nombre' };

        const newFuncion = await prisma.function.create({
            data: {
                formatoFunction: data.formatoFunction
            }
        });

        console.log(newFuncion);

        return newFuncion;

    } catch (error: any) {
        null
    }
};


export const fetchFunction = async () => {
    try {
        const functions: any[] = await prisma.function.findMany();
        return functions;
    } catch (error) {
        console.error('Error al obtener las funciones:', error);
        return []
    }
}

export const getFunctionById = async (data: any) => {
    try {
        if (!data?.functionId) return { error: 'Falta el id.' };
        const funcion = await prisma.function.findUnique({ where: { id: data.functionId } });

        if (!funcion) return { error: `No se encontró un cliente con el id ${data.id}.` };

        return funcion;

    } catch (error: any) {
        return null
    }
};

export const deleteFunction = async (id: number) => {
    try {

        if (!id) return { error: 'Falta el id.' };

        const funcion = await prisma.function.delete({ where: { id: Number(id) } });
        return funcion;

    } catch (error: any) {
        return null
    }
};

export const updateFunction = async (data) => {
    try {
        const funcion = await prisma.function.findUnique({ where: { id: data.id } });

        if (!funcion) {
            return { error: 'La función no existe.' };
        }

        const updatedFunction = await prisma.function.update({
            where: {
                id: data.id,
            },
            data: {
                formatoFunction: data.formatoFunction, // Utiliza data.formatoFunction en lugar de data.value
            },
        });

        return updatedFunction;

    } catch (error: any) {
        return { error: 'Error modificando la función.' };
    }
};
