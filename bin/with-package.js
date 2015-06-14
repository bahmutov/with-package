#!/usr/bin/env node

console.log('running with-package in', process.cwd());
var join = require('path').join;
var fullPackagePath = join(process.cwd(), 'package.json');
var pkg = require(fullPackagePath);
var quote = require('quote');

function noop() {};
function isDebug(args) {
  return args.some(function (arg) {
    return arg === '--debug' || arg === '-d';
  });
}

var log = isDebug(process.argv) ? console.log.bind(console) : noop;

function isPrimitive(x) {
  return typeof x === 'string' ||
    typeof x === 'number' ||
    typeof x === 'boolean';
}
console.assert(isPrimitive(true), 'true is primitive');
console.assert(isPrimitive(42), '42 is primitive');
console.assert(isPrimitive('foo'), '"foo" is primitive');
console.assert(!isPrimitive({}), '{} is NOT primitive');
console.assert(!isPrimitive([]), '[] is NOT primitive');

var primitives = Object.create(process.env);
Object.keys(pkg).forEach(function (key) {
  var value = pkg[key];
  if (isPrimitive(value)) {
    primitives[key] = value;
  }
});

log(primitives);

var args = process.argv.slice(2);
if (!args.length) {
  return;
}

function escape(value) {
  if (typeof value === 'string' && value.length) {
    return quote(value);
  }
}

log('arguments', args);
var replacedArgs = args.map(function (arg) {
  if (/^pkg\./.test(arg)) {
    var property = arg.substr(4);
    console.log(property);
    // return escape(primitives[property] || '');
    return primitives[property] || '';
  } else {
    return arg;
  }
});
log('replaced arguments', replacedArgs);

var spawn = require('child_process').spawn;
var proc = spawn(replacedArgs[0], replacedArgs.slice(1), {
  env: process.env
});

proc.stdout.on('data', function (chunk) {
  process.stdout.write(chunk);
});

proc.stderr.on('data', function (chunk) {
  process.stderr.write(chunk);
});

proc.on('close', function (code) {
  log('child process exited with code ' + code);
});

