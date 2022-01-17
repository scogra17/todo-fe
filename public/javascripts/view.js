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

  clearElementChildren(element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  }
}


    // this.itemPartial = Handlebars.registerPartial('item_partial',
    //   Handlebars.compile(document.querySelector('#item_partial').innerHTML));

    // // needs: todos.length
    // this.allTodosTemplate = Handlebars.compile(
    //   document.querySelector('#all_todos_template')
    // )

    // // needs: done.length
    // this.completedTodosTemplate = Handlebars.compile(
    //   document.querySelector('#completed_todos_template')
    // )

    // // needs: { todos_by_date: [ {length: , @key: } ] }
    // this.allListTemplate = Handlebars.compile(
    //   document.querySelector('#all_list_template')
    // )

    // // needs: { done_todos_by_date: [ {length: , @key: } ] }
    // this.completedListTemplate = Handlebars.compile(
    //   document.querySelector('#completed_list_template')
    // )

    // // needs: current_section: { title: , data: }
    // this.titleTemplate = Handlebars.compile(
    //   document.querySelector('#title_template')
    // )

    // // needs: { selected = [] }
    // // partials used: itemPartial
    // this.listTemplate = Handlebars.compile(
    //   document.querySelector('#list_template')
    // )

    // this.mainTemplate = Handlebars.compile(
    //   document.querySelector('#main_template').innerHTML
    // );
