import { defineConfig } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";

export default defineConfig({
  input: "src/index.js",
  output: [
    {
      file: "dist/index.cjs",
      format: "cjs",
    },
    {
      file: "dist/index.mjs",
      format: "es",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({ babelHelpers: "bundled" }),
  ],
  external: ["exiftool-vendored"],
});
