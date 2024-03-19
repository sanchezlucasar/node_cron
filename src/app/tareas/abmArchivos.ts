import fs from 'fs';
import path from 'path';

export const guardarEnArchivo = (nuevoTarea) => {
    try {
        // Ruta del archivo JSON
        const directorio = path.join(process.cwd(), 'src', 'app', 'tareas', 'file');
        if (!fs.existsSync(directorio)) {
            fs.mkdirSync(directorio, { recursive: true });
        }
        const filePath = path.join(directorio, 'tareas.json');

        // Leer el archivo JSON existente o crear un nuevo arreglo si el archivo no existe
        let tareas = [];
        if (fs.existsSync(filePath)) {
            const fileData = fs.readFileSync(filePath, 'utf-8');
            if (fileData.trim() !== '') {
                tareas = JSON.parse(fileData);
            }
        }

        // Verificar si ya existe una tarea con el mismo ID
        const tareaExistente = tareas.find(tarea => tarea.id === nuevoTarea.id);
        if (tareaExistente) {
            console.log('La tarea con el ID ' + nuevoTarea.id + ' ya está guardada en el archivo.');
            return; // No se guarda la tarea si ya existe una con el mismo ID
        }

        // Agregar el nuevo Tarea al arreglo
        tareas.push(nuevoTarea);

        // Escribir el arreglo actualizado en el archivo JSON
        fs.writeFileSync(filePath, JSON.stringify(tareas, null, 2));

        console.log('Datos guardados en el archivo correctamente.');
    } catch (error) {
        console.error('Error al guardar datos en el archivo:', error);
    }
};


export const obtenerDesdeArchivo = (id) => {
    try {
        // Ruta del archivo JSON
        const filePath = path.join(process.cwd(), 'src', 'app', 'tareas', 'file', 'tareas.json');

        // Verificar si el archivo existe
        if (!fs.existsSync(filePath)) {
            console.log('El archivo no existe.');
            return null;
        }

        // Leer el archivo JSON
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const tareas = JSON.parse(fileData);

        // Buscar la tarea con el ID proporcionado
        const tareaEncontrada = tareas.find(tarea => tarea.id === id);

        if (tareaEncontrada) {
            console.log('Tarea encontrada:', tareaEncontrada);
            return tareaEncontrada;
        } else {
            console.log('No se encontró ninguna tarea con el ID proporcionado.');
            return null;
        }
    } catch (error) {
        console.error('Error al obtener datos desde el archivo:', error);
        return null;
    }
};





