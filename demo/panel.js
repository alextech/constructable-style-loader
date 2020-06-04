import style from './style.css';

class Panel extends HTMLElement {
    constructor() {
        super();

        const s = style;

        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `<div class="panel">Panel CMP</div>`;
    }
}

if (customElements.get('ata-panel') == null) {
    customElements.define('ata-panel', Panel);
}
