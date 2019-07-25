// Aplicación de tareas por hacer

// Importar yargs
//const argv = require('yargs').argv;   // Se manda al archivo yargs.js de config
const argv = require('./config/yargs').argv;
// Colores en consola
var colors = require('colors');

console.log('argv: ', argv);

const porHacer = require('./por-hacer/por-hacer');


// node app crear -d "Pasear al perro"
// node app listar
// node app actualizar -d "Pasear al perro" -c true   (-d: descripción, -c: completada)

// Configuraciones

let comando = argv._[0]; // Acceder a la posición 0 de yargs en donde está el comando

console.log('comando: ', comando);

// Opciones
switch (comando) {
    case 'crear':
        //console.log('Crear por hacer');
        let tarea = porHacer.crear(argv.descripcion);
        console.log('tarea: ', tarea);
        break;
    case 'listar':
        //console.log('Mostrar todas las tareas por hacer');
        let listado = [];
        listado = porHacer.getListado();

        for (const tarea of listado) {
            console.log(`${colors.green('===============Por Hacer===============')}`);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log(`${colors.green('=======================================')}`);
        }
        break;
    case 'actualizar':
        //console.log('Actualiza una tarea por hacer');
        console.log('argv.descripcion: ', argv.descripcion);
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log('actualizado: ', actualizado);
        break;
    case 'borrar':
        console.log('argv.descripcion: ', argv.descripcion);
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(`Tarea ${ argv.descripcion } borrada: `, borrado);
        break;
    default:
        console.log('Comando no reconocido');
        break;
}

// Datos Archivo JSON: data.json de prueba:
// [{"descripcion":"Comer","completado":true},{"descripcion":"Salir de la casa","completado":false},{"descripcion":"Pasear al perro","completado":false}]