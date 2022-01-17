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

  toggleComplete() {
    this.complete = !this.complete;
  }

  due_date() {
    return `${this.month}/${this.year.slice(2)}`;
  }
}
