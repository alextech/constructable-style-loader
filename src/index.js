const PurgeCSS = require('purgecss');
const loaderUtils = require('loader-utils');

module.exports = async function (cssSource) {
    const requestComponent = this._module.issuer.request;

    const options = {
        ...PurgeCSS.defaultOptions,
        ...loaderUtils.getOptions(this),
    };

    const purgeCSS = new PurgeCSS.PurgeCSS();
    purgeCSS.options = options;

    const { extractors } = options;

    const selectors = await purgeCSS.extractSelectorsFromFiles([requestComponent], extractors);

    const purgedCSS = await purgeCSS.getPurgedCSS([{raw:cssSource}], selectors);

    return `const styleSheet = new CSSStyleSheet(); styleSheet.replaceSync(\`${purgedCSS[0].css}\`); export default styleSheet;`;
}