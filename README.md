# Aplicación para la prueba de utilización de node-cron en la automatización de procesos.

Se creo una aplicación, donde se pueden automatizar tareas. cada tarea ejecuta una función, en este caso son simples console.log que se crean mediante la solapa Funciones. Pero se peede modificar para que se obtengan de una carpeta que tenga funciones como enviarMails, o cualquier necesidad. 

Las tareas se pueden ejecutar, Detener, Modificar y eliminar.  

Al crear una tarea se guarda la misma con su expresion en node-cron y la función en si con el número de tarea. en un archivo tareas.json

Si una tarea estaba activa y se cae el servidor, "se simulo parando desde consola  CTRL + C, y luego volviendo a ejecutar node run dev , "  al reiniciar el servidor, se peude presionar recuperar tareas , lo que hace es verifica las activas . valida q las mismas se encuentren en el archivo JSON, si están ahí vuelve a correr la tarea. 

Las funciones se pueden crear y eliminar.

# Las tecnologías utilizadas para esta herramienta son 
 * Prisma + SQLite  (Base de datos para almacenar funciones y tareas)
 * NextJs - Con Server Actions -
 * React Query
 * DaisyUi
 * Tailwind
 * Algo de Css
 * Typescript
