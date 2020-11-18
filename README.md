# constructable-style-loader

Apply CSS directly to a DOM element as a [`constructable stylesheet`](https://developers.google.com/web/updates/2019/02/constructable-stylesheets).
Constructable-style-loader creates `CSSStyleSheetObject` JavaScript object, which can be adopted to an element using `adoptedStyleSheets` setter.

It can be optionally chained with `postcss-loader` when need to use output from other CSS preprocessors.
If used with `postcss-loader`, then also consider `postcss-discard-comments` plugin to delete unnecessary comments that would bloat the bundle.

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

## Optional usage with purgecss

Loader options accept object that will be passed to purgecss plugin (assuming it is installed), if `{purge: true}` property is present.

 **webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
            {
                loader: 'constructable-style-loader',
                options: {
                    purge: true,
                    content: ['**/*.js'],
                    whitelist: ['white-listed']
                }
            },
        ]
      },
    ],
  },
};
```

If `constructable-style-loader` is chained after `purgecss-loader`, in this case purgecss will be given AST root from PostCSS
to avoid duplicate parsing of CSS string.

### Note about performance

In case of web components, creating a separate CSS tree per component ended up being unnecessary.
Browser does not appear to be duplicating CSS tree in every place where it is applied the way inserting <style> tag in every shadow root would, but only points to it.
On the contrary, having separate CSS tree per component only expanded bundle size.
Could potentially investigate if there are any performance wins if CSSStyleSheetObjects are created at runtime, not compile time.
