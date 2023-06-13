const { createInterface } = require('readline');

require('colors');

const showMenu = () => {
  return new Promise(resolve => {
    console.clear();
    console.log("=========================".blue);
    console.log(" Seleccione una opción: ".yellow);
    console.log("=========================".blue);

    console.log(`${'1'.green}. Crear una tarea`);
    console.log(`${'2'.green}. Ver tareas`);
    console.log(`${'3'.green}. Ver tareas completadas`);
    console.log(`${'4'.green}. Ver tareas pendientes`);
    console.log(`${'5'.green}. Completar tareas`);
    console.log(`${'6'.green}. Borrar tarea`);
    console.log(`${'0'.red}. Salir\n`);

    const readline = createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question('Seleccione una opción: ', (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise(resolve => {
    const readline = createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question(`\nPresione ${'ENTER'.green} para continuar`, (opt) => {
      readline.close();
      resolve(opt);
    });
  });
};

module.exports = {
  showMenu,
  pause
};
