export default class Todos {
  constructor(todos) {
    this._todos = todos || [];
    this.sortTodosByDate();
  }

  get todos() { return this._todos; }
  get todosByDate() { return this._todosByDate; }
  get doneTodosByDate() { return this._doneTodosByDate; }

  getTodo(id) {
    const todo = this._todos.filter((t) => t.id == id);
    if (todo) return todo[0];
  }

  isEmpty() {
    return this._todos.length === 0;
  }

  done() {
    return this._todos.filter((t) => t.completed);
  }

  selected() {
    return this._todos.sort((laterTodo, earlierTodo) => {
      return earlierTodo.compare(laterTodo);
    });
  }

  sortTodosByDate() {
    this._todosByDate = {};
    this._doneTodosByDate = {};

    this._todos.forEach((todo) => {
      if (this._todosByDate[todo.due_date]) {
        this._todosByDate[todo.due_date].push(todo);
      } else {
        this._todosByDate[todo.due_date] = [todo];
      }

      if (todo.completed) {
        if (this._doneTodosByDate[todo.due_date]) {
          this._doneTodosByDate[todo.due_date].push(todo);
        } else {
          this._doneTodosByDate[todo.due_date] = [todo];
        }
      }
    })
  }
}