const ThemeProvider = (cssfile, name) => {
  return (Target) => {
    Target.prototype[name] = cssfile;
  };
}

export default ThemeProvider;
