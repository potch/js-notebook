module.exports = {
  entry: {
    editor: './src/editor.js',
    notebook: './src/notebook.js'
  },
  output: {
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
}
