const inquirer = require('inquirer');
require('colors');

const menu = async() => {
  const questions = [
    {
      type: 'list',
      name: 'option',
      message: 'Menu',
      choices: [
        {
          value: '1',
          name: `${'1'.green}. Crear una tarea`
        },
        {
          value: '2',
          name: `${'2'.green}. Ver tareas`
        },
        {
          value: '3',
          name: `${'3'.green}. Ver tareas completadas`
        },
        {
          value: '4',
          name: `${'4'.green}. Ver tareas pendientes`
        },
        {
          value: '5',
          name: `${'5'.green}. Completar tareas`
        },
        {
          value: '6',
          name: `${'6'.green}. Borrar tarea`,
        },
        {
          value: '0',
          name: `${'0'.red}. Salir\n`
        }
      ]
    }
  ];

  console.clear();
  console.log("=========================".blue);
  console.log(" Seleccione una opción: ".yellow);
  console.log("=========================".blue);

  const { option } = await inquirer.prompt(questions);

  return option;
};

const pause = async() => {
  const question = {
    type: 'input',
    name: 'key',
    message: `\nPresione ${'ENTER'.green} para continuar`
  };

  console.log('\n');
  await inquirer.prompt(question);

  return true;
};

const read = async(message) => {
  const question = {
    type: 'input',
    name: 'desc',
    message,
    validate(input) {
      if (input.length === 0) {
        return 'Por favor, introduzca un valor'
      }

      return true;
    }
  };

  const { desc } = await inquirer.prompt(question);

  return desc;
};

const removeTaskMenu = async(tasks = []) => {
  const choices = tasks.map((task, index) => {
    return {
      value: task.id,
      name: `${index + 1}`.green + `. ${task.description}`
    }
  });

  choices.push({
    value: null,
    name: '0'.red + '. Cancelar'
  });

  const questions = [
    {
      type: 'list',
      name: 'taskId',
      message: '¿Qué tarea desea borrar?',
      choices
    }
  ];

  const { taskId } = await inquirer.prompt(questions);

  return taskId;
};

const confirmation = async(message) => {
  const question = [
    {
      type: 'confirm',
      name: 'confirmed',
      message
    }
  ];

  const { confirmed } = await inquirer.prompt(question);

  return confirmed;
};

const completeTasksMenu = async(tasks = []) => {
  const choices = tasks.map((task, index) => {
    return {
      value: task.id,
      name: `${index + 1}`.green + `. ${task.description}`,
      checked: !!task.finishedAt
    }
  });

  // choices.push({
  //   value: null,
  //   name: '0'.red + '. Cancelar'
  // });

  const questions = [
    {
      type: 'checkbox',
      name: 'taskIds',
      message: 'Seleccione las tareas',
      choices
    }
  ];

  const { taskIds } = await inquirer.prompt(questions);

  return taskIds;
};

module.exports = {
  menu,
  pause,
  read,
  removeTaskMenu,
  confirmation,
  completeTasksMenu
};
