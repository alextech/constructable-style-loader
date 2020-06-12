import {
  compile,
  getCompiler,
  getModuleSource,
} from './helpers/index'

jest.setTimeout(10000);

global.CSSStyleSheet = {
  replaceSync: function (style) {

  }
}

describe('loader', () => {
  it('should work', async () => {
    const compiler = getCompiler('./basic.js');
    const stats = await compile(compiler);

    expect(getModuleSource('./basic.css', stats)).toMatchSnapshot('module');
  });
});