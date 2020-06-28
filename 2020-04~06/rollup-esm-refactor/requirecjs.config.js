import commonjs from "rollup-plugin-commonjs";

const config = {
  input: "requirecjs.js",
  output: {
    file: "dist/requirecjs.js",
    format: "es",
    // name: "MyModuleName",
  },
  plugins: [commonjs()],
};

export default config;
