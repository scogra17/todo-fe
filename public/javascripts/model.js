const DOMAIN = 'http://localhost:3000';

export default class Model {
  constructor() {
    this.todos = [];
  }

  async getTodos() {
    const url = `${DOMAIN}/api/todos`
    const opts = {
      method: 'GET',
      headers: { 'Response-Type': 'json' },
    }
    const response = await fetch(url, opts);
    if (!response.ok) {
      let message = `HTTP error ${response.status} for resource ${url}`
      throw new Error(message);
    }
    const contacts = await response.json();
    return contacts;
  }

  async createTodo(todo) {
    const url = `${DOMAIN}/api/todos`;
    const opts = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Response-Type': 'json',
      },
      body: JSON.stringify(todo),
    }
    const response = await fetch(url, opts);
    if (!response.ok) {
      let message = `HTTP error ${response.status} for resource ${url}`
      throw new Error(message);
    }
    await response.json();
    this.onTodosChanged();
  }

  async editTodo(todo) {
    const url = `${DOMAIN}/api/todos/${todo.id}`
    const opts = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Response-Type': 'json',
      },
      body: JSON.stringify(todo),
    }
    const response = await fetch(url, opts);
    if (!response.ok) {
      let message = `HTTP error ${response.status} for resource ${url}`
      throw new Error(message);
    }
    await response.json();
    this.onTodosChanged();
  }

  async deleteTodo(id) {
    const url = `${DOMAIN}/api/todos/${id}`
    const opts = {
      method: 'DELETE',
    }
    const response = await fetch(url, opts)
    if (!response.ok) {
      let message = `HTTP error ${response.status} for resource ${url}`
      throw new Error(message);
    }
    this.onTodosChanged();
  }

  bindTodosChanged(handler) {
    this.onTodosChanged = handler;
  }
}
