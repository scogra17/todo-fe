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
    try {
      this.model.todos = await this.model.getTodos();
      this.todos = mappers.modelTodosToEntityTodos(this.model.todos);
      this.displayTodos(this.todos);
    } catch (err) {
      console.log(err);
    }
  }

  displayTodos = (todos) => {
    this.view.displayTodos(mappers.todosToDataPayload(todos, this.dueDate, this.completedOnly));
    this.view.bindAddTodo(this.handleAddTodo);
    this.view.bindDeleteTodo(this.handleDeleteTodo);
    this.view.bindEditTodo(this.handleEditTodo);
    this.view.bindToggleTodoCompleteness(this.handleToggleTodoCompleteness);
    this.view.bindNavigationLinks(this.handleChooseCategory)
  }

  handleAddTodo = () => {
    this.view.displayModal();
    this.view.bindCloseModal(this.handleCloseModal);
    // this.view.bindSaveTodo(this.debounceLeading(this.handleSaveTodo, 300));
    this.view.bindSaveTodo(this.handleSaveTodo);
    this.view.bindCompleteTodo(this.handleCompleteTodo);
  }

  handleChooseCategory = (dueDate, completedOnly) => {
    this.dueDate = dueDate;
    this.completedOnly = completedOnly;
    this.displayTodos(this.todos);
  }

  handleToggleTodoCompleteness = async (id) => {
    const todo = this.todos.getTodo(id);
    todo.toggleComplete();
    try {
      this.model.editTodo(todo.toJSON());
    } catch (err) {
      console.log(err);
      this.getAndDisplayTodos();
    }
  }

  handleSaveTodo = async (todoJSON) => {
    const todo = new Todo(todoJSON);
    if (!todo.isValid()) {
      alert(todo.validationErrors());
    } else if (todo.existsInDB()) {
      try {
        await this.model.editTodo(todo.toJSON());
      } catch (err) {
        console.log(err);
        this.getAndDisplayTodos();
      }
    } else {
      try {
        await this.model.createTodo(todo.toJSON());
        this.completedOnly = false;
        this.dueDate = undefined;
      } catch (err) {
        console.log(err);
        this.getAndDisplayTodos();
      }
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
      try {
        this.model.editTodo(todo.toJSON());
      } catch (err) {
        console.log(err);
        this.getAndDisplayTodos();
      }
    }
  }

  handleCloseModal = () => { this.view.hideModal() }
  handleDeleteTodo = (id) => { this.model.deleteTodo(id) }

  debounceLeading = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      if (!timer) {
        console.log(this);
        func.apply(this, args);
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = undefined;
      }, timeout);
    };
  }
}
