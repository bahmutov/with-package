function isPackageProperty(x) {
  return /^pkg\./.test(x);
}
function replaceVar(primitives, arg) {
  if (isPackageProperty(arg)) {
    var property = arg.substr(4);
    // console.log(property);
    return primitives[property] || '';
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
