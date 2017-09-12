import * as path from "path";
import * as webpack from "webpack";

module.exports = {
  // Enable sourcemaps for debugging webpack's output.
  devtool: "eval-source-map",

  // NOTE ./ - project root directory
  entry: {
    bundle: ["./src/frontend/src", "hex-tools"],
    vendor: ["babylonjs", "react", "react-dom", "jquery", "jquery.terminal",
      "./src/frontend/assets/js/babylon.objFileLoader.min.js"],
  },

  module: {
    rules: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { test: /\.js$/, loader: "source-map-loader", enforce: "pre" },
      { test: /\.tsx?$/, loader: "tslint-loader", enforce: "pre" },

      // General files
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.css?$/, loader: "style-loader" },
      { test: /\.css?$/, loader: "css-loader" },
      { test: /\.html$/, loader: "file-loader?name=[name].[ext]!extract-loader!html-loader" },
      { test: /\.png$/, loader: "file-loader?name=images/[name].[ext]" },

      { test: require.resolve("babylonjs"), loader: "expose-loader?BABYLON" },
      {
        loader: "imports-loader?BABYLON=babylonjs",
        test: require.resolve("../assets/js/babylon.objFileLoader.min.js"),
      },
      { test: require.resolve("jquery"), loader: "expose-loader?jQuery" },
      { test: require.resolve("react-dom"), loader: "expose-loader?ReactDOM" },
      { test: require.resolve("react"), loader: "expose-loader?React" },
    ],
  },

  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "../../../public"),
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      filename: "js/vendor.bundle.js",
      name: "vendor",
    }),
  ],

  resolve: {
    alias: {
      GameWorld: path.resolve(__dirname, "../src/components/GameWorld"),
    },
    extensions: [".ts", ".js", ".tsx"],
  },
};
