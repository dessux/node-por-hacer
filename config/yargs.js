// Configuraciones de comandos

const descripcion = {
    demand: true, // Obligatorio (true)
    alias: 'd',
    desc: 'Descripción de la tarea por hacer'
};

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
};

const opts = { // Opciones de parámetros
    descripcion: descripcion,
    completado // Alt: Notar que no se usó completado: completado, en ECMAC6 ya no es necesario
}

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', opts)
    .command('actualizar', 'Actualiza el estado completado de una tarea', opts)
    .command('borrar', 'Borrar una tarea', opts)
    .help()
    .argv; // Cierre del yargs

module.exports = {
    argv // Se manda el objeto a exportar
}