const fs = require('fs');

// Guardar las notas en un arreglo
let listadoPorHacer = [];

// Guardar todas las tareas por hacer en formato JSON
const guardarDB = () => {
    // Pasar el objeto (en este caso el arreglo listadoPorHacer a un format JSON válido)
    let data = JSON.stringify(listadoPorHacer);
    // Escribir al archivo
    // Segmento de código copiado de fs.writeFile(file, data[, options], callback) en
    // https://nodejs.org/dist/latest-v12.x/docs/api/fs.html#fs_fs_writefile_file_data_options_callback 
    const dataFile = new Uint8Array(Buffer.from(data));
    fs.writeFile(`db/data.json`, data, (err) => {
        if (err)
            throw new Error('No se pudo grabar', err);
    });
}

// Leer archivo con los datos JSON
const cargarDB = () => {

    // Para evitar error por archivo JSON vacío usar try y catch
    try {
        // Al estar del lado del servidor no es necesario leer el archivo JSON por 
        // http, si no que la función require al detectar que es un archiv JSON
        // automáticamente lo serializa y lo convierte en un objeto de js
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = []; // Inicializar el arreglo vacío para hacer el archivo un formato JSON válido
    }

    console.log('listadoPorHacer: ', listadoPorHacer);
}

const crear = (descripcion) => {

    cargarDB(); // Leer los datos JSON actualmente almacenados

    let porHacer = {
        descripcion,
        completado: false // Estado por default de la descripción
    };
    listadoPorHacer.push(porHacer);

    // Hacer persistente los datos json en un archivo
    guardarDB();

    return porHacer;
}

// Leer el archivo JSON
const getListado = () => {
    /*
        // Leer archivo en binario, no funciona como JSON
        fs.readFile(`db/data.json`, (err, data) => {
            if (err)
                throw new Error('No se pudo leer', err);
            else {
                console.log('listadoPorHacer: ', data);
                //        return listadoPorHacer = data;
            }
        })
    */
    cargarDB();
    return listadoPorHacer;
}

// actualizar una tarea (recibe 2 argumentos (descripcion y completado con default = true))
const actualizar = (descripcion, completado = true) => {

    // Leer la BD
    cargarDB();
    // Buscar en el arreglo, lo que coincida con el param. descripcion
    let index = listadoPorHacer.findIndex(tarea =>
        /*
            {
                return tarea.descripcion === descripcion
            }
        */
        // O también se escribe el código de arriba símplemente como
        tarea.descripcion === descripcion
    )

    if (index >= 0) { // Se encontró
        listadoPorHacer[index].completado = completado; // Modificar el valor con el del usuario
        guardarDB();
        return true;
    } else {
        return false; // No se hizo la actualización
    }
}


// borrar una tarea (recibe 1 argumento (descripcion)
// Alt. 1: MOB
const borrarM = (descripcion) => {

    // Leer la BD
    cargarDB();
    // Buscar en el arreglo, lo que coincida con el param. descripcion
    let index = listadoPorHacer.findIndex(tarea =>
        /*
            {
                return tarea.descripcion === descripcion
            }
        */
        // O también se escribe el código de arriba símplemente como
        tarea.descripcion === descripcion
    )

    console.log('index a borrar: ', index);

    if (index >= 0) { // Se encontró la descripción
        listadoPorHacer.splice(index, 1); // Borra el índice
        guardarDB(); // Actualizar archivo JSON
        return true;
    } else {
        return false; // No se encontró la descripción
    }
}

// borrar una tarea (recibe 1 argumento (descripcion)
// Alt. 2: Fernando Herrera (Instructor)
const borrar = (descripcion) => {

    // Leer la BD
    cargarDB();
    // Crear un nuevo arreglo de tareas quitando el elemento a borrar
    let nuevoListado = listadoPorHacer.filter(tarea =>
        /*
            {
                return tarea.descripcion !== descripcion
            }
        */
        // O también se escribe el código de arriba símplemente como
        tarea.descripcion !== descripcion
    )

    console.log('nuevoListado: ', nuevoListado);
    if (listadoPorHacer.length === nuevoListado.length) { // No se borró la descripción del usuario
        return false;
    } else { // Se borró la descripción del usuario
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}