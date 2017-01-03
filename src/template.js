var cssText = require('!raw!../notebook.css');

console.log(cssText);

module.exports = function template(content) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <style>${cssText}</style>
  </head>
  <body>
${content}
    <script src="/notebook.bundle.js"></script>
  </body>
</html>`;
};
