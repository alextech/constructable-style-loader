import style from './style.css';

class Panel extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `<div class="panel">Panel CMP</div>`;
        this.shadowRoot.adoptedStyleSheets = [style]
    }
}

if (customElements.get('ata-form') == null) {
    customElements.define('ata-form', Panel);
}
