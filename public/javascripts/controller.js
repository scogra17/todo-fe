import Todo from "/javascripts/todo.js"
import Todos from "/javascripts/todos.js"

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.displayTodos();
    this.bindEvents();
  }

  bindEvents() {
    this.model.bindTodosChanged(this.displayTodos);
  }

  modelTodosToEntityTodos(todos) {
    return new Todos(
      todos.map((todo) => this.modelTodoToEntityTodo(todo)),
    );
  }

  modelTodoToEntityTodo(todo) { return new Todo(todo); }

  displayTodos = async () => {
    this.model.todos = await this.model.getTodos();
    console.log(this.modelTodosToEntityTodos(this.model.todos));
  }
}
