var marked = require('marked');
var CodeMirror = require('codemirror');
var gfm = require('codemirror/mode/markdown/markdown');
var continueList = require('codemirror/addon/edit/continuelist.js');
var style = require('codemirror/lib/codemirror.css');

var cm = CodeMirror(document.querySelector('#input'), {
  mode:  "markdown",
  tabSize: 2,
  lineNumbers: true,
  lineWrapping: true,
  extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
});

// wrap lines more attractively.
var charWidth = cm.defaultCharWidth();
var basePadding = 4;
cm.on("renderLine", function(cm, line, elt) {
  var off = CodeMirror.countColumn(line.text, null, cm.getOption("tabSize")) * charWidth;
  if (/^\s+\*/.test(line.text)) {
    elt.style.textIndent = "-" + (off + charWidth * 2) + "px";
    elt.style.paddingLeft = (basePadding + off + charWidth * 2) + "px";
  } else {
    elt.style.textIndent = "-" + off + "px";
    elt.style.paddingLeft = (basePadding + off) + "px";
  }
});

var literateRenderer = new marked.Renderer();

literateRenderer.code = function (text, lang) {
  let special = '';
  text = text.replace(/^\n+/, '');
  if (lang === 'defs') {
    return `<details>
  <summary>extra definitions</summary>
  <div class="code defs">
    <pre><code class="js">${text}</code></pre>
    <button class="run">run</button>
    <button class="runfromtop">run from top</button>
    <pre class="output"></pre>
  </div>
</details>`;
  }
  return '<div class="code">\n' +
    '<pre><code class="js">' + text + '</code></pre>\n' +
    '<button class="run">run</button>\n' +
    '<button class="runfromtop">run from top</button>\n' +
    '<pre class="output"></pre>\n' +
    '</div>';
}

var updateTimeout;
function debounceUpdate() {
  clearTimeout(updateTimeout);
  updateTimeout = setTimeout(update, 1000);
}

cm.on('changes', debounceUpdate);

function update() {
  var value = cm.getValue();
  marked(
    value,
    { renderer: literateRenderer },
    function (err, result) {
      document.querySelector('#output').contentWindow.postMessage({
        type: 'update',
        content: result
      }, '*');
    }
  );
}

var editorShown = false;
var button = document.querySelector('.editor-toggle');
button.addEventListener('click', function (e) {
  editorShown = !editorShown;
  if (editorShown) {
    document.querySelector('.app').classList.add('show-editor');
    button.innerHTML = '&larr; Hide Editor';
  } else {
    document.querySelector('.app').classList.remove('show-editor');
    button.innerHTML = 'Show Editor &rarr;';
  }
  cm.refresh();
});

window.addEventListener('DOMContentLoaded', function () {
  fetch('/notebook.md').then(r => r.text()).then(file => {
    cm.setValue(file);
    update();
  });
});
