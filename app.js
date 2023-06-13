require('colors');

const {
  menu,
  pause,
  read,
  removeTaskMenu,
  confirmation,
  completeTasksMenu
} = require('./helpers/inquirer');

const db = require('./helpers/db');

const Task = require('./models/task');
const Tasks = require('./models/tasks');

console.clear();

const main = async() => {
  let opt = '';
  let input = '';

  const tasks = new Tasks();
  tasks.listFromArray = db.read();

  do {
    opt = await menu();

    switch (opt) {
      case '1':
        const description = await read('Descripción: ');
        tasks.addTask({ description });

        db.save(tasks.list);

        break;

      case '2':
        tasks.print();
        break;

      case '3':
        tasks.printCompleted();
        break;

      case '4':
        tasks.printCompleted(false);
        break;

      case '5':
        if (tasks.any()) {
          const taskIds = await completeTasksMenu(tasks.list);

          tasks.toggleFinishedTasks(taskIds);
        } else {
          console.log('\nNo hay ninguna tarea en el listado');
        }

        db.save(tasks.list);

        break;

      case '6':
        if (tasks.any()) {
          const taskId = await removeTaskMenu(tasks.list);

          if (taskId) {
            const task = tasks.getTask(taskId);
            const confirmRemoving = await confirmation(`Vas a borrar la tarea ${`${task.description}`.red}. ¿Estás seguro?`);

            if (confirmRemoving) {
              tasks.removeTask(taskId);
              console.log("\nTarea borrada");
            }

            db.save(tasks.list);
          }
        } else {
          console.log('\nNo hay ninguna tarea en el listado');
        }

        break;
    }

    if (opt !== '0') {
      await pause();
    }
  } while (opt !== '0');
};

main();
