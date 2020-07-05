import style from './style.css';

class Form extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `<div class="panel">Form CMP<form><input type="text" /></form></div>`;
        this.shadowRoot.adoptedStyleSheets = [style];
    }
}

if (customElements.get('ata-form') == null) {
    customElements.define('ata-form', Form);
}
