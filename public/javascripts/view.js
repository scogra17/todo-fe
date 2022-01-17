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
    console.log(data);
    this.body.innerHTML = this.templates.main_template(data);
  }

  displayModal() {
    document.querySelector('#modal_layer').style.display = 'block';
    document.querySelector('#form_modal').style.display = 'block';
  }

  clearElementChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }

  bindAddTodo(handler) {
    document.querySelector('[for="new_item"]').addEventListener('click', (event) => {
      handler();
    })
  }
}

