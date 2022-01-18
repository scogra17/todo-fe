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

  async createTodo(todo) {
    const response = await fetch(`${DOMAIN}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Response-Type': 'json',
      },
      body: JSON.stringify(todo),
    });
    await response.json();
    this.onTodosChanged();
  }

  async editTodo(todo) {
    const response = await fetch(`${DOMAIN}/api/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Response-Type': 'json',
      },
      body: JSON.stringify(todo),
    })
    await response.json();
    this.onTodosChanged();
  }

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
