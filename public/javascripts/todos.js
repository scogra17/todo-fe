export default class Todos {
  constructor(todos) {
    this._todos = todos || [];
    this.groupTodosByDate();
  }

  get todos() { return this._todos }
  get todosByDate() { return this._todosByDate }
  get doneTodosByDate() { return this._doneTodosByDate }

  getTodo(id) {
    const todo = this._todos.filter((td) => td.id === id);
    if (todo) return todo[0];
    return undefined;
  }

  isEmpty() {
    return this._todos.length === 0;
  }

  done() {
    return this._todos.filter((todo) => todo.completed);
  }

  sort() {
    this._todos.sort((laterTodo, earlierTodo) => {
      return earlierTodo.compare(laterTodo);
    });
  }

  sortByDate() {
    this._todos.sort((laterTodo, earlierTodo) => {
      return earlierTodo.compareByDate(laterTodo);
    });
  }

  selected(dueDate, completedOnly) {
    this.sort();
    let todos = this._todos;
    if (dueDate) {
      todos = todos.filter((todo) => todo.due_date === dueDate);
    }
    if (completedOnly) {
      todos = todos.filter((todo) => todo.completed );
    }
    return todos;
  }

  groupTodosByDate() {
    this.sortByDate();
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
    });
  }
}
