const vars = `
@nice-blue: '__NICE_BLUE__';
`;

module.exports = function(source) {
  return vars + source;
}
