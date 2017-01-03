var hljs = require('highlightjs');
var runner = require('./runner');
require('highlightjs/styles/github.css');

window.addEventListener('message', function (e) {
  var data = e.data;
  if (data.type === "update") {
    document.querySelector('#content').innerHTML = data.content;
    highlight();
    runAll();
  }
});

function $(selector) {
  return Array.prototype.slice.apply(
    document.querySelectorAll(selector)
  );
}

function highlight() {
  $('pre code').forEach(function(el) {
    hljs.highlightBlock(el);
  });
}

document.body.addEventListener('click', function (e) {
  if (e.target.classList.contains('run')) {
    var block = e.target.parentNode
    var code = block.querySelector('code').innerText;
    var output = block.querySelector('.output');
    output.innerHTML = '';
    runner.runScripts([], [
      {
        output: e.target.parentNode.querySelector('.output'),
        code: code
      }
    ]);
  }

  if (e.target.classList.contains('runfromtop')) {
    runFromTop(e.target.parentNode);
  }
});

function runFromTop(block) {
  var scripts = [];
  var currentBlock = block;
  var allCodeBlocks = $('.code');
  for (var i = 0; i < allCodeBlocks.length; i++) {
    var block = allCodeBlocks[i];
    var output = block.querySelector('.output');
    scripts.push({
      output: output,
      code: block.querySelector('code').innerText
    });
    output.innerHTML = '';
    if (block === currentBlock) {
      break;
    }
  }
  runner.runScripts([], scripts);
}

function runAll() {
  var lastBlock = $('.code').slice(-1);
  console.log(lastBlock);
  runFromTop(lastBlock);
}
