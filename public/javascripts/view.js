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

    console.log(templates);
    console.log(partials);
  }

  displayTodos(data) {
    this.clearElementChildren(this.body);
    this.body.innerHTML = this.templates.main_template(data);
    let option = document.createElement('option');
    option.textContent = data.newYear;
    document.querySelector('#year').appendChild(option)
  }

  displayModal() {
    document.querySelector('#modal_layer').style.display = 'block';
    document.querySelector('#form_modal').style.display = 'block';
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

  bindCloseModal(handler) {
    document.querySelector('#modal_layer').addEventListener('click', (event) => {
      handler();
    })
  }

  bindAddTodo(handler) {
    document.querySelector('[for="new_item"]').addEventListener('click', (event) => {
      handler();
    })
  }

  bindDeleteTodo(handler) {
    const elem = document.querySelector('#selected_todos');
    elem.addEventListener('click', (event) => {
      if (event.target.matches('.delete, .delete *')) {
        const todoID = Number(event.target.closest('tr').getAttribute('data-id'));
        handler(todoID);
      }
    })
  }

  bindSaveTodo(handler) {
    document.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const todo = this.prepareFormData(document.querySelector('form'));
      handler(todo);
    })
  }

  bindCompleteTodo(handler) {
    const elem = document.querySelector('[name=complete]');
    elem.addEventListener('click', (event) => {
      event.preventDefault();
      const todo = this.prepareFormData(document.querySelector('form'));
      handler(todo);
    })
  }

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
}

