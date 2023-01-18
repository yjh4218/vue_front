const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  // build를 한 코드를 넣을 장소
  outputDir: "../src/main/resources/static",
  // 실제로 실행되는 웹페이지의 index
  // indexPath: "../static/index.html",

  devServer: {
    port: 3030,
    proxy: "http://localhost:3000",
    historyApiFallback: true,
  },
  chainWebpack: (config) => {
    config.module.rules.delete("eslint");
    config.plugin("html").tap((args) => {
      args[0].title = "품질관리 페이지";
      return args;
    });
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/_variables.scss";
          @import "@/styles/_mixins.scss";
        `,
      },
    },
  },
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json"],
      alias: {
        "@": path.resolve("src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(xls|xlsx|ppt|pptx|docx|doc|hwp|hwpx|pdf)$/,
          // png|jpg|
          // include: /fileData/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                // outputPath: "fileData/",
                // publicPath: 'fileData/'
              },
            },
          ],
        },
      ],
    },
  },
});
