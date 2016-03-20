module.exports = {
  context: __dirname + '/app',
  entry: './src/index.js',
  output: {
    path: __dirname + '/app/public/js',
    filename: 'app.js'
  }
}
