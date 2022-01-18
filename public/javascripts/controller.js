import Todo from "/javascripts/todo.js"
import mappers from "/javascripts/mappers.js"

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.getAndDisplayTodos();
    this.model.bindTodosChanged(this.getAndDisplayTodos);
  }

  getAndDisplayTodos = async () => {
    this.model.todos = await this.model.getTodos();
    this.todos = mappers.modelTodosToEntityTodos(this.model.todos);
    this.displayTodos(this.todos);
  }

  displayTodos = (todos, dueDate, completedOnly) => {
    this.view.displayTodos(mappers.todosToDataPayload(todos, dueDate, completedOnly));
    this.view.bindAddTodo(this.handleAddTodo)
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindEditTodo(this.handleEditTodo);
    this.view.bindToggleTodoCompleteness(this.handleToggleTodoCompleteness);
    this.view.bindNavigationLinks(this.handleChooseCategory)
  }

  handleAddTodo = () => {
    this.view.displayModal();
    this.view.bindCloseModal(this.handleCloseModal);
    this.view.bindSaveTodo(this.handleSaveTodo);
    this.view.bindCompleteTodo(this.handleCompleteTodo);
  }

  handleChooseCategory = (dueDate, completedOnly) => {
    this.displayTodos(this.todos, dueDate, completedOnly);
  }

  handleToggleTodoCompleteness = (id) => {
    const todo = this.todos.getTodo(id);
    todo.toggleComplete();
    this.model.editTodo(todo.toJSON());
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

  handleCloseModal = () => { this.view.hideModal() }
  handleDeleteTodo = (id) => { this.model.deleteTodo(id) }
}
