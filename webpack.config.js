/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2018 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import path from 'node:path';

import { fileURLToPath } from 'url';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

var __dirname = path.dirname(fileURLToPath(import.meta.url));
const lib = path.resolve(__dirname, "lib");

const common = {

  entry: {
    main: path.resolve(lib, "main.js"),
    "editor.worker": "./node_modules/monaco-editor/esm/vs/editor/editor.worker.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: lib,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  target: "web",
  node: {},
};

let res = null;
if (process.env["NODE_ENV"] === "production") {
  res = merge(common, {
    mode: "production",
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
    ],
  });
} else {
  res = merge(common, {
    mode: "development",
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: "pre",
          loader: "source-map-loader",
        },
      ],
    },
  });
}

export default res;
