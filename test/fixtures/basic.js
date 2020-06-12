import css from './basic.css';

class Panel extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({mode: "open"});
    this.shadowRoot.innerHTML = `<div class="panel">Panel CMP</div>`;
    this.shadowRoot.adoptedStyleSheets = [css]
  }
}

if (customElements.get('ata-panel') == null) {
  customElements.define('ata-panel', Panel);
}

__export__ = css;

export default css;