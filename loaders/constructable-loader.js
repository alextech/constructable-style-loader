const PurgeCSS = require('purgecss');

module.exports = async function (cssSource) {
    const requestComponent = this._module.issuer.request;

    const options = {
        ...PurgeCSS.defaultOptions,
        // TODO options from webpack config
    };

    const { content, extractors } = options;

    const purgeCSS = new PurgeCSS.PurgeCSS();
    const selectors = await purgeCSS.extractSelectorsFromFiles([requestComponent], []);

    const purgedCSS = await purgeCSS.getPurgedCSS([{raw:cssSource}], selectors);

    return `const styleSheet = new CSSStyleSheet(); styleSheet.replaceSync(\`${purgedCSS[0].css}\`); export default styleSheet;`;
}