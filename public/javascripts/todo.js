/* eslint-disable camelcase */
/* eslint-disable max-statements-per-line */

export default class Todo {
  constructor(todo) {
    this.id = todo.id;
    this.title = todo.title;
    this.day = todo.day || '';
    this.month = todo.month || '';
    this.year = todo.year || '';
    this.description = todo.description || '';
    this.completed = todo.completed || false;
    this.due_date = this.dueDate() || 'No Due Date';
    this.epoch = this.epoch();
  }

  compare(laterTodo) {
    if (this.completed !== laterTodo.completed) {
      return this.completed ? -1 : 1;
    } else {
      return this.id > laterTodo.id ? -1 : 1;
    }
  }

  epoch() { return new Date(this.year, this.month).getTime() }

  compareByDate(laterTodo) {
    if (laterTodo) return this.epoch > laterTodo.epoch ? -1 : 1;
    return undefined;
  }

  existsInDB() {
    return !!this.id;
  }

  isValid() {
    return !this.titleValidationError();
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  dueDate() {
    if (this.month && this.year) {
      return `${this.month}/${this.year.slice(2)}`;
    }
    return undefined;
  }

  validationErrors() {
    return this.titleValidationError();
  }

  titleValidationError() {
    if (this.title.length < 3) {
      return 'Title must be greater than 3 characters';
    }
    return undefined;
  }

  toJSON() {
    const data = {
      title: this.title,
      completed: this.completed,
    };
    if (this.id) { data.id = this.id }
    if (this.day) { data.day = this.day }
    if (this.month) { data.month = this.month }
    if (this.year) { data.year = this.year }
    if (this.description) { data.description = this.description }

    return data;
  }
}
