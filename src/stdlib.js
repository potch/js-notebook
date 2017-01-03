var currentBlock = null;

function markBlock(s) {
  currentBlock = s;
}

function print(msg) {
  postMessage({
    type: 'print',
    msg: msg,
    block: currentBlock
  });
}

availableOutputs.forEach(function (o) {
  self[o] = function() {
    var args = Array.prototype.slice.apply(arguments);
    postMessage({
      type: o,
      args: args,
      block: currentBlock
    });
  };
})

addEventListener('error', function (e) {
  postMessage({
    type: 'error',
    message: e.message,
    filename: e.filename,
    line: e.lineno,
    block: currentBlock
  });
  console.error(e);
  e.preventDefault();
});
