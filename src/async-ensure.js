module.exports = function asyncEnsure(imports) {
  return new Promise(function (resolve) {
    require.ensure(imports, resolve);
  });
}
