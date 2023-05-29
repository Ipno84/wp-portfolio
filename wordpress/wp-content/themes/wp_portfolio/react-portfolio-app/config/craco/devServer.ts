import { CracoDevServerConfig } from "@craco/types";

/* Any devServer configuration options: https://webpack.js.org/configuration/dev-server/#devserver */
const devServer: CracoDevServerConfig = (devServerConfig) => {
  return {
    ...devServerConfig,
    headers: {
      ...(devServerConfig.headers ?? {}),
      "Access-Control-Allow-Origin": "*",
    },
  };
};

export { devServer };
