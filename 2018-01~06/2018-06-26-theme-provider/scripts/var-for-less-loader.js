const vars = `
@color-brand1-1: '@color-brand1-1';
@s1: '@s1';
`;


/**
 * 需要修改 stylesheet-loader 的 transformer
    if (COLOR_PROPERTIES[property]) {
      result = normalizeColor(value) || result;
    }
 * @param {*} source
 */
module.exports = function(source) {
  return vars + source;
}
