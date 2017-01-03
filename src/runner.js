var stdlib = require('!raw!./stdlib.js');
var output = require('./output');

function asURL(script) {
  return URL.createObjectURL(
    new Blob([script], { type: 'text/javascript' })
  );
}

function quoted(s) {
  return "'" + s + "'";
}

exports.runScripts = function runScripts(libs, blocks) {
  var lookup = {};
  var source = [];
  var availableOutputs = Object.keys(output);
  source.push('var availableOutputs = [' + availableOutputs.map(quoted).join(',') + ']');
  source.push('importScripts(' + quoted(asURL(stdlib)) + ');');
  source.push('importScripts(' + libs.map(quoted).join(',') + ');');
  blocks.forEach(function (b) {
    b.blobURL = asURL(b.code);
    lookup[b.blobURL] = b;
    source.push('markBlock(' + quoted(b.blobURL) + ');');
    source.push('importScripts(' + quoted(b.blobURL) + ');');
  });
  source = source.join('\n');

  var worker = new Worker(asURL(source));
  var messageCount = 0;
  worker.addEventListener('message', function (e) {
    messageCount++;
    var data = e.data;
    var block = lookup[e.data.block];
    switch(data.type) {
      case 'print':
        if (block) {
          block.output.innerHTML += '<div>' + data.msg + '</div>';
        } else {
          console.log('print', data.msg);
        }
        break;
      case 'error':
        if (block) {
          block.output.innerHTML += '<div class="error">' + data.message + '</div>';
        } else {
          console.error(data);
        }
        break;
      default:
        if (data.type in output) {
          handleOutput(block, data);
        } else {
          console.warn('no output formatter found!');
        }
        break;
    }
  });
}

function handleOutput(block, data) {
  var resultRow = document.createElement('div');
  resultRow.classList.add('row');
  block.output.appendChild(resultRow);
  var result = output[data.type].apply(null, data.args);
  if (result instanceof HTMLElement) {
    resultRow.appendChild(result);
  } else {
    resultRow.innerHTML += '<div>' + result + '</div>';
  }
}
