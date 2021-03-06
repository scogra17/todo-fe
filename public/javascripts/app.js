/* eslint-disable no-new */

import Model from "/javascripts/model.js";
import View from "/javascripts/view.js";
import Controller from "/javascripts/controller.js";

class App {
  constructor() {
    this.model = new Model();
    this.view = new View();
    this.controller = new Controller(this.model, this.view);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new App();
});
