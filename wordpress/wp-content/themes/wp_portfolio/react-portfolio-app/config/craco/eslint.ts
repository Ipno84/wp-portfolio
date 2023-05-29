import { CracoEsLintConfig } from "@craco/types";

const eslint: CracoEsLintConfig = {
  enable: true /* (default value) */,
  mode: "extends" /* (default value) */ || "file",
  /* Any eslint configuration options: https://eslint.org/docs/user-guide/configuring */
  configure: (eslintConfig) => eslintConfig,
  /* Any eslint plugin configuration options: https://github.com/webpack-contrib/eslint-webpack-plugin#options. */
  pluginOptions: (eslintOptions) => eslintOptions,
};

export { eslint };
