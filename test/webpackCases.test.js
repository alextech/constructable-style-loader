import fs from "fs";

const webpack = require('webpack');
const path = require('path');
const rimraf = require('rimraf');

function runWebpack(options/*: Configuration*/) /*: Promise<webpack.Stats>*/ {
    const compiler = webpack(options);
    return new Promise /* <webpack.Stats>*/((resolve, reject) => {
        compiler.run((err /*: Error*/, stats /*: Stats*/) => {
            if (err) reject(err);
            if (stats.hasErrors()) reject(new Error(stats.toString()));
            resolve(stats);
        });
    });
}

async function readFileOrEmpty(path/*: string*/) /*: Promise<string>*/ {
    try {
        return await fs.promises.readFile(path, "utf-8");
        // eslint-disable-next-line no-empty
    } catch (e) {
        return "";
    }
}

const cases = [
    'simple',
    'simple-with-purge',
    'multiple-with-postcss-loader',
    'edgecase-comment-has-backtick'
];

describe("Webpack integration", () => {
    for (const testCase of cases) {
        it(`works with ${testCase} configuration`, async () => {
            const outputDirectory = path.resolve(__dirname, 'webpack_bundle', testCase);
            rimraf.sync(outputDirectory);

            const testDirectory = path.resolve(__dirname, 'cases', testCase);

            process.chdir(testDirectory);

            const webpackConfig = require(`${testDirectory}/webpack.config.js`);

            await runWebpack({
               ...webpackConfig,
               output: {
                   path: outputDirectory,
               }
            });

            let webpackModule = (await readFileOrEmpty(path.resolve(outputDirectory, 'unit_test.js')))
                .replace(/(?:\\[rn])+/g, "\n");

            expect(webpackModule).toMatchSnapshot(testCase);
        });
    }
});

