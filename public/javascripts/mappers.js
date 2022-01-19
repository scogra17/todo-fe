/* eslint-disable camelcase */

import Todo from "/javascripts/todo.js";
import Todos from "/javascripts/todos.js";

export default {
  modelTodosToEntityTodos: function(todos) {
    return new Todos(
      todos.map((todo) => this.modelTodoToEntityTodo(todo)),
    );
  },

  modelTodoToEntityTodo: function(todo) {
    return new Todo(todo);
  },

  todosToDataPayload: function(todos, dueDate, completedOnly) {
    const selected = todos.selected(dueDate, completedOnly);
    return {
      dueDate: dueDate,
      completedOnly: completedOnly,
      current_section: {
        title: this.getTitle(dueDate, completedOnly),
        data: selected.length,
      },
      todos: todos.todos,
      done: todos.done(),
      selected: selected,
      todos_by_date: todos.todosByDate,
      done_todos_by_date: todos.doneTodosByDate,
    };
  },

  getTitle: function(dueDate, completedOnly) {
    if (dueDate) {
      return dueDate;
    }
    return completedOnly ? "Completed" : "All todos";
  }
};
