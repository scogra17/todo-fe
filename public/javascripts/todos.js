export default class Todos {
  constructor(todos) {
    this.todos = todos || [];
  }

  getTodo(id) {
    const todo = this.todos.filter((t) => t.id == id);
    if (todo) return todo[0];
  }
}