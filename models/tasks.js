const Task = require('./task');

class Tasks {
  _list = {};

  constructor(list = {}) {
    this._list = list;
  }

  set listFromArray(list) {
    this._list = {};

    list.forEach((data) => {
      const task = new Task(data);

      this._list[data.id] = task;
    });

    return this._list;
  }

  get list() {
    const list = [];

    Object.keys(this._list).forEach((key) => {
      list.push(this._list[key]);
    });

    return list;
  }

  addTask(data = {}) {
    const task = new Task(data);

    this._list[task.id] = task;
  }

  removeTask(id) {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  getTask(id) {
    return this._list[id];
  }

  print(pending = false) {
    if (this.any()) {
      let index = 0;

      for (const task in this._list) {
        this._list[task].print(`${++index}. `.yellow);
      }
    } else {
      console.log("No hay tareas");
    }
  }

  // printCompleted(pending = true) {
  //   const list = this.list.filter((task) => !!task.finishedAt === pending);

  //   list.forEach((task, index) => {
  //     task.print(`${index + 1}. `.yellow);
  //   });
  // }

  printCompleted(pending = true) {
    this.list.forEach((task, index) => {
      if (!!task.finishedAt === pending) {
        task.print(`${index + 1}. `.yellow);
      }
    });
  }

  any() {
    return !!Object.keys(this._list).length;
  }

  toggleFinishedTasks(finishedTasksIds = []) {
    this.list.forEach((task) => {
      if (finishedTasksIds.includes(task.id)) {
        task.finish();
      } else {
        task.unfinish();
      }
    });
  }
}

module.exports = Tasks;
