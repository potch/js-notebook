module.exports = {
  entry: {
    editor: './src/editor.js',
    notebook: './src/notebook.js'
  },
  output: {
    filename: './static/[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
}
