export default class Todo {
  constructor(todo) {
    this.id = todo.id;
    this.title = todo.title;
    this.day = todo.day || '';
    this.month = todo.month || '';
    this.year = todo.year || '';
    this.description = todo.description || '';
    this.completed = false;
  }

  toggleComplete() {
    this.complete = !this.complete;
  }
}
