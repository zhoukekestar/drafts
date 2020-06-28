const rollup = require("rollup");
const commonjs = require("rollup-plugin-commonjs");
const importToUrl = require("rollup-plugin-esm-import-to-url");

const config = {
  input: "index.js",
  output: {
    file: "dist/index.js",
    format: "es",
  },
  plugins: [
    importToUrl({
      imports: {
        react: "https://cdn.pika.dev/react@%5E16.13.1",
        "react-dom": "https://cdn.pika.dev/react-dom@%5E16.13.1",
        "moment": "https://cdn.pika.dev/moment@%5E2.27.0",
      },
    }),
    commonjs(),
  ],
};

(async () => {
  const bundle = await rollup.rollup(config);
  await bundle.write(config.output);
})();
