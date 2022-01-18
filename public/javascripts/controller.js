import Todo from "/javascripts/todo.js"
import Todos from "/javascripts/todos.js"

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.dataPayload = {};
    this.newYear = 2050;

    this.getAndDisplayTodos();
    this.model.bindTodosChanged(this.getAndDisplayTodos);
  }

  modelTodosToEntityTodos(todos) {
    return new Todos(
      todos.map((todo) => this.modelTodoToEntityTodo(todo)),
    );
  }

  modelTodoToEntityTodo(todo) { return new Todo(todo); }

  getAndDisplayTodos = async () => {
    this.model.todos = await this.model.getTodos();
    this.todos = this.modelTodosToEntityTodos(this.model.todos);
    this.displayTodos(this.todos);
  }

  displayTodos = (todos, dueDate, completedOnly) => {
    const selected = todos.selected(dueDate, completedOnly);
    this.view.displayTodos({
      dueDate: dueDate,
      completedOnly: completedOnly,
      current_section: { title: this.getTitle(dueDate, completedOnly), data: selected.length },
      todos: todos.todos,
      done: todos.done(),
      selected: selected,
      todos_by_date: todos.todosByDate,
      done_todos_by_date: todos.doneTodosByDate,
    });
    this.view.bindAddTodo(this.handleAddTodo)
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindEditTodo(this.handleEditTodo);
    this.view.bindToggleTodoCompleteness(this.handleToggleTodoCompleteness);
    this.view.bindNavigationLinks(this.handleNavigationLinks)
  }

  getTitle(dueDate, completedOnly) {
    if (dueDate) { return dueDate }
    return completedOnly ? "Completed" : "All todos"
  }

  handleNavigationLinks = (dueDate, completedOnly) => {
    this.displayTodos(this.todos, dueDate, completedOnly);
  }

  handleToggleTodoCompleteness = (id) => {
    const todo = this.todos.getTodo(id);
    todo.toggleComplete();
    this.model.editTodo(todo.toJSON());
  }

  handleAddTodo = () => {
    this.view.displayModal();
    this.view.bindCloseModal(this.handleCloseModal);
    this.view.bindSaveTodo(this.handleSaveTodo);
    this.view.bindCompleteTodo(this.handleCompleteTodo);
  }

  handleSaveTodo = (todoJSON) => {
    const todo = new Todo(todoJSON);
    if (!todo.isValid()) {
      alert(todo.validationErrors());
    } else if (todo.existsInDB()) {
      this.model.editTodo(todo.toJSON());
    } else {
      this.model.createTodo(todo.toJSON());
    }
  }

  handleEditTodo = (id) => {
    this.view.displayModal(this.todos.getTodo(id));
    this.view.bindCloseModal(this.handleCloseModal);
    this.view.bindSaveTodo(this.handleSaveTodo);
    this.view.bindCompleteTodo(this.handleCompleteTodo);
  }


  handleCompleteTodo = (todoJSON) => {
    const todo = new Todo(todoJSON);
    if (!todo.existsInDB()) {
      alert('Cannot complete a todo that is not yet created!')
    } else {
      todo.toggleComplete();
      this.model.editTodo(todo.toJSON());
    }
  }

  handleCloseModal = () => {
    this.view.hideModal();
  }

  handleDeleteTodo = (id) => {
    this.model.deleteTodo(id);
  }
}
