var propertyNameRegExp = /pkg\.([\w-]+)/;

function isPackageProperty(x) {
  return propertyNameRegExp.test(x);
}

var prefix = 'pkg.';

function replaceVar(primitives, arg) {
  if (isPackageProperty(arg)) {
    var property = propertyNameRegExp.exec(arg)[1];
    var originalText = prefix + property;
    var value = primitives[property] || '';
    var updatedText = arg.replace(originalText, value);
    return replaceVar(primitives, updatedText);
  } else {
    return arg;
  }
}

function replaceVars(pkg, args) {
  var replaceArg = replaceVar.bind(null, pkg);
  var replacedArgs = args.map(replaceArg);
  return replacedArgs
}


module.exports = replaceVars;
