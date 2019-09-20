"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFile = createFile;
exports.createDir = createDir;
exports.getSrcDirPath = exports.bindWith = exports.oneOf = exports.getCurrentPath = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _ramda = require("ramda");

var getCurrentPath = function getCurrentPath() {
  return process.cwd();
};

exports.getCurrentPath = getCurrentPath;

var oneOf = function oneOf(list) {
  return function (param) {
    return (0, _ramda.includes)(param, list);
  };
};

exports.oneOf = oneOf;

var bindWith = function bindWith(fn) {
  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  return (0, _ramda.partial)(fn, params);
};

exports.bindWith = bindWith;

var getSrcDirPath = function getSrcDirPath() {
  return _path["default"].join(getCurrentPath(), 'src');
};

exports.getSrcDirPath = getSrcDirPath;

function createFile(path, data) {
  return new Promise(function (resolve) {
    return _fs["default"].writeFile(path, data, resolve);
  });
}

function createDir(path) {
  return new Promise(function (resolve) {
    return _fs["default"].mkdir(path, null, (0, _ramda.partial)(resolve, path));
  });
}