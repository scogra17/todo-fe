import Model from "/javascripts/model.js"
import View from "/javascripts/view.js"
import Controller from "/javascripts/controller.js"

class App {
  constructor() {
    this.model = new Model();
    this.view = new View();
    this.controller = new Controller(this.model, this.view, this.contacts);
  }
}

// document.addEventListener('DOMContentLoaded', () => {
//   new App();
// });

let app = new App();
