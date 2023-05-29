import { CracoWebpackConfig } from "@craco/types";
import path from "path";
import ModuleScopePlugin from "react-dev-utils/ModuleScopePlugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const srcPath = path.resolve(process.env.PWD ?? "", "./src");

const isProd = process.env.NODE_ENV === "production";

const webpack: CracoWebpackConfig = {
  /* Any webpack configuration options: https://webpack.js.org/configuration */
  configure: (webpackConfig) => {
    let resolve = webpackConfig.resolve ?? {};
    let plugins = webpackConfig.plugins ?? [];
    const alias = resolve?.alias ?? {};

    // Remove ModuleScopePlugin for including files outside src directory
    plugins = plugins.filter(
      (plugin) => !(plugin instanceof ModuleScopePlugin)
    );

    if (isProd) {
      plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: "./../bundle-stats/index.html",
          reportTitle: "Bundle Analyzer Report",
          openAnalyzer: true,
          logLevel: "silent",
        })
      );
    }

    return {
      ...webpackConfig,
      resolve: {
        ...resolve,
        alias: {
          ...alias,
          "~": srcPath,
        },
      },
      ignoreWarnings: [/Failed to parse source map/, /Module Warning/],
      plugins,
    };
  },
};

export { webpack };
