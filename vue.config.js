const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "../src/main/resources/static",
  devServer: {
    port: 3030,
    proxy: "http://localhost:3000",
  },
  chainWebpack: (config) => {
    config.module.rules.delete("eslint");
  },
});
