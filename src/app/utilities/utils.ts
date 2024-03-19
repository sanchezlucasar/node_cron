import fs from 'fs'
// Función para guardar la tarea en un archivo
function guardarTareaEnArchivo(id, tarea) {
    const tareaJSON = JSON.stringify({
        cronExpression: tarea.cronTime.source,
        id: id
    });
    fs.writeFile(`${id}.json`, tareaJSON, (err) => {
        if (err) {
            console.error('Error al guardar la tarea en el archivo:', err);
        } else {
            console.log('Tarea guardada en el archivo:', `${id}.json`);
        }
    });
}
