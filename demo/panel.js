class Panel extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `<div class="panel">Panel CMP</div>`;
    }
}

if (customElements.get('ata-panel') == null) {
    customElements.define('ata-panel', Panel);
}
