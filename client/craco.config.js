const StyleLintPlugin = require("stylelint-webpack-plugin");
const path = require("path");

const isDev = process.env.NODE_ENV === "development";

module.exports = {
  eslint: {
    enable: true,
    mode: "file",
    loaderOptions: () => {
      return {
        cache: true,
        lintDirtyModulesOnly: isDev,
        emitError: !isDev,
        emitWarning: isDev,
        failOnError: !isDev,
        failOnWarning: false
      };
    }
  },
  webpack: {
    plugins: [
      new StyleLintPlugin({
        configBasedir: __dirname,
        context: path.resolve(__dirname, "src"),
        files: ["**/*.less"],
        cache: true,
        lintDirtyModulesOnly: isDev,
        emitError: !isDev,
        emitWarning: isDev,
        failOnError: !isDev,
        failOnWarning: false,
      })
    ]
  },
  plugins: [
    {
      plugin: require("craco-less"),
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }
    }
  ]
};
