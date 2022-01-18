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

  existsInDB() {
    return !!this.id
  }

  isValid() {
    return !this.titleValidationError()
  }

  toggleComplete() {
    this.complete = !this.complete;
  }

  due_date() {
    return `${this.month}/${this.year.slice(2)}`;
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
    }
    if (this.id) { data.id = this.id };
    if (this.day) { data.day = this.day };
    if (this.month) { data.month = this.month };
    if (this.year) { data.year = this.year };
    if (this.completed) { data.completed = this.completed };
    if (this.description) { data.description = this.description };

    return data;
  }
}
