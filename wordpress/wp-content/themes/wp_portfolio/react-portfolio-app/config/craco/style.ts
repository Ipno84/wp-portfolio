import { CracoStyleConfig } from "@craco/types";

const style: CracoStyleConfig = {
  modules: {
    localIdentName: "",
  },
  css: {
    /* Any css-loader configuration options: https://github.com/webpack-contrib/css-loader. */
    loaderOptions: (cssLoaderOptions: any) => cssLoaderOptions,
  },
  sass: {
    /* Any sass-loader configuration options: https://github.com/webpack-contrib/sass-loader. */
    loaderOptions: (sassLoaderOptions: any) => sassLoaderOptions,
  },
};

export { style };
