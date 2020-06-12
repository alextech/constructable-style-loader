#constructable-style-loader

Inject CSS directly into a DOM element as a [`constructable stylesheet`](https://developers.google.com/web/updates/2019/02/constructable-stylesheets).

Creates `CSSStyleSheetObject` JavaScript object from **purged CSS source**, which can be adopted to an element using `adoptedStyleSheets` setter.
CSS is purged with `purgeCSS` specifically for the file it is being loaded in, so only relevant part of the CSS library is applied.
This is especially useful for web components, where the scope of parent document style does not reach its DOM tree
 while every instance of the component should not have a copy of the whole style with selectors it does not need.
 
## Getting Started

To begin, install `constructable-style-loader`:

```console
npm install --save-dev constructable-style-loader
```

Then add the loader to your `webpack` config. For example:

**style.css**

```css
.panel {
  background-color: orange;
  border-style: solid;
}
```

**panel.js**

```js
import style from './style.css';

class Panel extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `<div class="panel">Panel CMP</div>`;
        this.shadowRoot.adoptedStyleSheets = [style]
    }
}

if (customElements.get('ata-panel') == null) {
    customElements.define('ata-panel', Panel);
}
```

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['constructable-style-loader'],
      },
    ],
  },
};
```
