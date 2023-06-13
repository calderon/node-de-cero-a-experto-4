require('colors');
const { v4: uuidv4 } = require('uuid');

class Task {
  id = '';
  description = '';
  finishedAt = null;

  constructor(args) {
    this.id = args.id || uuidv4();
    this.description = args.description || '';
    this.finishedAt = args.finishedAt || null;
  }

  print(pre = '') {
    const finishedMessage = this.finishedAt
      ? `Completada`.green
      : `Pendiente`.red;

    console.log(`${pre}${this.description} :: ${finishedMessage}`);
  }

  unfinish() {
    this.finishedAt = null;
  }

  finish() {
    this.finishedAt = new Date();
  }
}

module.exports = Task;
