const { defineConfig } = require("@vue/cli-service");
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  outputDir: "../src/main/resources/static",
  devServer: {
    port: 3030,
    proxy: "http://localhost:3000",
  },
  chainWebpack: (config) => {
    config.module.rules.delete("eslint");
    config
      .plugin('html')
      .tap(args => {
          args[0].title = "품질관리 페이지";
          return args;
      })
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/_variables.scss";
          @import "@/styles/_mixins.scss";
        `
      }
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        '@': path.resolve('src'),
      }
    },
  }
});
