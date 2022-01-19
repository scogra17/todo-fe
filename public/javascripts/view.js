export default class View {
  constructor() {
    this.body = document.querySelector('body');
    this.templates = {};
    this.getTemplates();
  }

  getTemplates() {
    const templates = document.querySelectorAll(`[type="text/x-handlebars"]`);
    const partials = document.querySelectorAll(`[data-type="partial"]`);

    templates.forEach(template => {
      this.templates[template.id] = Handlebars.compile(template.innerHTML);
    });

    partials.forEach(partial => {
      Handlebars.registerPartial(partial.id, partial.innerHTML);
    });
  }

  displayTodos(data) {
    this.clearElementChildren(this.body);
    this.body.innerHTML = this.templates.main_template(data);
    this.displaySelectedHeadingHighlighted(data.dueDate, data.completedOnly);
  }

  displaySelectedHeadingHighlighted(dueDate, completedOnly) {
    let active;
    if (!dueDate && !completedOnly) {
      active = document.querySelector('#all_todos header');
    }
    if (!dueDate && completedOnly) {
      active = document.querySelector('#completed_todos header');
    }
    if (dueDate && !completedOnly) {
      active = document.querySelector(`#all_lists dl[data-title="${dueDate}"]`);
    }
    if (dueDate && completedOnly) {
      active = document.querySelector(`#completed_lists dl[data-title="${dueDate}"]`);
    }
    if (active) {
      active.classList.toggle('active');
    }
  }

  displayModal(todo) {
    const formModal = document.querySelector('#form_modal');
    this.clearModalForm(formModal);
    if (todo) {
      this.populateModalForm(todo, formModal);
    }
    document.querySelector('#modal_layer').style.display = 'block';
    formModal.style.display = 'block';
  }

  hideModal() {
    document.querySelector('#modal_layer').style.display = 'none';
    document.querySelector('#form_modal').style.display = 'none';
  }

  clearElementChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  bindAddTodo(handler) {
    document.querySelector('[for="new_item"]').addEventListener('click', () => {
      handler();
    });
  }

  bindCloseModal(handler) {
    document.querySelector('#modal_layer').addEventListener('click', () => {
      handler();
    });
  }

  bindDeleteTodo(handler) {
    const elem = document.querySelector('#selected_todos');
    elem.addEventListener('click', (event) => {
      if (event.target.matches('.delete, .delete *')) {
        const todoID = Number(event.target.closest('tr').getAttribute('data-id'));
        handler(todoID);
      }
    });
  }

  bindEditTodo(handler) {
    const elem = document.querySelector('#selected_todos');
    elem.addEventListener('click', (event) => {
      if (event.target.matches('label[for^="item_"]')) {
        const todoID = Number(event.target.closest('tr').getAttribute('data-id'));
        handler(todoID);
      }
    });
  }

  bindToggleTodoCompleteness(handler) {
    const elem = document.querySelector('#selected_todos');
    elem.addEventListener('click', (event) => {
      if (event.target.matches('.list_item, .list_item .check')) {
        const todoID = Number(event.target.closest('tr').getAttribute('data-id'));
        handler(todoID);
      }
    });
  }

  bindNavigationLinks(handler) {
    const elem = document.querySelector('#sidebar');
    elem.addEventListener('click', (event) => {
      if (event.target.matches('div #all_todos, div #all_todos *')) {
        return handler();
      }
      if (event.target.matches('div #completed_todos, div #completed_todos *')) {
        return handler(undefined, true);
      }
      if (event.target.matches('#all_lists dl, #all_lists dl *')) {
        let dueDate = event.target.closest('dl').getAttribute('data-title');
        return handler(dueDate);
      }
      if (event.target.matches('#completed_lists dl, #completed_lists dl *')) {
        let dueDate = event.target.closest('dl').getAttribute('data-title');
        return handler(dueDate, true);
      }
      return undefined;
    });
  }

  bindSaveTodo(handler) {
    document.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const todo = this.prepareFormData(document.querySelector('form'));
      handler(todo);
    });
  }

  bindCompleteTodo(handler) {
    const elem = document.querySelector('[name=complete]');
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      const todo = this.prepareFormData(document.querySelector('form'));
      handler(todo);
    });
  }

  // helpers

  formDataToJson(formData) {
    const json = {};
    for (const pair of formData.entries()) {
      if (json[pair[0]]) {
        json[pair[0]] = [json[pair[0]], pair[1]].join(',');
      } else {
        json[pair[0]] = pair[1];
      }
    }
    return json;
  }

  prepareFormData(form) {
    const formData = new FormData(form);
    const json = this.formDataToJson(formData);
    return json;
  }

  populateModalForm(data, form) {
    form.querySelector('#title').value = data.title;
    if (data.day) {
      form.querySelector('#day').value = data.day;
    }
    if (data.month) {
      form.querySelector('#month').value = data.month;
    }
    if (data.year) {
      form.querySelector('#year').value = data.year;
    }
    if (data.description) {
      form.querySelector('textarea[name="description"]').value = data.description;
    }
    if (data.id) {
      form.querySelector('#id').value = data.id;
    }
  }

  clearModalForm(form) {
    form.querySelector('#title').value = '';
    form.querySelector('#day').value = '';
    form.querySelector('#month').value = '';
    form.querySelector('#year').value = '';
    form.querySelector('textarea[name="description"]').value = '';
    form.querySelector('#id').value = '';
  }
}
