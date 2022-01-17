import Todo from "/javascripts/todo.js"
import Todos from "/javascripts/todos.js"

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.dataPayload = {};

    this.getAndDisplayTodos();
    this.bindEvents();
  }

  bindEvents() {
    this.model.bindTodosChanged(this.getAndDisplayTodos);
  }

  handleAddTodo = () => {
    this.view.displayModal();
  }

  modelTodosToEntityTodos(todos) {
    return new Todos(
      todos.map((todo) => this.modelTodoToEntityTodo(todo)),
    );
  }

  modelTodoToEntityTodo(todo) { return new Todo(todo); }

  getAndDisplayTodos = async () => {
    this.model.todos = await this.model.getTodos();
    const todos = this.modelTodosToEntityTodos(this.model.todos);
    this.view.displayTodos({
      current_section: { title: "Test", data: "21" },
      todos: todos.todos,
      done: todos.done,
      selected: todos.selected(),
      todos_by_date: todos.todosByDate,
      done_todos_by_date: todos.doneTodosByDate,
    });
    this.view.bindAddTodo(this.handleAddTodo)
  }
}
