"use strict";

var template = document.createElement('template');
template.innerHTML = require("./template.html").default;

class Cell extends HTMLElement {
  constructor() {
    super();

    const templateContent = template.content;

  
    this.innerHTML = templateContent  
    this.attachShadow({mode: 'open'}).appendChild(
      templateContent.cloneNode(true)
    );

    // component without shadowdom
    // this.innerHTML = require("./template.html").default;
  }

  static get observedAttributes() {
    return ['activation'];
  }

  connectedCallback() {
    console.log("connected");
    this.addEventListener('mousedown', function (event) {
      console.log(event.target);
    });
  }

  attributeChangedCallback(name, old, value) {
    // react to attribute changes
    // from either the DOM attributes world, or the JS one.
    // All attributes values will be either strings or null.
    // Optionally avoid reacting if (old === value)
    // or (value === null), meaning attribute was removed
    // Optionally dispatch an attributechange event.
    this.render();
  }

  get activation() {
    return this.getAttribute('activation');
  }
  set activation(activation) {
    this.setAttribute('activation', activation);
    // eventually dispatch an event to propagate the change
  }

  render () {
    console.log(this.activation);
  }
}



window.customElements.define('pdp-cell', Cell);