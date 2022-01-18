export default class Todo {
  constructor(todo) {
    this.id = todo.id;
    this.title = todo.title;
    this.day = todo.day || '';
    this.month = todo.month || '';
    this.year = todo.year || '';
    this.description = todo.description || '';
    this.completed = todo.completed || false;
    this.due_date = this.due_date();
  }

  compare(laterTodo) {
    if (this.completed && !laterTodo.completed || this.id > laterTodo.id) {
      return -1;
    } else {
      return 1;
    }
  }

  existsInDB() {
    return !!this.id
  }

  isValid() {
    return !this.titleValidationError()
  }

  toggleComplete() {
    this.completed = !this.completed;
  }

  due_date() {
    if (this.month && this.year) {
      return `${this.month}/${this.year.slice(2)}`;
    } else {
      return 'No Due Date';
    }
  }

  validationErrors() {
    return this.titleValidationError();
  }

  titleValidationError() {
    if (this.title.length < 3) {
      return 'Title must be greater than 3 characters'
    }
  }

  toJSON() {
    const data = {
      title: this.title,
      completed: this.completed,
    }
    if (this.id) { data.id = this.id };
    if (this.day) { data.day = this.day };
    if (this.month) { data.month = this.month };
    if (this.year) { data.year = this.year };
    if (this.description) { data.description = this.description };

    return data;
  }
}
