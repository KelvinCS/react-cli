"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFileRecursive = createFileRecursive;
exports.notNil = exports.createDir = exports.createFile = exports.getSrcDirPath = exports.bindWith = exports.oneOf = exports.getCurrentPath = exports.ofType = exports.executeCommand = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _util = require("util");

var _ramda = require("ramda");

var _child_process = require("child_process");

/**
 * Executes a command and writes the output to process.stdin
 * @param command - Command to be executed
 * @param callback
 */
var execWithOutput = function execWithOutput(command, options, callback) {
  return (0, _child_process.exec)(command, options, callback).stdout.pipe(process.stdout);
};
/**
 * Executes a command on the current terminal
 * @param command - Command to be executed
 */


var executeCommand = function executeCommand(command, options) {
  return (0, _util.promisify)(execWithOutput)(command, options);
};
/**
 * Receives a predicate and retuns a funcion who receives
 * a para of type ComponentProps, and compare the field `type` with de predicate
 * @param pred
 */


exports.executeCommand = executeCommand;

var ofType = function ofType(pred) {
  return function (_ref) {
    var type = _ref.type;
    return (0, _ramda.equals)(pred, type);
  };
};
/**
 * Get the dir path which the current terminal is
 */


exports.ofType = ofType;

var getCurrentPath = function getCurrentPath() {
  return process.cwd();
};
/**
 * Receives a list and returns a verifier funcion that checks
 * if the param exists in the given list
 * @param list
 */


exports.getCurrentPath = getCurrentPath;

var oneOf = function oneOf(list) {
  return function (param) {
    return (0, _ramda.includes)(param, list);
  };
};
/**
 * Receives a funcion and params, and returns caller function with
 * the giver params
 * @param fn
 * @param params
 */


exports.oneOf = oneOf;

var bindWith = function bindWith(fn) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return (0, _ramda.partial)(fn, params);
};
/**
 * Get the current project `src` dir path
 */


exports.bindWith = bindWith;

var getSrcDirPath = function getSrcDirPath() {
  return _path["default"].join(getCurrentPath(), 'src');
};
/**
 * TODO
 * Recursively create a file
 * @param path
 * @param data
 */


exports.getSrcDirPath = getSrcDirPath;

function createFileRecursive(dirPath, data) {
  var createDirs = function createDirs(dirPath) {};
}
/**
 * Create a file on disk
 * @param path path where to write the file
 * @param data content of the file
 */


var createFile = (0, _util.promisify)(_fs["default"].writeFile);
/**
 * Create a dir on disk
 * @param path path where to write the dir
 */

exports.createFile = createFile;
var createDir = (0, _util.promisify)(_fs["default"].mkdir);
/**
 * Verifies if a value is not nill
 * @param value value to be compared
 */

exports.createDir = createDir;
var notNil = (0, _ramda.complement)(_ramda.isNil);
exports.notNil = notNil;