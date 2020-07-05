import style from './style.css';

class Form extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `<div class="form"><form>Form CMP</form></div>`;
        this.shadowRoot.adoptedStyleSheets = [style]
    }
}

if (customElements.get('ata-panel') == null) {
    customElements.define('ata-panel', Form);
}
