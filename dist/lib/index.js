"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduceAsync = reduceAsync;
exports.promiseWaterfall = promiseWaterfall;
exports.createFileRecursively = createFileRecursively;
exports.notNil = exports.pathExists = exports.hasExtension = exports.notEmpty = exports.createDir = exports.createFile = exports.createDirRecursively = exports.getSrcDirPath = exports.bindWith = exports.oneOf = exports.getCurrentPath = exports.ofType = exports.executeCommand = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
 * Asynchronously reduces a list
 * @param reducer
 * @param initialValue
 * @param list
 */


exports.getSrcDirPath = getSrcDirPath;

function reduceAsync(_x, _x2, _x3) {
  return _reduceAsync.apply(this, arguments);
}
/**
 * Receives an array of functions, called tasks, that returns a promise,
 * each task receives the result of its predecessor as a param.
 * The first task receives the params from `initialParams`.
 * @param tasks array of functions that returns a promise
 * @param initialParams params to be passed to the fist task
 */


function _reduceAsync() {
  _reduceAsync = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(reducer, initialValue, list) {
    var reduceWith, tasks;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            reduceWith = function reduceWith(reducer) {
              return function (elem) {
                return function (acc) {
                  return reducer(acc, elem);
                };
              };
            };

            tasks = (0, _ramda.map)(reduceWith(reducer), list);
            return _context.abrupt("return", promiseWaterfall(tasks, [initialValue]));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _reduceAsync.apply(this, arguments);
}

function promiseWaterfall(_x4, _x5) {
  return _promiseWaterfall.apply(this, arguments);
}
/**
 * Recursively create a dir or file
 * @param path
 * @param data
 */


function _promiseWaterfall() {
  _promiseWaterfall = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(tasks, initialParams) {
    var _tasks, firstTask, tasksLeft, result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, task;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _tasks = (0, _toArray2["default"])(tasks), firstTask = _tasks[0], tasksLeft = _tasks.slice(1);
            _context2.next = 3;
            return firstTask.apply(void 0, (0, _toConsumableArray2["default"])(initialParams));

          case 3:
            result = _context2.sent;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 7;
            _iterator = tasksLeft[Symbol.iterator]();

          case 9:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context2.next = 17;
              break;
            }

            task = _step.value;
            _context2.next = 13;
            return task(result);

          case 13:
            result = _context2.sent;

          case 14:
            _iteratorNormalCompletion = true;
            _context2.next = 9;
            break;

          case 17:
            _context2.next = 23;
            break;

          case 19:
            _context2.prev = 19;
            _context2.t0 = _context2["catch"](7);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 23:
            _context2.prev = 23;
            _context2.prev = 24;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 26:
            _context2.prev = 26;

            if (!_didIteratorError) {
              _context2.next = 29;
              break;
            }

            throw _iteratorError;

          case 29:
            return _context2.finish(26);

          case 30:
            return _context2.finish(23);

          case 31:
            return _context2.abrupt("return", result);

          case 32:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[7, 19, 23, 31], [24,, 26, 30]]);
  }));
  return _promiseWaterfall.apply(this, arguments);
}

function createFileRecursively(_x6, _x7) {
  return _createFileRecursively.apply(this, arguments);
}
/**
 * Create a dir recursively
 * @param path
 */


function _createFileRecursively() {
  _createFileRecursively = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(filePath, data) {
    var paths, makeFile;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            paths = (0, _ramda.filter)(notEmpty, (0, _ramda.split)('/', filePath));

            makeFile = function makeFile(path) {
              return createFile(path, data);
            };

            return _context4.abrupt("return", reduceAsync(
            /*#__PURE__*/
            function () {
              var _ref2 = (0, _asyncToGenerator2["default"])(
              /*#__PURE__*/
              _regenerator["default"].mark(function _callee3(acc, elem) {
                var dir, exists;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        dir = _path["default"].join(acc, elem);
                        _context3.next = 3;
                        return pathExists(dir);

                      case 3:
                        exists = _context3.sent;
                        return _context3.abrupt("return", (0, _ramda.cond)([[(0, _ramda.always)(exists), _ramda.identity], [hasExtension, makeFile], [_ramda.T, createDir]])(dir));

                      case 5:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x8, _x9) {
                return _ref2.apply(this, arguments);
              };
            }(), '/', paths));

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _createFileRecursively.apply(this, arguments);
}

var createDirRecursively = function createDirRecursively(path) {
  return createFileRecursively(path);
};
/**
 * Create a file on disk
 * @param path path where to write the file
 * @param data content of the file
 * @returns param path
 */


exports.createDirRecursively = createDirRecursively;

var createFile = function createFile(path, data, options) {
  return (0, _util.promisify)(_fs["default"].writeFile)(path, data, options).then((0, _ramda.always)(path));
};
/**
 * Create a dir on disk
 * @param path path where to write the dir
 * @returns param path
 */


exports.createFile = createFile;

var createDir = function createDir(path, options) {
  return (0, _util.promisify)(_fs["default"].mkdir)(path, options).then((0, _ramda.always)(path));
};
/**
 * Verify if a predicate is not empty
 * @param predicate
 */


exports.createDir = createDir;
var notEmpty = (0, _ramda.complement)(_ramda.isEmpty);
/**
 * Verify if a path has extension
 * @param path
 */

exports.notEmpty = notEmpty;
var hasExtension = (0, _ramda.compose)(notEmpty, _path["default"].extname);
/**
 * Verify if a path exists
 * @param path
 */

exports.hasExtension = hasExtension;
var pathExists = (0, _util.promisify)(_fs["default"].exists);
/**
 * Verifies if a value is not nill
 * @param value value to be compared
 */

exports.pathExists = pathExists;
var notNil = (0, _ramda.complement)(_ramda.isNil);
exports.notNil = notNil;