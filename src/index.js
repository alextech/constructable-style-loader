const loaderUtils = require('loader-utils');

module.exports = async function (request, map, meta) {
    const options = loaderUtils.getOptions(this);

    if (options.hasOwnProperty("purge") && options.purge === true) {
        const PurgeCSS = require('purgecss');

        const options = {
            ...PurgeCSS.defaultOptions,
            ...loaderUtils.getOptions(this),
        }

        const purgeCSS = new PurgeCSS.PurgeCSS();
        purgeCSS.options = options;

        const { content, extractors } = options;

        const fileFormatContents = content.filter(
            (o) => typeof o === "string"
        ) /* as string[] */;

        const selectors = await purgeCSS.extractSelectorsFromFiles(fileFormatContents, extractors);

        if (meta &&
            meta.ast &&
            meta.ast.type === 'postcss') {

            const {ast} = meta;
            await purgeCSS.walkThroughCSS(ast.root, selectors);

            request = ast.root.toString();
        } else {
            request = (await purgeCSS.getPurgedCSS([{raw:request}], selectors))[0].css;
        }
    }

    return `const styleSheet = new CSSStyleSheet(); styleSheet.replaceSync(\`${request}\`); export default styleSheet;`;
}