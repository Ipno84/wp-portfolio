import { CracoBabelConfig } from "@craco/types";

const babel: CracoBabelConfig = {
  presets:
    [] /* Any babel-loader configuration options: https://github.com/babel/babel-loader. */,
  loaderOptions: (babelLoaderOptions) => {
    if (babelLoaderOptions.presets && babelLoaderOptions.presets.length > 0) {
      const origBabelPresetCRAIndex = babelLoaderOptions.presets.findIndex(
        (preset) => {
          if (Array.isArray(preset) && preset.length > 0) {
            return preset[0].includes("babel-preset-react-app");
          }
          return false;
        }
      );

      const origBabelPresetCRA =
        babelLoaderOptions.presets[origBabelPresetCRAIndex];

      if (Array.isArray(origBabelPresetCRA) && origBabelPresetCRA.length > 0) {
        babelLoaderOptions.presets[origBabelPresetCRAIndex] =
          function overridenPresetCRA(api, _, env) {
            const babelPresetCRAResult = require(origBabelPresetCRA[0])(
              api,
              origBabelPresetCRA[1],
              env
            );

            babelPresetCRAResult.presets.forEach((preset: any) => {
              // detect @babel/preset-react with {development: true, runtime: 'automatic'}
              const isReactPreset =
                preset &&
                preset[1] &&
                preset[1].runtime === "automatic" &&
                preset[1].development === true;
              if (isReactPreset) {
                preset[1].importSource =
                  "@welldone-software/why-did-you-render";
              }
            });

            return babelPresetCRAResult;
          };
      }
    }

    return babelLoaderOptions;
  },
};

export { babel };
