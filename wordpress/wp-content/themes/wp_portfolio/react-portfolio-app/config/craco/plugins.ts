import { CracoPluginDefinition } from "@craco/types";

const plugins: CracoPluginDefinition<any>[] = [
  {
    plugin: {
      overrideCracoConfig: ({ cracoConfig }) => cracoConfig,
      overrideWebpackConfig: ({ webpackConfig }) => webpackConfig,
      overrideDevServerConfig: ({ devServerConfig }) => devServerConfig,
      overrideJestConfig: ({ jestConfig }) => jestConfig,
    },
    options: {},
  },
];

export { plugins };
