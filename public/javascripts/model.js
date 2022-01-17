const DOMAIN = 'http://localhost:3000';

export default class Model {
  constructor() {
    this.todos = [];
  }

  async getTodos() {
    const response = await fetch(`${DOMAIN}/api/todos`, {
      method: 'GET',
      headers: { 'Response-Type': 'json' },
    });
    const contacts = await response.json();
    return contacts;
  }

  async getTodo(id) {}

  async createTodo(todo) {}

  async editTodo(todo) {}

  async deleteTodo(id) {
    await fetch(`${DOMAIN}/api/todos/${id}`, {
      method: 'DELETE',
    })
    this.onTodosChanged();
  }

  bindTodosChanged(handler) {
    this.onTodosChanged = handler;
  }
}
