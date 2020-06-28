import commonjs from "rollup-plugin-commonjs";

const config = {
  input: "umd.js",
  output: {
    file: "dist/umd2es.js",
    format: "es",
    // name: "MyModuleName",
  },
  plugins: [commonjs()],
};

export default config;
