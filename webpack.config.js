const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'whiterabbitintel.js',
  },
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        // test: /\.js$/,
        // loader: "babel-loader",
        // include: __dirname,
        // exclude: /node_modules/
        test: /\.js$/,
        include: __dirname,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      }
    ]
  },
 
};


// const path = require('path');

// module.exports = {
//   entry: slsw.lib.entries,
//   target: "node",
//   // mode: slsw.lib.webpack.isLocal ? "development" : "production",
//   // optimization: {
//   //   // We do not want to minimize our code.
//   //   minimize: false
//   // },
//   performance: {
//     // Turn off size warnings for entry points
//     hints: false
//   },
//   // Run babel on all .js files and skip those in node_modules
//   module: {
//     rules: [
//       {
//         // test: /\.js$/,
//         // loader: "babel-loader",
//         // include: __dirname,
//         // exclude: /node_modules/
//         test: /\.js$/,
//         include: __dirname,
//         exclude: /node_modules/,
//         use: [{ loader: 'babel-loader' }],
//       }
//     ]
//   },
//   output: {
//     libraryTarget: 'commonjs',
//     path: path.join(__dirname, '.webpack'),
//     filename: '[name].js',
//   },
// };